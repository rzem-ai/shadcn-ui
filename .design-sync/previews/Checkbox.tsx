import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/new-york-v4/ui/field"
import { Label } from "@/registry/new-york-v4/ui/label"

export function Basic() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="preview-checkbox-terms" />
        <Label htmlFor="preview-checkbox-terms">
          Accept terms and conditions
        </Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="preview-checkbox-notify" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="preview-checkbox-notify">Enable notifications</Label>
          <p className="text-sm text-muted-foreground">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Group() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
        <FieldDescription>
          Select the items you want to show on the desktop.
        </FieldDescription>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox id="preview-checkbox-hard-disks" defaultChecked />
            <FieldLabel
              htmlFor="preview-checkbox-hard-disks"
              className="font-normal"
            >
              Hard disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="preview-checkbox-external-disks" />
            <FieldLabel
              htmlFor="preview-checkbox-external-disks"
              className="font-normal"
            >
              External disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="preview-checkbox-servers" defaultChecked />
            <FieldLabel
              htmlFor="preview-checkbox-servers"
              className="font-normal"
            >
              Connected servers
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export function ChoiceCard() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-accent/40">
        <Checkbox id="preview-checkbox-card-weekly" defaultChecked />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">Weekly digest</p>
          <p className="text-sm text-muted-foreground">
            A Monday summary of everything that changed in your projects.
          </p>
        </div>
      </Label>
      <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-accent/40">
        <Checkbox id="preview-checkbox-card-mentions" />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">Mentions</p>
          <p className="text-sm text-muted-foreground">
            Email me whenever someone mentions me in a comment.
          </p>
        </div>
      </Label>
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="preview-checkbox-disabled" disabled />
        <Label htmlFor="preview-checkbox-disabled">
          Require SSO for all members
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="preview-checkbox-disabled-on" disabled defaultChecked />
        <Label htmlFor="preview-checkbox-disabled-on">
          Audit log streaming
        </Label>
      </div>
      <Field data-invalid>
        <Field orientation="horizontal">
          <Checkbox id="preview-checkbox-invalid" aria-invalid />
          <FieldContent>
            <FieldLabel htmlFor="preview-checkbox-invalid">
              I agree to the processing agreement
            </FieldLabel>
          </FieldContent>
        </Field>
        <FieldError
          errors={[{ message: "You must accept the agreement to continue." }]}
        />
      </Field>
    </div>
  )
}
