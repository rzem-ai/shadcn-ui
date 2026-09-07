import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function Basic() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="preview-textarea-message">Your message</Label>
      <Textarea
        id="preview-textarea-message"
        placeholder="Type your message here."
      />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}

export function WithValue() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="preview-textarea-release">Release notes</Label>
      <Textarea
        id="preview-textarea-release"
        rows={5}
        defaultValue={
          "Fixed a race condition in the sync queue that could drop offline edits.\n\nThe settings page now remembers its last open section between visits."
        }
      />
    </div>
  )
}

export function WithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}

export function Invalid() {
  return (
    <div className="w-full">
      <Field data-invalid>
        <FieldLabel htmlFor="preview-textarea-bio">Bio</FieldLabel>
        <Textarea
          id="preview-textarea-bio"
          aria-invalid
          rows={3}
          defaultValue="Staff engineer. I work on the sync layer, the offline cache, the migration tooling, and most of the things nobody else wants to own."
        />
        <FieldError errors={[{ message: "Bio must be 140 characters or fewer." }]} />
      </Field>
    </div>
  )
}

export function Disabled() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="preview-textarea-reason">Cancellation reason</Label>
      <Textarea
        id="preview-textarea-reason"
        rows={3}
        defaultValue="Migrating to an annual plan next quarter."
        disabled
      />
      <p className="text-sm text-muted-foreground">
        This response was submitted and can no longer be edited.
      </p>
    </div>
  )
}
