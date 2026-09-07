import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

// `defaultOpen` so the card shows the panel rather than a bare trigger, and
// `onOpenAutoFocus` prevented because Radix focuses the first field on open —
// the selected text screenshots as a black highlight bar.

export function Dimensions() {
  return (
    <div className="flex justify-center">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="popover-width">Width</Label>
                <Input
                  id="popover-width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="popover-max-width">Max. width</Label>
                <Input
                  id="popover-max-width"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="popover-height">Height</Label>
                <Input
                  id="popover-height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function AgentTask() {
  return (
    <div className="flex justify-center">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Copilot
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="rounded-xl p-0 text-sm"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Agent Tasks</div>
          </div>
          <Separator />
          <div className="p-4 text-sm">
            <Textarea
              placeholder="Describe your task in natural language."
              className="mb-4 resize-none"
            />
            <p className="font-medium">Start a new task with Copilot</p>
            <p className="text-muted-foreground">
              Copilot will work in the background and open a pull request for
              your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
