import { Button } from "@/registry/new-york-v4/ui/button"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/new-york-v4/ui/field"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/new-york-v4/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Switch } from "@/registry/new-york-v4/ui/switch"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

// Ported from examples/field-demo.tsx, trimmed to the payment section so the
// composition fits one capture. Shows FieldSet/FieldLegend, nested FieldGroup,
// per-field FieldDescription, and a three-column row of Fields.
export function PaymentDetails() {
  return (
    <form className="w-full max-w-md">
      <FieldSet>
        <FieldLegend>Payment method</FieldLegend>
        <FieldDescription>
          All transactions are secure and encrypted.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="pay-card-name">Name on card</FieldLabel>
            <Input id="pay-card-name" placeholder="Evil Rabbit" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="pay-card-number">Card number</FieldLabel>
            <Input
              id="pay-card-number"
              placeholder="1234 5678 9012 3456"
              required
            />
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="pay-exp-month">Month</FieldLabel>
              <Select>
                <SelectTrigger id="pay-exp-month">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">01</SelectItem>
                  <SelectItem value="02">02</SelectItem>
                  <SelectItem value="03">03</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="pay-exp-year">Year</FieldLabel>
              <Select>
                <SelectTrigger id="pay-exp-year">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="pay-cvv">CVV</FieldLabel>
              <Input id="pay-cvv" placeholder="123" required />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

// Ported from examples/field-group.tsx — horizontal Fields as a checkbox
// group, two FieldSets divided by a FieldSeparator.
export function NotificationPreferences() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Responses</FieldLabel>
          <FieldDescription>
            Get notified when a request that takes time finishes, like research
            or image generation.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="notify-responses-push" defaultChecked />
              <FieldLabel
                htmlFor="notify-responses-push"
                className="font-normal"
              >
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Tasks</FieldLabel>
          <FieldDescription>
            Get notified when tasks you have created have updates.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="notify-tasks-push" />
              <FieldLabel htmlFor="notify-tasks-push" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="notify-tasks-email" defaultChecked />
              <FieldLabel htmlFor="notify-tasks-email" className="font-normal">
                Email notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}

// Ported from examples/field-choice-card.tsx — a FieldLabel wrapping a Field
// becomes a bordered choice card, and the checked one picks up the primary
// border and tint.
export function ChoiceCards() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLabel htmlFor="compute-kubernetes">
          Compute environment
        </FieldLabel>
        <FieldDescription>
          Select the compute environment for your cluster.
        </FieldDescription>
        <RadioGroup defaultValue="kubernetes">
          <FieldLabel htmlFor="compute-kubernetes">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Kubernetes</FieldTitle>
                <FieldDescription>
                  Run GPU workloads on a K8s configured cluster.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="kubernetes" id="compute-kubernetes" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="compute-vm">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Virtual machine</FieldTitle>
                <FieldDescription>
                  Access a VM configured cluster to run GPU workloads.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="vm" id="compute-vm" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}

// The `orientation` axis, one row per value. Each is shown in the shape the
// repo's own examples use it in: `vertical` stacks label over control,
// `horizontal` is the checkbox/switch row, and `responsive` (ported from
// examples/field-responsive.tsx) folds a FieldContent block beside its control.
// The FieldGroup wrapper is required — `responsive` resolves through the
// @md/field-group container query, so without it the row never goes wide.
export function OrientationAxis() {
  return (
    <div className="w-full max-w-3xl">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>Fill in your profile information.</FieldDescription>
        <FieldSeparator />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="profile-handle">Handle</FieldLabel>
            <Input id="profile-handle" defaultValue="@evilrabbit" />
            <FieldDescription>
              Used for your public profile URL.
            </FieldDescription>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Switch id="profile-newsletter" defaultChecked />
            <FieldLabel htmlFor="profile-newsletter" className="font-normal">
              Subscribe to the monthly newsletter
            </FieldLabel>
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
              <FieldDescription>
                Keep it short, preferably under 100 characters.
              </FieldDescription>
            </FieldContent>
            <Textarea
              id="profile-bio"
              placeholder="Designer, occasional gardener."
              className="min-h-[100px] resize-none sm:min-w-[300px]"
            />
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <Button type="submit">Save profile</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

// The error state, composed the way the docs prescribe: `data-invalid` on the
// Field turns the whole block destructive, `aria-invalid` styles the control,
// and FieldError renders the message under it. A valid sibling field is kept
// alongside so the contrast is legible.
export function ValidationState() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="account-name">Workspace name</FieldLabel>
          <Input id="account-name" defaultValue="Acme Design Systems" />
          <FieldDescription>
            Visible to everyone in the workspace.
          </FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="account-email">Billing email</FieldLabel>
          <Input id="account-email" defaultValue="billing@acme" aria-invalid />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </FieldGroup>
    </div>
  )
}
