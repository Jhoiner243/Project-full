import React, { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, BarChart2, Users, ShoppingCart, Settings, Menu, Search, Bell, ChevronDown, LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MenuItem {
  name: string
  icon: LucideIcon
  href: string
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
  { name: "Products", icon: ShoppingCart, href: "/dashboard/products" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

interface StatCardProps {
  title: string
  value: string
  change: string
}

const DashboardLayoutComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] p-0">
                  <MobileNav />
                </SheetContent>
              </Sheet>
              <Link to="/dashboard" className="flex items-center space-x-2">
                <LayoutDashboard className="h-6 w-6" />
                <span className="font-bold text-xl">MyDashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <form className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[300px] pl-8"
                />
              </form>
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex-1 items-start md:grid md:grid-cols-[240px_1fr]">
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <ScrollArea className="h-full py-6 pl-6 pr-6">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      location.pathname === item.href && "bg-muted text-primary font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </aside>
          <main className="flex-1 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" />
              <StatCard title="Subscriptions" value="2,350" change="-3.2%" />
              <StatCard title="Active Users" value="1,200" change="+28.5%" />
              <StatCard title="Conversion Rate" value="3.67%" change="+5.4%" />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

const MobileNav: React.FC = () => {
  const location = useLocation()
  return (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
      <Link to="/dashboard" className="flex items-center space-x-2 mb-6">
        <LayoutDashboard className="h-6 w-6" />
        <span className="font-bold text-xl">MyDashboard</span>
      </Link>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              location.pathname === item.href && "bg-muted text-primary font-medium"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </ScrollArea>
  )
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith("+")
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashboardLayoutComponent