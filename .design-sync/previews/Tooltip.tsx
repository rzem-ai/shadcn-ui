import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import { Kbd, KbdGroup } from "@/registry/new-york-v4/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"

// Every story wraps in `TooltipProvider` — a bare `Tooltip` throws
// "Tooltip must be used within TooltipProvider" and the cell falls to the
// floor card. `defaultOpen` is what makes the tooltip visible at all: hover
// cannot be screenshotted.

export function AddToLibrary() {
  return (
    <TooltipProvider>
      <div className="flex h-32 items-center justify-center">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function Sides() {
  return (
    <TooltipProvider>
      <div className="flex h-40 items-center justify-center gap-24">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Undo</TooltipContent>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Redo</TooltipContent>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Reset</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function WithKeyboardShortcut() {
  return (
    <TooltipProvider>
      <div className="flex h-32 items-center justify-center">
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Bold">
                <BoldIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Bold <Kbd>B</Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Italic">
                <ItalicIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Italic{" "}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>I</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Underline">
                <UnderlineIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Underline <Kbd>U</Kbd>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>
    </TooltipProvider>
  )
}
