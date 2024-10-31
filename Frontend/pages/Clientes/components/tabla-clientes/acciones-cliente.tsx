"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../../../../src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../src/components/ui/dropdown-menu"
import React from "react"

// Define una interfaz para Payment
interface Payment {
  id: string;
  nombre_cliente: string;
  nombre_tienda: string;
  ruta: string;
  direccion: string;
}

// Define las columnas incluyendo el menú de acciones
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
    header: "Acciones",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID de cliente
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("Ver cliente")}>
              Ver cliente
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Ver detalles")}>
              Ver detalles de pago
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
