import { AppWindowIcon, CodeIcon, LockIcon } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"

export function AccountTabs() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-account-name">Name</Label>
                <Input id="tabs-account-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-account-username">Username</Label>
                <Input id="tabs-account-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-password-current">Current password</Label>
                <Input id="tabs-password-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-password-new">New password</Label>
                <Input id="tabs-password-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function LineTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-2 text-sm">
        <p className="text-2xl font-semibold tabular-nums">$48,120</p>
        <p className="text-muted-foreground">
          Monthly recurring revenue, up 12.4% from last month.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="pt-2 text-sm">
        <p className="text-muted-foreground">
          Sessions, conversion and retention across all channels.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="pt-2 text-sm">
        <p className="text-muted-foreground">
          Scheduled exports delivered to your team every Monday.
        </p>
      </TabsContent>
    </Tabs>
  )
}

export function VerticalTabs() {
  return (
    <Tabs
      defaultValue="notifications"
      orientation="vertical"
      className="w-full max-w-md"
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <div className="rounded-lg border p-4 text-sm">
        <TabsContent value="general">
          Manage your workspace name, timezone and default language.
        </TabsContent>
        <TabsContent value="notifications">
          Choose which notifications you receive and where they are delivered.
          Deploy alerts and mentions are always sent to your inbox.
        </TabsContent>
        <TabsContent value="billing">
          Update your payment method and download past invoices.
        </TabsContent>
      </div>
    </Tabs>
  )
}

export function IconTabs() {
  return (
    <Tabs defaultValue="preview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
        <TabsTrigger value="deploy" disabled>
          <LockIcon />
          Deploy
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="pt-2 text-sm text-muted-foreground">
        A live render of the component with the current props applied.
      </TabsContent>
      <TabsContent value="code" className="pt-2 text-sm text-muted-foreground">
        The source you can copy straight into your project.
      </TabsContent>
    </Tabs>
  )
}
