'use client'

import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BarChart2, Users, ShoppingCart, Settings, Menu, Search } from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
  { name: "Products", icon: ShoppingCart, href: "/dashboard/products" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardLayoutComponent() {
  const [open, setOpen] = useState(false)
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
                <span className="font-bold">MyDashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] sm:w-[300px] pl-8"
                />
              </form>
              <Button size="icon" variant="ghost">
                <span className="sr-only">User account</span>
                <Users className="h-5 w-5" />
              </Button>
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
                      location.pathname === item.href && "bg-muted text-primary"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </aside>
          <main className="flex-1 p-6"><Outlet /></main>
        </div>
      </div>
    </div>
  )
}

function MobileNav() {
  const location = useLocation()
  return (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              location.pathname === item.href && "bg-muted text-primary"
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