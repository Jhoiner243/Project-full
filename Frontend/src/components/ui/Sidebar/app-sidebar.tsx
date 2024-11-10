import { Boxes,Map, Calendar, ChartNoAxesCombined, Frame, Home, Inbox,   PieChart,  Search, Settings, Command } from "lucide-react"
import { Link } from "react-router-dom"
import { NavProjects } from "../navProjects"
import { NavUser } from "./nav-user"
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
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import React from "react"




const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  items: [
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
}
 
export function AppSidebar()  {
  
  return (
      <Sidebar variant="inset" >
      <SidebarHeader>
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MaxPollo</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                  {data.items.map((item) => (
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

        <SidebarGroupContent>
          <React.Suspense fallback={<NavProjectsSkeleton />}>
            <NavProjects projects={data.projects} />
          </React.Suspense>

        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator />
      <SidebarFooter>
        <NavUser user={data.user} />
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