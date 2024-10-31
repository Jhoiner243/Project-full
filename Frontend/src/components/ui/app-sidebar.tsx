import { Boxes, Calendar, ChartNoAxesCombined, ChevronUp, Home, Inbox,  Search, Settings,  User2 } from "lucide-react"
import { Link } from "react-router-dom"
import { NavProjects } from "./navProjects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import React from "react"
import { ModeToggle } from "./modos"

// Menu items.
const items = [
  {
    title: "Pedidos",
    url: "pedidos",
    icon: Home,
    insigni: 21
  },
  {
    title: 'Analizis',
    url: "analizis",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Clientes",
    url: "clientes",
    icon: Inbox,
    insigni: 34
  },
  {
    title: "Productos",
    url: "products",
    icon: Boxes,
    insigni: 12
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    insigni: 8
  },
  {
    title: "Buscar",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]


 
export function AppSidebar() {
  
  return (
      <Sidebar collapsible="icon">
      <SidebarHeader>

    <ModeToggle />


      </SidebarHeader>

      <SidebarSeparator />

      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroupLabel asChild>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarContent>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden" >
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </CollapsibleContent>
      </Collapsible>
      <SidebarSeparator />

      <SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem />
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <SidebarSeparator />
        <SidebarGroupLabel>Clientes</SidebarGroupLabel>
        <SidebarGroupContent>
          <React.Suspense fallback={<NavProjectsSkeleton />}>
            <NavProjects />
          </React.Suspense>

        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Usuario
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    

  )
}


export function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon/>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
