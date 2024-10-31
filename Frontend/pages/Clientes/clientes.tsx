"use client"
import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DataTable} from './components/tabla-clientes/datos-tabla'
import { useClientes } from "@/hooks/Clientes/useClientes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditClienteDialog from './edit-cliente/edit-component-client'
import {AñadirCliente} from '../Clientes/components/añadirCliente'
import { useClienteSwr } from '@/hooks/Clientes/clientesSWR'
// Define una interfaz para Payment (datos de los clientes)
interface Payment {
  id_cliente: string;
  nombre_cliente: string;
  nombre_tienda: string;
  ruta: string;
  direccion: string;
}

// Define las columnas incluyendo el menú de acciones
// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "nombre_cliente",
    header: "Nombre Cliente",
  },
  {
    accessorKey: "nombre_tienda",
    header: "Nombre Tienda",
  },
  {
    accessorKey: "ruta",
    header: "Ruta",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setClienteEdit, onSubmit } = useClientes()
      const cliente = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false) // Estado para controlar la visibilidad del diálogo

      const handleEditClick = () => {
        setClienteEdit(cliente)
        setIsEditDialogOpen(true) // Muestra el diálogo al hacer clic en "Editar cliente"
      }
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEditClick}>
                Editar cliente
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(cliente.id_cliente)}
              >
                Copiar ID del cliente
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalles del cliente</DropdownMenuItem>
              <DropdownMenuItem>Ver detalles de pago</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Renderiza el diálogo condicionalmente */}
          {isEditDialogOpen && (
            <EditClienteDialog 
              cliente={cliente} 
              onSubmit={onSubmit} // Cierra el diálogo al enviar
            />
          )}
        </>
      )
    },
  },
];

// Página de clientes
const ClientesPage: React.FC = () => {
  const { clientes } = useClientes()
  const {users} = useClienteSwr()

  // Verificar si `clientes` existe y tiene datos
  const data: Payment[] = clientes.map(cliente => ({
    id_cliente: cliente.id_cliente,
    nombre_cliente: cliente.nombre_cliente,
    nombre_tienda: cliente.nombre_tienda,
    ruta: cliente.ruta,
    direccion: cliente.direccion,
  }))

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold pr-3">Clientes: {users.length}</h1>

        <AñadirCliente />
      </div>
      <div className="h-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default ClientesPage
