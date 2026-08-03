## Building with shadcn/ui

shadcn/ui is a **Tailwind CSS v4** system. Components ship their own styling; you
write the layout glue around them with Tailwind utility classes.

### Setup

**No global provider is required.** Render any component directly. Three exceptions:

| Component | Must be wrapped in |
|---|---|
| `Tooltip` | `TooltipProvider` (throws `Tooltip must be used within TooltipProvider`) |
| `Sidebar` and every `Sidebar*` part | `SidebarProvider` (throws `useSidebar must be used within a SidebarProvider`) |
| `ChartTooltip`, `ChartLegend` | `ChartContainer` |

**Dark mode**: put `className="dark"` on an ancestor (usually the root element).
Every token below flips automatically. There is no theme prop and no theme object.

### Colour: always use a token PAIR

This is the one rule that matters most. Every surface token has a matching
`-foreground` token, and you must use them together. Writing `bg-primary
text-white` is wrong — it breaks in dark mode and on re-themed installs.

```
bg-primary      text-primary-foreground      ← the accent action
bg-secondary    text-secondary-foreground    ← the quiet action
bg-destructive  text-destructive-foreground  ← danger
bg-muted        text-muted-foreground        ← de-emphasised blocks and helper text
bg-accent       text-accent-foreground       ← hover/active surfaces
bg-card         text-card-foreground         ← raised panels
bg-popover      text-popover-foreground      ← floating surfaces
bg-background   text-foreground              ← the page itself
bg-surface      text-surface-foreground      ← recessed sections
```

Also available: `border-border` (the default border colour — plain `border` already
uses it), `border-input` (form field borders), `ring-ring` (focus rings),
`bg-chart-1` … `bg-chart-5` (data series), and the `sidebar-*` family
(`bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`, `border-sidebar-border`).
Opacity modifiers work: `bg-primary/90`, `border-border/50`.

The full Tailwind palette (`bg-blue-500`, `text-zinc-400`, …) is also compiled and
available — but **prefer the semantic tokens**, because only those re-theme.

### Radius, type, spacing

- Radius derives from one `--radius` variable: `rounded-sm` `rounded-md`
  `rounded-lg` `rounded-xl` `rounded-2xl`. Components mostly use `rounded-md`.
- Type: `font-sans` (Geist) is the default and already applied to the document;
  `font-mono` (Geist Mono) for code; `font-heading` for display text. Standard
  Tailwind sizes — body copy is `text-sm`, which is shadcn's default UI size.
- Spacing is the standard Tailwind scale (`gap-2`, `p-4`, `space-y-6`).

### Variants come from props, not class names

Don't restyle a component with utilities — use its variant props, which are typed
in each component's `.d.ts`. For example `Button` takes
`variant="default | secondary | outline | ghost | destructive | link"` and
`size="xs | sm | default | lg | icon | icon-sm | icon-lg"`.

For styling a non-button element to look like a button, the variant functions are
exported: `buttonVariants`, `badgeVariants`, `toggleVariants`,
`buttonGroupVariants`, `tabsListVariants`, `markerVariants`,
`navigationMenuTriggerStyle`. Hooks `useSidebar`, `useFormField`, `useDirection`
are exported too.

**`cn` is NOT exported** — compose class strings yourself. **`toast()` is NOT
exported** either; `Toaster` renders the region, but firing toasts needs `sonner`.

### Compound components

Most components are families you assemble, not single elements — `Card` +
`CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`/`CardAction`;
`Dialog` + `DialogTrigger`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogFooter`.
Every part has its own `.d.ts`. Check the parent's `.prompt.md` for the real shape.

### Where the truth is

Read before styling: `_ds/<folder>/styles.css` and its `@import` closure — every
token above is defined there. Per component, read
`components/<Group>/<Name>/<Name>.prompt.md` (shadcn's own documentation) and
`<Name>.d.ts` (the exact props).

### An idiomatic example

```tsx
<div className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
  <h2 className="text-lg font-semibold tracking-tight">Team members</h2>
  <p className="text-sm text-muted-foreground">Invite a colleague to collaborate.</p>
  <Card>
    <CardHeader>
      <CardTitle>Pending invitations</CardTitle>
      <CardDescription>2 invitations awaiting a response</CardDescription>
      <CardAction>
        <Button size="sm" variant="outline">Resend all</Button>
      </CardAction>
    </CardHeader>
    <CardContent className="flex items-center justify-between border-t pt-4">
      <span className="text-sm">alex@example.com</span>
      <Badge variant="secondary">Invited</Badge>
    </CardContent>
  </Card>
</div>
```

Note the split: `Card`/`Button`/`Badge` do their own styling and take variant
props; the utilities (`flex`, `gap-4`, `p-6`, `text-muted-foreground`) are only
the layout and typography glue around them.
