import { ArrowUpIcon, Loader2Icon, MailIcon, PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Save changes</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <MailIcon /> Email invite
      </Button>
      <Button variant="outline">
        <PlusIcon /> New project
      </Button>
      <Button variant="destructive">
        <TrashIcon /> Delete
      </Button>
    </div>
  )
}

export function IconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-sm" variant="outline" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
      <Button size="icon" variant="outline" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled outline
      </Button>
      <Button disabled>
        <Loader2Icon className="animate-spin" /> Saving…
      </Button>
    </div>
  )
}
