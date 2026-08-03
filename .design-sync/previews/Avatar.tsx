import { CheckIcon, PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/new-york-v4/ui/avatar"

const INDIGO_PORTRAIT =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjODE4Y2Y4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45MiIvPjxwYXRoIGQ9Ik0zMiAzOWMtMTAgMC0xOCA2LjQtMTggMTQuNFY2NGgzNlY1My40QzUwIDQ1LjQgNDIgMzkgMzIgMzl6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTIiLz48L3N2Zz4="

const TEAL_PORTRAIT =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWVlYWQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMGQ5NDg4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45MiIvPjxwYXRoIGQ9Ik0zMiAzOWMtMTAgMC0xOCA2LjQtMTggMTQuNFY2NGgzNlY1My40QzUwIDQ1LjQgNDIgMzkgMzIgMzl6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTIiLz48L3N2Zz4="

const AMBER_PORTRAIT =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmNkMzRkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZDk3NzA2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45MiIvPjxwYXRoIGQ9Ik0zMiAzOWMtMTAgMC0xOCA2LjQtMTggMTQuNFY2NGgzNlY1My40QzUwIDQ1LjQgNDIgMzkgMzIgMzl6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTIiLz48L3N2Zz4="

export function WithImage() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar>
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={TEAL_PORTRAIT} alt="Priya Raghavan" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <Avatar size="lg" className="rounded-lg">
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function Fallback() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarFallback className="rounded-lg">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          MK
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function WithBadge() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar size="lg">
        <AvatarFallback>AC</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-700" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
        <AvatarFallback>AC</AvatarFallback>
        <AvatarBadge className="bg-amber-500 dark:bg-amber-600" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>PR</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}

export function Group() {
  return (
    <div className="flex flex-col items-start gap-6">
      <AvatarGroup>
        <Avatar>
          <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={TEAL_PORTRAIT} alt="Priya Raghavan" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AMBER_PORTRAIT} alt="Jonas Delacroix" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarImage src={AMBER_PORTRAIT} alt="Jonas Delacroix" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src={INDIGO_PORTRAIT} alt="Amara Chen" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src={TEAL_PORTRAIT} alt="Priya Raghavan" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>
          <PlusIcon />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
