import { LockIcon } from "lucide-react"

import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Switch } from "@/registry/new-york-v4/ui/switch"

export function FormRow() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="preview-label-email">Email</Label>
      <Input
        id="preview-label-email"
        type="email"
        placeholder="name@example.com"
      />
      <p className="text-sm text-muted-foreground">
        Enter your email address.
      </p>
    </div>
  )
}

export function WithControls() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="preview-label-terms" defaultChecked />
        <Label htmlFor="preview-label-terms">
          Accept terms and conditions
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="preview-label-airplane" />
        <Label htmlFor="preview-label-airplane">Airplane mode</Label>
      </div>
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="preview-label-key">
        <LockIcon className="size-3.5" />
        API secret key
      </Label>
      <Input
        id="preview-label-key"
        type="password"
        defaultValue="sk-live-3f9a2b1c8e4d"
      />
      <p className="text-sm text-muted-foreground">
        Rotating the key revokes the previous one immediately.
      </p>
    </div>
  )
}

export function Disabled() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="preview-label-archive" disabled />
        <Label htmlFor="preview-label-archive">
          Archive instead of deleting
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="preview-label-readonly" disabled defaultChecked />
        <Label htmlFor="preview-label-readonly">Read-only mode</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        The workspace owner has locked these settings.
      </p>
    </div>
  )
}
