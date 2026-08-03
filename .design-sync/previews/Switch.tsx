import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Switch } from "@/registry/new-york-v4/ui/switch"

export function Basic() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-airplane" />
        <Label htmlFor="preview-switch-airplane">Airplane mode</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-marketing" defaultChecked />
        <Label htmlFor="preview-switch-marketing">Marketing emails</Label>
      </div>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-sm-off" size="sm" />
        <Switch id="preview-switch-sm-on" size="sm" defaultChecked />
        <Label htmlFor="preview-switch-sm-on">Small</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-default-off" />
        <Switch id="preview-switch-default-on" defaultChecked />
        <Label htmlFor="preview-switch-default-on">Default</Label>
      </div>
    </div>
  )
}

export function SettingsRows() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="preview-switch-2fa">
              Multi-factor authentication
            </FieldLabel>
            <FieldDescription>
              Require a second factor when signing in from a new device.
            </FieldDescription>
          </FieldContent>
          <Switch id="preview-switch-2fa" defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="preview-switch-digest">
              Weekly digest
            </FieldLabel>
            <FieldDescription>
              A Monday summary of activity across your projects.
            </FieldDescription>
          </FieldContent>
          <Switch id="preview-switch-digest" />
        </Field>
      </FieldGroup>
    </div>
  )
}

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-audit" disabled />
        <Label htmlFor="preview-switch-audit">Audit log streaming</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="preview-switch-sso" disabled defaultChecked />
        <Label htmlFor="preview-switch-sso">Require SSO for all members</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Available on the Enterprise plan.
      </p>
    </div>
  )
}
