import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/new-york-v4/ui/card"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

export function Profile() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </div>
  )
}

export function CardPlaceholder() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full rounded-xl" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  )
}

export function TextLines() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

export function TableRows() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-16" />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex items-center gap-4" key={index}>
          <Skeleton className="size-6 shrink-0 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function FormFields() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  )
}
