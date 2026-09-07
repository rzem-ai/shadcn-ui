import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

// Ported from examples/select-demo.tsx, opened with `defaultOpen` — a closed
// Select is only its trigger button, which shows none of the listbox styling.
// `onOpenAutoFocus` is prevented because Radix focuses the first item on open,
// which screenshots as a solid highlight bar over the top row.
//
// The `pt-24` wrapper is load-bearing: SelectContent defaults to
// position="item-aligned", which lays the list over the trigger with the
// active item on top of it. Flush against the top of the frame there is
// nowhere for SelectLabel to go, so it scrolls out and the list renders under
// a scroll-up chevron instead.
export function FruitPicker() {
  return (
    <div className="pt-24">
      <Select defaultOpen>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

// Ported from examples/select-scrollable.tsx, trimmed to three groups so the
// open list fits the capture viewport. Shows SelectLabel headings, a
// SelectSeparator between groups, and a disabled item.
export function TimezonePicker() {
  return (
    <div className="pt-24">
      <Select defaultOpen>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe &amp; Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia &amp; Pacific</SelectLabel>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="aest" disabled>
              Australian Eastern Standard Time (AEST)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

// The trigger axis, which the open list never shows: the `size` prop
// (default | sm), a resolved value vs. the muted placeholder, and the disabled
// and aria-invalid states.
//
// Widths use w-[240px] rather than a rounder number because Tailwind generates
// arbitrary values only for classes it has scanned, and the bundle CSS is
// compiled from the repo's own sources — an unused value emits no rule and the
// trigger silently stretches to fill its row.
export function TriggerStates() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Default size
        </span>
        <Select defaultValue="published">
          <SelectTrigger className="w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Small size
        </span>
        <Select defaultValue="published">
          <SelectTrigger size="sm" className="w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Disabled
        </span>
        <Select disabled defaultValue="team">
          <SelectTrigger className="w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team">Team plan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Invalid
        </span>
        <Select>
          <SelectTrigger aria-invalid className="w-[240px]">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ap-southeast-2">ap-southeast-2</SelectItem>
            <SelectItem value="us-east-1">us-east-1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
