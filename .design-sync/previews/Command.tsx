import {
  BookOpenIcon,
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  FolderIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/new-york-v4/ui/command"

// Ported from examples/command-demo.tsx: two groups with a separator, leading
// icons, a disabled item, and CommandShortcut hints.
export function CommandPalette() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <CalculatorIcon />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// A typed query that matches: cmdk filters the list against CommandInput's
// controlled `value`, so this renders the narrowed result set statically.
export function FilteredSearch() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Search projects..." value="design" />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem>
            <FolderIcon />
            <span>Design system tokens</span>
            <CommandShortcut>Updated 2d ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FolderIcon />
            <span>Design review queue</span>
            <CommandShortcut>Updated 5d ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BookOpenIcon />
            <span>Redesign changelog</span>
            <CommandShortcut>Updated 3w ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FolderIcon />
            <span>Billing migration</span>
            <CommandShortcut>Updated 1h ago</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// The empty state, which the palette only reaches at runtime: a query that
// matches nothing leaves CommandEmpty as the whole list.
export function EmptyState() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Search projects..." value="quarterly budget" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem>
            <FolderIcon />
            <span>Design system tokens</span>
          </CommandItem>
          <CommandItem>
            <BookOpenIcon />
            <span>Redesign changelog</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
