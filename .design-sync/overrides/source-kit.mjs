// forked from design-sync lib/source-kit.mjs — flat registry dir yields no group heuristic, and shadcn's compound exports need their defining file pinned
//
// Non-storybook `package` adapter. Bundles dist/ when present (the authoritative
// component list comes from shipped .d.ts; with no dist it synthesizes an
// entry from src/ as a last resort) and opportunistically enriches each
// component from src/ — JSDoc and dir-derived group. Every enrichment miss
// degrades to the plain-dist behaviour.
//
// Discovery is heuristic-based; each heuristic has a `.design-sync/config.json`
// override (ASSUMPTION comments below name them) so repos that don't match the
// defaults write config, not code. `componentSrcMap` is the single override
// knob for component inclusion: non-null value = add/pin src path, null =
// exclude a .d.ts-exported internal.

import { existsSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { Project, Node, ts } from 'ts-morph';
import { leadingJsdoc, readText, slash, walk } from '../../.ds-sync/lib/common.mjs';
import { resolveDistEntry } from '../../.ds-sync/lib/bundle.mjs';
import { exportedNames, isComponentName } from '../../.ds-sync/lib/dts.mjs';

// ── shadcn fork ────────────────────────────────────────────────────────────
// The registry is a FLAT directory (registry/new-york-v4/ui/*.tsx), so the
// upstream group heuristic — "last src/ path segment that isn't generic" — has
// no path segment to work with and drops all 331 exports into `general`. That
// makes the component picker unusable.
//
// shadcn also uses a compound API: dialog.tsx exports Dialog, DialogTrigger,
// DialogContent and 7 more. Upstream's fuzzy per-component src match only finds
// a file for the primary name (DialogContent.tsx doesn't exist), so sub-parts
// get neither a group nor JSDoc enrichment.
//
// Both are fixed by the same fact: deriveComponentsFromSrc already knows which
// FILE each export came from — it just discards it. We keep it, use it to pin
// srcPath for every sub-part, and map the file to a curated category.
const CATEGORY_BY_FILE = {
  // Forms
  button: 'Forms', 'button-group': 'Forms', checkbox: 'Forms', combobox: 'Forms',
  field: 'Forms', form: 'Forms', input: 'Forms', 'input-group': 'Forms',
  'input-otp': 'Forms', label: 'Forms', 'native-select': 'Forms',
  'radio-group': 'Forms', select: 'Forms', slider: 'Forms', switch: 'Forms',
  textarea: 'Forms', toggle: 'Forms', 'toggle-group': 'Forms',
  // Overlays
  'alert-dialog': 'Overlays', command: 'Overlays', 'context-menu': 'Overlays',
  dialog: 'Overlays', drawer: 'Overlays', 'dropdown-menu': 'Overlays',
  'hover-card': 'Overlays', menubar: 'Overlays', popover: 'Overlays',
  sheet: 'Overlays', tooltip: 'Overlays',
  // Navigation
  breadcrumb: 'Navigation', direction: 'Navigation', 'navigation-menu': 'Navigation',
  pagination: 'Navigation', sidebar: 'Navigation', tabs: 'Navigation',
  // Display
  avatar: 'Display', badge: 'Display', calendar: 'Display', card: 'Display',
  carousel: 'Display', chart: 'Display', item: 'Display', kbd: 'Display',
  marker: 'Display', table: 'Display',
  // Feedback
  alert: 'Feedback', empty: 'Feedback', progress: 'Feedback', skeleton: 'Feedback',
  sonner: 'Feedback', spinner: 'Feedback',
  // Layout
  accordion: 'Layout', 'aspect-ratio': 'Layout', collapsible: 'Layout',
  resizable: 'Layout', 'scroll-area': 'Layout', separator: 'Layout',
  // Messaging
  attachment: 'Messaging', bubble: 'Messaging', message: 'Messaging',
  'message-scroller': 'Messaging',
};
const categoryOf = (file) =>
  file ? CATEGORY_BY_FILE[basename(file).replace(/\.(tsx|jsx)$/, '')] : undefined;

const NON_IMPL_RX = /\.(stories|test|spec)\./;
const SRC_IMPL_RX = /\.(tsx|jsx)$/;
// Dir names that don't usefully group components — skip so the emitted path
// is `components/<group>/<Name>` not `components/components/<Name>`.
const GENERIC_DIR = new Set(['components', 'component', 'src', 'lib', 'ui', 'packages', 'react']);
const slug = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';

// No .d.ts → scan src files for PascalCase value exports via ts-morph.
function deriveComponentsFromSrc(srcFiles) {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { jsx: ts.JsxEmit.Preserve, allowJs: true, skipLibCheck: true },
  });
  // fork: Map instead of Set — the defining file is what gives every compound
  // sub-part its group and its srcPath (see CATEGORY_BY_FILE above).
  const seen = new Map();
  for (const p of srcFiles) {
    if (NON_IMPL_RX.test(p) || !SRC_IMPL_RX.test(p)) continue;
    const sf = project.addSourceFileAtPathIfExists(p);
    if (!sf) continue;
    for (const [name, decls] of sf.getExportedDeclarations()) {
      // `export default function Button()` is keyed as 'default' — recover
      // the declared name from the function/class node.
      const real = name === 'default'
        ? decls.map((d) => d.getName?.()).find((n) => n && n !== 'default')
        : name;
      if (!real || !/^[A-Z][A-Za-z0-9]*$/.test(real)) continue;
      if (decls.some((d) => Node.isVariableDeclaration(d) || Node.isFunctionDeclaration(d) || Node.isClassDeclaration(d))) {
        // First file wins — a re-export elsewhere must not steal the origin.
        if (!seen.has(real)) seen.set(real, p);
      }
    }
  }
  return [...seen.keys()].sort().map((name) => ({
    name,
    group: categoryOf(seen.get(name)) ?? 'general',
    srcPath: slash(seen.get(name)),
  }));
}

export async function resolvePackage(ctx) {
  const { PKG_DIR, pkgJson, ENTRY_OVERRIDE, PKG, OUT, cfg } = ctx;
  const srcMap = cfg.componentSrcMap ?? {};

  // ── 1. src/ discovery (best-effort; feeds enrichment + synth-entry fallback).
  // ASSUMPTION: source root is first of src/ | lib/ | components/. Override: cfg.srcDir.
  const srcRoot = [cfg.srcDir, 'src', 'lib', 'components']
    .map((d) => d && resolve(PKG_DIR, d))
    .find((d) => d && existsSync(d));
  const srcFiles = srcRoot ? walk(srcRoot, (n) => /\.(tsx|jsx|mdx?)$/.test(n)) : [];

  // ── 2. entry: dist if it exists, else synthesize from src/ (last resort).
  let entry = resolveDistEntry({ pkgDir: PKG_DIR, pkgJson, override: ENTRY_OVERRIDE, pkgName: PKG, soft: true });
  let synthEntry = false;
  if (!entry) {
    if (!srcRoot) {
      console.error(`[NO_DIST] ${PKG} has no built entry and no src/ to synthesize from — run its build.`);
      process.exit(1);
    }
    const comps = srcFiles.filter((p) => SRC_IMPL_RX.test(p) && !NON_IMPL_RX.test(p));
    entry = join(OUT, '.pkg-entry.mjs');
    writeFileSync(entry, comps.map((p) => `export * from ${JSON.stringify(p)};`).join('\n') + '\n');
    synthEntry = true;
    console.error(
      `[NO_DIST] no built entry — synthesizing from ${comps.length} src files (run the package's build for best results)`,
    );
  }

  // ── 3. component list: from shipped .d.ts (authoritative when dist exists).
  // ASSUMPTION: components = PascalCase value exports in the .d.ts tree.
  // Override: cfg.componentSrcMap (non-null adds/pins, null excludes).
  const exported = exportedNames(PKG_DIR, pkgJson);
  const names = new Set([...exported].filter(isComponentName));
  for (const [k, v] of Object.entries(srcMap)) {
    if (v === null) { names.delete(k); continue; }
    // Names reach `<script>` blocks in the emitted HTML — reject anything
    // that isn't a plain PascalCase identifier.
    if (!/^[A-Z][A-Za-z0-9]*$/.test(k)) {
      console.error(`[CONFIG] componentSrcMap: "${k}" is not a valid component name (PascalCase identifiers only)`);
      continue;
    }
    names.add(k);
  }
  let components = [...names].sort().map((name) => ({ name, group: 'general' }));
  if (!components.length && synthEntry) {
    components = deriveComponentsFromSrc(srcFiles).filter((c) => srcMap[c.name] !== null);
  }
  if (!components.length) {
    if (cfg.cssEntry || existsSync(join(PKG_DIR, 'styles.css'))) {
      console.error('[ZERO_MATCH] no component exports — treating as tokens-only DS');
      return { shape: 'package', entry, components: [], tokensOnly: true };
    }
    console.error(`[ZERO_MATCH] no PascalCase exports in ${PKG} and no styles — nothing to sync`);
    process.exit(1);
  }

  // ── 4. src/ enrichment per component. Every miss degrades to plain-dist.
  if (srcRoot) {
    for (const c of components) {
      // Pinned via config → skip fuzzy-find entirely.
      // fork: a srcPath already set by deriveComponentsFromSrc is the AUTHORITATIVE
      // origin (ts-morph resolved it), so it also skips the fuzzy match — which
      // would otherwise miss every compound sub-part and, worse, mis-hit names
      // like `Toggle` onto toggle-group.tsx.
      let hit = typeof srcMap[c.name] === 'string'
        ? slash(resolve(PKG_DIR, srcMap[c.name]))
        : (c.srcPath ?? null);
      if (!hit) {
        // ASSUMPTION: <Name>.tsx | <name>/<name>.tsx | <Name>/index.tsx |
        // <kebab-name>.tsx, case-insensitive; dir-match ranks above
        // bare-file match, then prefer one that actually exports `c.name`.
        // Override: cfg.componentSrcMap.
        const kebab = c.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
        const nameRx = new RegExp(
          `(?:^|/)(?:${c.name}/(?:index|${c.name})\\.(tsx|jsx)|(?:${c.name}|${kebab})\\.(tsx|jsx))$`,
          'i',
        );
        const hits = srcFiles
          .filter((p) => nameRx.test(p) && !NON_IMPL_RX.test(p))
          .sort(
            (a, b) =>
              (b.toLowerCase().includes(`/${c.name.toLowerCase()}/`) ? 1 : 0) -
              (a.toLowerCase().includes(`/${c.name.toLowerCase()}/`) ? 1 : 0),
          );
        const exportRx = new RegExp(`export\\s+(?:default\\s+)?(?:const|let|var|function|class)\\s+${c.name}\\b`);
        hit = hits.find((p) => exportRx.test(readText(p))) ?? hits[0];
      }
      if (!hit || !existsSync(hit)) continue;
      c.srcPath = hit;
      c.doc = leadingJsdoc(readText(hit), c.name) || undefined;
      // group = last src/ path segment that isn't the component's own dir or
      // a generic container name — else JSDoc @category — else 'general'.
      // fork: a curated category for the defining file wins over the path
      // heuristic — the registry is flat, so the heuristic has nothing to read
      // and would return 'general' for all 331. Kept unslugged: `group` is used
      // verbatim as both the emitted directory name and the @dsCard label, and
      // these are already single path-safe words.
      c.group = categoryOf(hit) ?? slug(
        slash(relative(srcRoot, dirname(hit)))
          .split('/')
          .filter((s) => s && s.toLowerCase() !== c.name.toLowerCase() && !GENERIC_DIR.has(s.toLowerCase()))
          .at(-1)
        || (c.doc && /@category\s+(\S+)/.exec(c.doc)?.[1])
        || 'general',
      );
    }
  }

  console.error(
    `  package: ${components.length} components` +
      (srcRoot ? ` (${components.filter((c) => c.srcPath).length} src-matched)` : ' (no src/ — dist-only)'),
  );
  return { shape: 'package', entry, components, synthEntry, exported };
}
