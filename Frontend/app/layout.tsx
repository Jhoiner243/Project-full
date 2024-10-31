import { SidebarProvider, SidebarTrigger } from "../src/components/ui/sidebar"
import { AppSidebar } from "../src/components/ui/app-sidebar"
import {Outlet} from 'react-router-dom'
import { ThemeProvider } from "../src/components/ui/proveedor-temas"

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
    </ThemeProvider>
  )
}
