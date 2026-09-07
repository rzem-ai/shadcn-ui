import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"

export function Basic() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="preview-input-email">Email</Label>
      <Input
        id="preview-input-email"
        type="email"
        placeholder="name@example.com"
      />
      <p className="text-sm text-muted-foreground">
        We&apos;ll only use this to send receipts.
      </p>
    </div>
  )
}

export function Types() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-3">
        <Label htmlFor="preview-input-name">Full name</Label>
        <Input id="preview-input-name" defaultValue="Ada Lovelace" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="preview-input-password">Password</Label>
        <Input
          id="preview-input-password"
          type="password"
          defaultValue="correcthorsebattery"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="preview-input-seats">Seats</Label>
        <Input id="preview-input-seats" type="number" defaultValue={12} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="preview-input-avatar">Avatar</Label>
        <Input id="preview-input-avatar" type="file" />
      </div>
    </div>
  )
}

export function WithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </div>
  )
}

export function Invalid() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field data-invalid>
          <FieldLabel htmlFor="preview-input-username">Username</FieldLabel>
          <Input
            id="preview-input-username"
            aria-invalid
            defaultValue="ada lovelace"
          />
          <FieldError
            errors={[
              { message: "Only letters, numbers and underscores allowed." },
            ]}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="preview-input-workspace">Workspace</FieldLabel>
          <Input id="preview-input-workspace" defaultValue="acme-inc" />
          <FieldDescription>
            Used in your workspace URL. Letters and dashes only.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}

export function Disabled() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-3">
        <Label htmlFor="preview-input-plan">Plan</Label>
        <Input id="preview-input-plan" defaultValue="Enterprise" disabled />
        <p className="text-sm text-muted-foreground">
          Contact sales to change your plan.
        </p>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="preview-input-invite">Invite email</Label>
        <Input
          id="preview-input-invite"
          type="email"
          placeholder="name@example.com"
          disabled
        />
      </div>
    </div>
  )
}
