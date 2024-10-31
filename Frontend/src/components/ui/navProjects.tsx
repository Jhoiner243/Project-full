import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {  MoreHorizontal } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuSkeleton } from "./sidebar";
import {  useClienteSwr} from '../../hooks/Clientes/clientesSWR'
import {Cliente} from '../../hooks/Clientes/clientes.types'

interface Project {
  name: string;
  url: string;
  insigni?: number;
  icon?: React.ComponentType; // Si `icon` es un componente React
}



export function NavProjects() {

  const {users, isLoading, error} = useClienteSwr()
  

  // Mostrar el esqueleto de carga si aún está cargando
  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  if(error){
    throw new Error('Error en el fetch')
  }

  return (
    <SidebarMenu>
      {Array.isArray(users) && users.map((user: Cliente, index: number) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton asChild>
           <span>{user.nombre_cliente}</span>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100">
                <MoreHorizontal />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem>
                <span>Edit Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}


