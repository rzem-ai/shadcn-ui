import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
  ClockIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Badge } from "@/registry/new-york-v4/ui/badge"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link" asChild>
        <a href="#changelog">Link</a>
      </Badge>
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="secondary"
        className="bg-blue-500 text-white dark:bg-blue-600"
      >
        <BadgeCheckIcon />
        Verified
      </Badge>
      <Badge variant="outline">
        <ClockIcon />
        Pending review
      </Badge>
      <Badge variant="destructive">
        <TriangleAlertIcon />
        Build failed
      </Badge>
      <Badge asChild>
        <a href="#release">
          v2.4 released
          <ArrowUpRightIcon />
        </a>
      </Badge>
    </div>
  )
}

export function Counts() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        8
      </Badge>
      <Badge
        variant="destructive"
        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      >
        99
      </Badge>
      <Badge
        variant="secondary"
        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      >
        20+
      </Badge>
      <Badge
        variant="outline"
        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      >
        3
      </Badge>
    </div>
  )
}

export function StatusColors() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Active
      </Badge>
      <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
        Trialing
      </Badge>
      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Invited
      </Badge>
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        Past due
      </Badge>
    </div>
  )
}
