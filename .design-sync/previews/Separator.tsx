import { Separator } from "@/registry/new-york-v4/ui/separator"

export function TextBlockSeparator() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        A set of beautifully designed components that you can customize, extend
        and build on.
      </p>
    </div>
  )
}

export function InlineNavSeparator() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  )
}

export function StatRowSeparator() {
  return (
    <div className="flex h-12 items-center gap-4 text-sm">
      <div className="flex flex-col gap-1">
        <span className="font-medium tabular-nums">1,204</span>
        <span className="text-xs text-muted-foreground">Subscribers</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium tabular-nums">$48,120</span>
        <span className="text-xs text-muted-foreground">Revenue</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium tabular-nums">2.4%</span>
        <span className="text-xs text-muted-foreground">Churn</span>
      </div>
    </div>
  )
}

export function ListSeparator() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>Subtotal</dt>
        <dd className="tabular-nums text-muted-foreground">$120.00</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Shipping</dt>
        <dd className="tabular-nums text-muted-foreground">$8.00</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between font-medium">
        <dt>Total</dt>
        <dd className="tabular-nums">$128.00</dd>
      </dl>
    </div>
  )
}
