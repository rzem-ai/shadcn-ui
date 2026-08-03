"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/registry/new-york-v4/ui/button"
import { Toaster } from "@/registry/new-york-v4/ui/sonner"

// Toaster renders an empty portal until a toast is dispatched, so each story
// fires one from a mount effect. Child effects run before parent effects, so
// the <Toaster /> below has already subscribed to sonner's store by the time
// the effect calls toast(). `duration: Infinity` keeps the toast on screen —
// the default 4s timeout can expire before the screenshot settles.
//
// The `h-80` wrapper is load-bearing: sonner's toaster is `position: fixed`,
// and the card root carries a `transform`, which makes it the containing
// block. Without an explicit height the root collapses to the button's ~36px
// and `position="bottom-right"` anchors the toast off the top of the card.
function useToastOnMount(fire: () => void) {
  const fired = React.useRef(false)
  React.useEffect(() => {
    if (fired.current) return
    fired.current = true
    fire()
  })
}

export function EventCreated() {
  useToastOnMount(() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      duration: Infinity,
      action: { label: "Undo", onClick: () => {} },
    })
  )

  return (
    <div className="flex h-80 items-center justify-center">
      <Button variant="outline">Show Toast</Button>
      <Toaster position="bottom-right" />
    </div>
  )
}

export function Types() {
  useToastOnMount(() => {
    toast.success("Changes saved", {
      description: "Your profile is up to date.",
      duration: Infinity,
    })
    toast.error("Payment failed", {
      description: "Your card was declined.",
      duration: Infinity,
    })
    toast.warning("Storage almost full", {
      description: "You have used 92% of your quota.",
      duration: Infinity,
    })
  })

  return (
    <div className="flex h-80 items-center justify-center">
      <Button variant="outline">Show Toasts</Button>
      <Toaster position="bottom-right" expand visibleToasts={3} />
    </div>
  )
}
