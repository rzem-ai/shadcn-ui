import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"

export function LoginCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="card-email">Email</Label>
            <Input id="card-email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="card-password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="card-password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ArticleCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Shipping the design system</CardTitle>
        <CardDescription>Posted 14 March · 6 min read</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-muted-foreground">
        <p>
          A design system is only as good as the moment someone reaches for it
          under deadline. If the component they need is missing, poorly named,
          or three clicks deep, they will write their own — and the system
          quietly stops being a system.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Continue reading
        </Button>
      </CardFooter>
    </Card>
  )
}

export function StatCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardDescription>Monthly recurring revenue</CardDescription>
        <CardTitle className="text-3xl tabular-nums">$48,120</CardTitle>
        <CardAction>
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            +12.4%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Up from $42,800 last month across 1,204 active subscriptions.
      </CardContent>
    </Card>
  )
}
