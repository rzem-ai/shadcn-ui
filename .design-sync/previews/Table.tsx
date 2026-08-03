import { MoreHorizontalIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/new-york-v4/ui/avatar"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
]

export function Invoices() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

const members = [
  { name: "Amara Chen", initials: "AC", role: "Owner", status: "Active" },
  { name: "Jonas Delacroix", initials: "JD", role: "Admin", status: "Active" },
  {
    name: "Priya Raghavan",
    initials: "PR",
    role: "Developer",
    status: "Invited",
  },
  { name: "Mira Kowalski", initials: "MK", role: "Billing", status: "Active" },
  { name: "Tomás Ferreira", initials: "TF", role: "Viewer", status: "Inactive" },
]

export function TeamMembers() {
  return (
    <Table>
      <TableCaption>Members with access to the Acme workspace.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.name}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {member.role}
            </TableCell>
            <TableCell className="text-right">
              <Badge
                variant={
                  member.status === "Active"
                    ? "secondary"
                    : member.status === "Invited"
                      ? "outline"
                      : "ghost"
                }
              >
                {member.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const products = [
  { name: "Wireless Mouse", sku: "ACC-1042", stock: 128, price: "$29.99" },
  { name: "Mechanical Keyboard", sku: "ACC-2210", stock: 34, price: "$129.99" },
  { name: "USB-C Hub", sku: "ACC-3388", stock: 0, price: "$49.99" },
  { name: "27″ 4K Monitor", sku: "DSP-0091", stock: 12, price: "$419.00" },
]

export function Products() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="w-[52px]">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.sku}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="font-mono text-muted-foreground">
              {product.sku}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {product.stock === 0 ? (
                <Badge variant="destructive">Out of stock</Badge>
              ) : (
                product.stock
              )}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {product.price}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
