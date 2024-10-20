import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Home, MoreHorizontal } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuSkeleton } from "./sidebar";

interface Project {
  name: string;
  url: string;
  insigni?: number;
  icon?: React.ComponentType; // Si `icon` es un componente React
}

const projects: Project[] = [
  { name: "Project 2", url: "http://project2.com" },
  { name: "Project 3", url: "http://project3.com" } // Puedes agregar más proyectos aquí
];

export function NavProjects() {
  const [loading, setLoading] = useState(true);

  // Simula un retraso en la carga de los proyectos (por ejemplo, 2 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula un tiempo de carga de 2 segundos
    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  // Mostrar el esqueleto de carga si aún está cargando
  if (loading) {
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

  return (
    <SidebarMenu>
      {projects.map((project: Project, index: number) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <Home />
              <span>{project.name}</span>
            </a>
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
