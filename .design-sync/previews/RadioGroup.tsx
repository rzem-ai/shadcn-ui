import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/registry/new-york-v4/ui/field"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/new-york-v4/ui/radio-group"

// Ported from examples/radio-group-demo.tsx. `defaultValue` so one option is
// visibly checked — an all-empty group shows none of the indicator styling.
export function DisplayDensity() {
  return (
    <div className="grid gap-3">
      <Label>Display density</Label>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="density-default" />
          <Label htmlFor="density-default">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="density-comfortable" />
          <Label htmlFor="density-comfortable">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="density-compact" />
          <Label htmlFor="density-compact">Compact</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

// Ported from examples/field-radio.tsx — the labelled-group composition, with
// a legend and helper text around the group.
export function SubscriptionPlan() {
  return (
    <div className="w-full max-w-sm">
      <FieldSet>
        <FieldLabel>Subscription plan</FieldLabel>
        <FieldDescription>
          Yearly and lifetime plans offer significant savings.
        </FieldDescription>
        <RadioGroup defaultValue="yearly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="plan-lifetime" />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}

// The statically renderable states: a single disabled option inside an
// otherwise live group, a whole group disabled, and aria-invalid.
export function States() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3">
        <Label>Deploy target</Label>
        <RadioGroup defaultValue="staging">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="staging" id="target-staging" />
            <Label htmlFor="target-staging">Staging</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="production" id="target-production" disabled />
            <Label htmlFor="target-production" className="opacity-50">
              Production (requires approval)
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid gap-3">
        <Label className="opacity-50">Billing cycle (locked)</Label>
        <RadioGroup defaultValue="annual" disabled>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="annual" id="cycle-annual" />
            <Label htmlFor="cycle-annual" className="opacity-50">
              Annual
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="monthly" id="cycle-monthly" />
            <Label htmlFor="cycle-monthly" className="opacity-50">
              Monthly
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid gap-3">
        <Label className="text-destructive">Shipping speed</Label>
        <RadioGroup>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="standard" id="ship-standard" aria-invalid />
            <Label htmlFor="ship-standard">Standard (5–7 days)</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="express" id="ship-express" aria-invalid />
            <Label htmlFor="ship-express">Express (2 days)</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-destructive">Pick a shipping speed.</p>
      </div>
    </div>
  )
}
