import {
  AlertCircleIcon,
  CheckCircle2Icon,
  RocketIcon,
  TriangleAlertIcon,
} from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york-v4/ui/alert"

export function Default() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        Your profile information has been updated and will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}

export function Destructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        <p>Please verify your billing information and try again.</p>
        <ul className="list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}

export function TitleOnly() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <RocketIcon />
        <AlertTitle>Deploy finished in 42s — 3 files changed.</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Your session has expired. Please log in again.</AlertTitle>
      </Alert>
    </div>
  )
}

export function CustomColors() {
  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <TriangleAlertIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription className="text-amber-800 dark:text-amber-200">
        Renew now to avoid an interruption, or upgrade to an annual plan to save
        20%.
      </AlertDescription>
    </Alert>
  )
}
