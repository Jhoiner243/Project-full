import { SidebarProvider, SidebarTrigger } from "../src/components/ui/sidebar"
import { AppSidebar } from "../src/components/ui/app-sidebar"
import {Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar name={'Jhoiner'} projects="MaxPollo" url="https://www.flaticon.com/free-icon/profile_3135715" />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
