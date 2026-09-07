# design-sync notes — shadcn/ui

Repo-specific gotchas for syncing this monorepo to claude.ai/design.
Project: `shadcn/ui` — https://claude.ai/design/p/10d707de-dc02-4a59-80e3-ad8c90e9311b

## What the "design system" is here

shadcn/ui is a **registry**, not a published component package. The components
are source TSX under `apps/v4/registry/new-york-v4/ui/*.tsx` (61 files, 331
PascalCase exports) meant to be copied into consumer apps. There is no `dist/`
for them and there never will be — so the converter runs in **synth-entry mode**
(`[NO_DIST]` in the build log is expected, not a failure).

- `packages/react` is a separate tiny headless package (one export) — **not** the DS.
- The `new-york-v4` registry is the radix-based variant; `registry/bases/{aria,base,radix}`
  and `registry/styles/style-*.css` are alternate variants that are NOT synced.

## Environment gotchas

- **`--node-modules` must be the REPO ROOT**, not `apps/v4/node_modules`.
  This install hoists: `apps/v4/node_modules` has ~17 entries and no `react`,
  while the root has ~1077 flat including `react`, `react-dom`, `@types/react`.
- **`node_modules/v4` is a symlink** to `../apps/v4`, created by `cfg.buildCmd`.
  It is how `PKG_DIR` resolves (`PKG_DIR = join(NODE_MODULES, PKG)` when no
  `--entry` is passed). It lives in gitignored `node_modules/`, so it must be
  recreated on every fresh clone — `buildCmd` does that, don't drop it.
- **`packages/shadcn` must be built before the Tailwind compile.**
  `apps/v4/app/globals.css` does `@import "shadcn/tailwind.css"`, which resolves
  to `packages/shadcn/dist/tailwind.css`. `buildCmd` builds `@shadcn/react`,
  `@shadcn/helpers` and `shadcn` for this reason.
- Node: `.nvmrc` pins **v20.5.1**; this sync was built and verified on **v25.9.0**.
  Nothing in the converter path touches the Next build, so it worked — but if a
  future run behaves oddly, matching the pin is the first thing to try.
- pnpm 10.33.4 **ignores the `pnpm` field in `package.json`** (it moved to
  `pnpm-workspace.yaml`, which does not carry it). That drops the
  `@types/react: 19.2.2` override — harmless here because `--frozen-lockfile`
  still resolves 19.2.2 from the lockfile. Verify with
  `node -e "console.log(require('./node_modules/@types/react/package.json').version)"`
  if `.d.ts` output ever loses inherited React props (`[DTS_REACT]`).
- Install prints `WARN Failed to create bin … shadcn` — harmless, it just means
  `packages/shadcn` isn't built yet at install time.

## Styling: the Tailwind v4 compile is mandatory

shadcn v4 is **Tailwind v4, CSS-first**. `apps/v4/app/globals.css` is a *source*
file: `@import "tailwindcss"` + `@theme inline` token mappings + `:root`/`.dark`
variable blocks. Tailwind generates utilities **on demand** by scanning sources.

Pointing `cssEntry` straight at `globals.css` would ship token variables with no
utility rules to consume them — every component renders unstyled. So:

- `.design-sync/tailwind-entry.css` (committed) re-imports the repo's real
  `globals.css` untouched and adds `@source` coverage + a safelist.
- `cfg.buildCmd` compiles it to **`apps/v4/.ds-compiled.css`** (gitignored), and
  `cfg.cssEntry` points there.
- **The output MUST live inside `apps/v4/`.** `cssEntry` is bounded to `PKG_DIR`
  by the converter (a deliberate exfiltration guard — its content uploads
  verbatim). A path under `.design-sync/` is silently skipped with
  `! cssEntry: … resolves outside the package`.
- The Tailwind CLI is installed into `.ds-sync/` (`@tailwindcss/cli@4.3.0`) to
  match `apps/v4`'s `tailwindcss` exactly. **Keep those versions in lockstep** —
  if `apps/v4` bumps Tailwind, bump the CLI in the dep-install step too.

### The safelist, and why the CSS is 1.6 MB

Tailwind only emits classes it has *seen*. The claude.ai/design agent writes its
own layout glue (`grid-cols-7`, `mt-11`, `md:flex`) that exists in no file in
this repo, so without a safelist those classes silently don't exist and the
agent's layouts break with nothing downstream to catch it.

Section 2 of `tailwind-entry.css` is an `@source inline(...)` safelist of the
standard utility scale. Cost: **580 KB → 1.6 MB** (≈152 KB gzipped), 4020 →
13648 rules. Alex approved this tradeoff explicitly on the first sync. If you
ever need to shrink it, trim the colour-scale line (the 22-hue × 11-step block)
first — it is the single largest contributor and the least used.

Not safelisted (deliberate): `data-[state=…]:` variants beyond what the
components themselves use. The bracket syntax doesn't brace-expand, and the
components already generate the ones they need.

## Fonts

`apps/v4/lib/fonts.ts` loads **Geist** and **Geist Mono** from Google Fonts via
`next/font`, binding them to `--font-sans` / `--font-heading` / `--font-mono`.
The repo ships **no font files** — Next fetches them at build time.

Two consequences the validator only half-catches:

1. `[FONT_MISSING]` names "Geist Mono" (referenced by `app/legacy-themes.css`).
2. The **bigger** problem is invisible to it: `globals.css` declares
   `@theme inline { --font-sans: var(--font-sans) }` — a self-reference that only
   resolves because Next injects the real value. Outside Next it is undefined, so
   everything falls back to the browser default. No tag fires for this.

Fix (Alex approved fetching on the first sync):

- `.design-sync/fonts/geist.css` + 4 woff2 files (latin + latin-ext, variable
  weight 100–900) vendored from Google Fonts. **SIL Open Font License 1.1** —
  redistribution permitted. Wired via `cfg.extraFonts`.
- `--font-sans` / `--font-heading` / `--font-mono` are defined in section 1b of
  `tailwind-entry.css`, plus `html { font-family: var(--font-sans) }` because
  designs built from this bundle have no `<body className="font-sans">` wrapper.
- To regenerate the fonts:
  `curl -A "<a desktop browser UA>" "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"`
  then keep only the `/* latin */` and `/* latin-ext */` blocks and download
  their woff2 to `.design-sync/fonts/`, rewriting `url()` to `./<file>.woff2`.
  A desktop UA is required or Google returns TTF instead of woff2.
- **`Cambria` is suppressed via `cfg.runtimeFontPrefixes`.** It is not a runtime
  font service — it's an entry in the standard `ui-serif, Georgia, Cambria, …`
  fallback stack, i.e. a Microsoft system font that was never meant to ship.
  `runtimeFontPrefixes` is the only suppression knob available; the semantics are
  a slight stretch but the outcome is correct. Do not go hunting for a Cambria file.

## Why cfg.tsconfig points at a copy, not apps/v4/tsconfig.json

`cfg.tsconfig` is `.design-sync/tsconfig.paths.json`, a comment-free copy. This
is **not** cosmetic — pointing it at the real `apps/v4/tsconfig.json` silently
breaks every authored preview with `Could not resolve "@/registry/..."`.

Cause: `tsconfigPathsPlugin` (in `lib/bundle.mjs`) strips comments with a regex
before `JSON.parse`. The block-comment pattern is non-greedy but not
string-aware, and `apps/v4/tsconfig.json` contains an opening `/*` inside the
**string** `"@/app/(create)/*"` and a closing sequence inside the `include`
glob `"**/*.ts"`. The regex matches across them and deletes the entire `paths`
block. `JSON.parse` then throws, the plugin returns `null`, and no aliases exist.

Two things make this hard to spot:

- The **main bundle is unaffected** — esbuild reads `tsconfig` with its own
  correct parser, so 331 components bundle fine while every preview fails.
- The failure names the import, not the config, and the printed hypothesis
  ("add it via cfg.extraEntries") points somewhere unhelpful.

Consequences for maintenance:

- **Never put a block comment — or any asterisk-followed-by-slash sequence — in
  `tsconfig.paths.json`.** The first attempt at this file explained the bug in a
  `_comment` field, and the description of the regex re-triggered it.
- If `apps/v4/tsconfig.json` gains or changes a path alias, mirror it here by
  hand. Nothing checks that these two files agree.
- The real tsconfig's `"react": ["./node_modules/@types/react"]` mapping is
  deliberately omitted — it is a tsc types alias, and letting a bundler resolve
  `react` to a types directory would break previews if that path came to exist.

## Forked converter script

`.design-sync/overrides/source-kit.mjs` (declared in `cfg.libOverrides`).
Two changes, both forced by the registry's shape:

1. **Grouping.** The registry is a *flat* directory, so upstream's group
   heuristic ("last src path segment that isn't generic") has no segment to read
   and drops all 331 exports into `general` — an unusable picker. The fork maps
   each defining file to a curated category via `CATEGORY_BY_FILE`
   (Forms / Overlays / Navigation / Display / Feedback / Layout / Messaging).
   **If a new component file is added to the registry, add it to that table** or
   it silently lands in `general`.
2. **Compound sub-parts.** `deriveComponentsFromSrc` already knows which file
   each export came from but discarded it. The fork keeps it, so `DialogContent`
   gets `srcPath = dialog.tsx` — which gives it a group, its JSDoc, and stops the
   fuzzy matcher mis-hitting (e.g. `Toggle` onto `toggle-group.tsx`).

Groups are deliberately **single path-safe words** — `group` is used verbatim as
both the emitted directory name and the `@dsCard` label.

## Where preview compositions come from (read this before authoring more)

There are **three** example corpora in this repo, not one. Walk them in this order:

1. **`apps/v4/examples/<base>/`** — ~494 files under `radix/`. This is the richest
   set and the one the docs `.mdx` files reference by name
   (`<ComponentPreview name="badge-variants" />`). **It was missed on the first
   sync** — the authoring brief only pointed at corpus 2.
   ⚠ These import from `@/styles/radix-nova/ui/*`, which is a **different component
   set** from `registry/new-york-v4/ui/*`. Check every ported prop against the
   new-york-v4 source. Known divergences: radix-nova's `Alert` exports
   `AlertAction` (new-york-v4 does not); its `Badge` uses
   `data-icon="inline-start"` (new-york-v4 has no such hook).
2. **`apps/v4/registry/new-york-v4/examples/`** — 244 files, mostly the canonical
   `<component>-demo.tsx`. Directly compatible, no rewriting needed.
3. **`apps/v4/registry/bases/{aria,base,radix}/examples/`** — the source for demos
   with no new-york-v4 counterpart (`tabs-line`, `tabs-vertical`, `tabs-disabled`).
   Port the STRUCTURE only: rewrite imports to `new-york-v4` and strip the
   per-style variant classes (`style-vega:`, `style-nova:`) and `IconPlaceholder`.
4. `apps/v4/registry/new-york-v4/blocks/` — larger app-shell compositions. The only
   place real `Sidebar` usage lives; there are no `sidebar-*` files in corpus 2.

### Determinism rules for previews (learned the hard way)

Screenshots are graded, and a preview that renders differently each run churns the
grades on every re-sync for no reason:

- **Never animate.** `progress-demo.tsx` is a `useState` + `setTimeout` ramp; it
  screenshots at whatever frame the capture lands on. Use fixed `value` props.
- **Never default a date to "today".** `Calendar` needs an explicit
  `defaultMonth`/`selected`, or every run produces a different sheet.
- **Remote images never load** in the headless render. `https://github.com/shadcn.png`
  resolves to nothing. Use inline `data:image/svg+xml;base64,` assets —
  `previews/Avatar.tsx` defines three as module consts.

### Component-specific traps found while authoring

- **`AvatarGroup` clips `AvatarFallback` initials.** Its `-space-x-2` overlap cuts
  ~8px off each avatar, so centred two-letter initials render wrong ("CN" → "CI").
  Use images inside groups; keep initials for standalone avatars. The repo's own
  examples do the same, presumably for this reason.
- **`Separator orientation="vertical"` collapses to nothing** without a resolved
  height on the flex parent — it is `h-full w-px`, so in a height-less row it
  computes to 0. Set one explicitly (`h-5`, `h-12`).
- **The Tabs variant axis is on `TabsList`, not `Tabs`.** `tabsListVariants` is
  `default | line`; `Tabs` only takes `orientation`.
- **Radix only mounts the active `TabsContent`** — pick the `defaultValue` that
  shows the most interesting panel.
- **`Input`/`Textarea`/`Label` have no `cva` block at all** — they are thin
  `React.ComponentProps<…>` wrappers whose only axis is the native `type`
  attribute. Don't hunt for an enum prop. `Switch` has `size` but implements it via
  `data-size`, not cva, so its `.d.ts` shows `[key: string]: unknown` and the
  source is the only place the contract is visible.
- **`Label`'s `peer-disabled:opacity-50` needs the control to PRECEDE the label**
  as a sibling. `Checkbox`/`Switch` set `peer`; `Input` does not — so an
  Input-based disabled row will not dim its label.
- **The static invalid idiom is three-part** and needs no react-hook-form:
  `<Field data-invalid>` + `<Input aria-invalid>` + `<FieldError errors={[{message}]} />`.
  `FieldError` takes a plain array and returns `null` when empty.
- **Small size axes need side-by-side layout to read.** `Switch` sm→default is
  `h-3.5 w-6` → `h-[1.15rem] w-8`, invisible when stacked in separate rows.
- **Don't import `next/link` in a preview.** `BreadcrumbLink` renders a plain `<a>`
  when `asChild` is omitted, so pass `href` directly and keep Next out of the bundle.
- **`SelectContent` defaults to `position="item-aligned"`**, which lays the list
  *over* the trigger with the active item on top of it. With the trigger flush to
  the top of the frame there is no room above, so `SelectLabel` scrolls out and the
  list renders under a scroll-up chevron. Fix with a `pt-24` wrapper. Do **not**
  switch to `position="popper"` — `select.tsx` puts
  `h-[var(--radix-select-trigger-height)]` on the popper viewport, squashing the
  list to trigger height.
- **`Field orientation="horizontal"`** is only safe in the shapes the repo uses it
  in (checkbox/switch + label, or `FieldContent` + a *narrow* control). Pairing
  `FieldContent` with a full-width `Input` collapses the text to one word per line.
  **`orientation="responsive"` needs a `FieldGroup` ancestor** — it resolves through
  the `@md/field-group` container query (28rem), not the 768px viewport breakpoint.
- **The capture harness pins the clock** to `2024-05-15`
  (`page.clock.setFixedTime`, `package-capture.mjs`). Previews still pin
  `defaultMonth`/`selected` explicitly so they don't depend on that call landing.
  `Calendar`'s `captionLayout="dropdown"` story also pins `startMonth`/`endMonth`
  or the year list drifts.
- **Captures are ~700px tall and `fullPage: false`** — long compositions get
  cropped, not scaled. `field-demo`'s four fieldsets and `select-scrollable`'s 25
  timezones both had to be trimmed. Budget for the frame.
- **`Toaster` DOES render deterministically** — firing toasts from a mount effect
  settles before the screenshot. It needed no `skip` override.
- **`DropdownMenu`'s destructive variant colours both the label and the icon** via
  `data-[variant=destructive]:*:[svg]`, so it is a genuine variant axis, not a text
  colour swap. Its demo was trimmed from 14 items to fit 640x480 without engaging
  the available-height scroll clamp.
- **The card root is a containing block for `position: fixed` descendants.**
  `.ds-single { transform: translateZ(0) }` means fixed-position overlays stay boxed
  inside the card — good — but it bites twice:
  - **`Toaster`** is `fixed`. If the story root collapses to its content height
    (~36px for a lone button), `position="bottom-right"` anchors to that 36px box and
    the toast renders off the *top* of the card, clipped. Give the story root a real
    height (`h-80`). The toast was firing correctly the whole time — it is purely an
    anchoring problem, so don't mistake it for a timing failure.
  - **`svh` ignores the containing block.** `Sidebar`'s default
    `collapsible="offcanvas"` is `fixed` + `h-svh`, which resolves to the full
    viewport height while the root sits below the 24px body gutter — the footer
    clips off the bottom. Use `collapsible="none"` (a first-class prop that renders
    in normal flow) plus `<SidebarProvider className="h-[560px] min-h-0">` so
    twMerge drops the provider's `min-h-svh`.
- **`SidebarProvider` already nests a `TooltipProvider`** internally, so sidebar
  stories need no extra wrapper. Only standalone `Tooltip` stories do.
- **`Toaster` needs `duration: Infinity`** — the default 4s can expire before the
  screenshot settles. Child effects run before parent effects, so `<Toaster />` has
  subscribed to the store by the time a parent mount effect dispatches.
- **The emitted `.d.ts` is near-useless for the Forms primitives** — `Input`,
  `Textarea`, `Label`, `Switch` all come out as `{ [key: string]: unknown }`, so
  `Switch`'s `size` prop appears nowhere in the contract. For these, the registry
  source is the only place the props are visible; the brief's "sanity-check ported
  props against the `.d.ts`" step is a no-op there.
- **`checkbox-demo.tsx` hardcodes blue** (`border-blue-600`, `bg-blue-50`). Ported
  previews retarget it to DS tokens (`border-primary`, `bg-accent/40`) so the card
  teaches the token rather than a one-off hue. Keep the
  `has-[[aria-checked=true]]:` selector — that part is the useful idiom.

## `[CONFIG_STALE]` after editing cfg.overrides — order of operations

**Any change to a component's entry in `cfg.overrides` invalidates that component
until the next full `package-build.mjs`.** `preview-rebuild.mjs` compares the live
config slice against the stamped manifest and refuses to run. Its guard is
`targets.some(...)`, so **one** stale component aborts the whole call.

**The rule is "re-stamp after any override edit" — it is NOT "viewport is
special".** `configSlicesFor()` (`lib/sync-hashes.mjs`) strips `cardMode` and
`primaryStory` before hashing but not `viewport`, so a viewport *is* part of the
graded key — however a viewport that was present at build time hashes consistently
and is fine. On the first sync `Dialog` carried a `viewport` and was `ok`, while six
siblings were STALE, purely because Dialog's override existed at build time and
theirs were added afterwards.

**Do not "fix" this by stripping `viewport` out of `configSlicesFor`.**
`sync-hashes.mjs` is fork-banned (`preview-rebuild.mjs` won't honour an override for
it), and viewport genuinely belongs in the key: changing a card's viewport changes
the graded screenshot, so it must invalidate the verdict.

Practical rules:

- Edit `cfg.overrides`, then **re-stamp with a full `package-build.mjs`** before any
  scoped `preview-rebuild.mjs`.
- `package-capture.mjs` keys off the *stamped* manifest, so a component captured
  before the config edit slips through and looks fine while its siblings are
  blocked. Do not read that as "only some are affected".
- This bit the first sync: seven overrides were added mid-run and blocked an entire
  authoring batch until a re-stamp.

## Authored previews compile registry SOURCE, not the shipped bundle

**This repo violates the design-sync premise that "every preview renders the real
exported component from the bundle."** Verified on the first sync:
`ds-bundle/_preview/Dialog.js` is 208 KB, carries its own copy of the implementation
(`DialogOverlay`, `DialogPortal`, 10 × `createContext`), and contains **zero**
`window.ShadcnUI` references.

Cause: `story-imports.mjs` rule 2 only redirects an import to the bundle global when
the resolved *filename* matches an exported component name. This registry is
kebab-case (`ui/dialog.tsx`, `ui/sonner.tsx`) while its exports are PascalCase
(`Dialog`, `Toaster`), so `exportedComponentFor()` never matches and every import
falls through to rule 3 and bundles from source.

What this does and doesn't mean:

- **Floor cards are unaffected** — they render `window.ShadcnUI.<Name>` directly, so
  the 303 floor-card components genuinely exercise the shipped bundle.
- **The 28 authored cards render a source-compiled copy.** Both the copy and the
  bundle are built from the same registry source in the same run, so they agree —
  but a preview card is not proof the *bundle* renders.
- React identity is still shared: `react`/`react-dom` are externalised to
  `_vendor/*` globals in both. Context identity is fine because each preview's whole
  tree comes from one graph — the breakage mode (mixing global and source copies)
  never arises precisely because nothing redirects.
- **`Toaster` only works because of this.** `import { toast } from "sonner"` in the
  preview and the registry's `<Toaster />` land in one esbuild graph and share a
  single sonner store. Had the redirect fired they would be two module instances and
  no toast could ever appear.

⚠ **If a future design-sync release "fixes" the kebab-vs-Pascal resolution, Toaster
will break** and every authored preview will start rendering the bundle instead.
That is arguably more correct — but re-verify the whole authored set if it happens.

## Tailwind arbitrary values in previews fail SILENTLY

`tailwind-entry.css` has `@source "./previews/**/*.tsx"`, so classes used in
authored previews *are* compiled — **but only on the next full build**, because
the CSS is produced by `cfg.buildCmd`. Against the current `.ds-compiled.css`, any
arbitrary value not already scanned from the repo emits no rule at all, with no
error: `w-[220px]` silently did nothing and left Select triggers full-width, while
`w-[240px]` (used somewhere in the repo) worked.

- Prefer standard scale utilities in previews. If you need an arbitrary value,
  check first: `grep -cF '.w-\[240px\]' apps/v4/.ds-compiled.css`
- The emitted selector escapes brackets **and** the `:` in variants
  (`.md\:min-w-\[450px\]`), so a naive grep reads as a false negative.
- Or just re-run `cfg.buildCmd` after adding new classes — that recompiles the CSS
  with the previews in scope.

## Known render warns (triaged — a warn NOT in this list is new)

- **`[TOKENS_MISSING]` — ~39 custom properties.** Almost all are set at runtime
  by the underlying primitives, exactly as the tag's own text predicts:
  `--radix-*`, `--accordion-panel-height`, `--disclosure-panel-height`,
  `--popup-height`, `--positioner-height`, `--ratio` (AspectRatio),
  `--toast-index` (Sonner). Non-blocking, no action.
- **259 components show the typographic floor card.** These are compound
  sub-parts that throw a provider error when rendered alone
  (`DialogTrigger must be used within Dialog`, `useSidebar must be used within a
  SidebarProvider`, `Base UI: ComboboxRootContext is missing`). That is *correct*
  behaviour — the floor card is the designed fallback, not a failure. They remain
  fully importable and carry a real `.d.ts` + `.prompt.md`.
- **`[RENDER_BLANK]` on components that render but have no content.** An empty
  `<button>`, a `Badge` with no children. `rootEmpty` and `errs` are 0 across the
  board — nothing is broken, they just have no children. Authoring a preview is
  the fix; the ones outside the authored scope stay flagged by design.

## Decisions taken on the first sync (don't re-litigate without asking)

- **All 331 exports are synced as components**, not just the 61 registry files.
  Alex chose this so every compound sub-part (`DialogContent`, `SidebarMenuButton`)
  carries a real `.d.ts` contract the design agent codes against. The cost is
  accepted picker noise.
- **Preview scope was 28 components** (the core primitives). The other 303 ship the
  floor card. Authoring more is a standing offer on any re-sync — authored files
  and grades carry forward, so it costs nothing to re-verify the rest.
- **53 compound sub-parts render as near-empty cards** (`CardHeader`, `TableCell`,
  `SheetHeader`, `AlertTitle`, `SidebarGroup`, …). They are NOT broken:
  `rootEmpty: 0`, zero runtime errors, full `.d.ts` + docs. They simply have no
  children of their own, so `[RENDER_BLANK]` fires. Alex explicitly chose to ship
  them as-is rather than author 53 more previews or force them to the floor card.
  **A future sync should not treat these 53 as regressions.**
- **The safelist / 1.6 MB stylesheet** was an explicit tradeoff (see the Tailwind
  section). Don't shrink it without asking — the failure mode it prevents is silent.

## Re-sync risks — what can silently go stale

- **The Tailwind CLI version in `.ds-sync/` is pinned by hand.** It is installed
  by the dep-install step, not by the repo's lockfile. If `apps/v4` bumps
  `tailwindcss`, the compile will silently use the *old* CLI and may emit
  different CSS. Check both versions match before trusting a re-sync.
- **`CATEGORY_BY_FILE` in the fork is a hand-maintained list of 61 filenames.**
  New registry components land in `general` until someone adds them. The build log
  won't complain.
- **The safelist is a hand-maintained guess** at what a design agent writes. It
  is not derived from anything and cannot go stale *incorrectly*, but it also
  won't grow to cover new Tailwind utilities on its own.
- **Vendored fonts are pinned to whatever Google served on the fetch date.**
  Geist v5 / Geist Mono v6 as of this sync. They will not update themselves, and
  a Geist release would not be noticed here.
- **`node_modules/v4` symlink and `.design-sync/node_modules` symlink** are both
  gitignored and must be recreated on a fresh clone. `buildCmd` handles the
  first; the second (`ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`)
  is needed because the committed fork imports `ts-morph` by bare specifier.
- **The upstream `lib/source-kit.mjs` may drift.** Diff the fork against it on
  re-sync and merge upstream changes — the fork is a near-copy with three small
  edits, all marked `// fork:`.
