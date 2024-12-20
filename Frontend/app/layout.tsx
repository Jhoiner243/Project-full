import {Outlet} from 'react-router-dom'
import { ThemeProvider } from "../src/components/ui/proveedor-temas"

import { AppSidebar } from "@/components/ui/Sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import NotificationButton from '@/services/components/botonNotifications'

export default function Layout()  {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
                <NotificationButton />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  )
}

