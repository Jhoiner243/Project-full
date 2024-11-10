'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton'
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "../../src/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover"
import { useClienteSwr } from "@/hooks/Clientes/clientesSWR"
import { Cliente } from "@/hooks/Clientes/clientes.types"
import * as React from "react"
import { Label } from '@radix-ui/react-label'
import { usePedidoContext } from "./pedidoContext"
import useProductos  from '../../src/hooks/Pedidos/usePedido'
import { toast } from 'react-toastify'

export default function PedidoForm() {
  const { onSubmit, pedido, resetPedido, addProducto, clienteId } = usePedidoContext();
  const { products, isLoading, error,  } = useProductos()
  const [precioVenta, setPrecioVenta] = useState<{ [key: number]: number }>({});
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);
  const [cantidadInput, setCantidadInput] = useState<string>('');
  const [precioVentaInput, setPrecioVentaInput] = useState<string>('');

  const calcularTotal = () => {
    return pedido.reduce((total, item) => {
      const producto = products.find(p => p.id === item.id);
      return total + (producto ? (precioVenta[item.id] || producto.precio_compra) * item.cantidad : 0);
    }, 0);
  };

  const handlePrecioVentaChange = (precio: string) => {
    setPrecioVentaInput(precio);
  };

  const handleAgregarProducto = () => {
    if (productoSeleccionado && cantidadInput && precioVentaInput) {
      addProducto({
        id: productoSeleccionado,
        cantidad: Number(cantidadInput),
        precio_venta: Number(precioVentaInput),
      });
      setCantidadInput('');
      setPrecioVenta(prev => ({ ...prev, [productoSeleccionado]: Number(precioVentaInput) }));
      setProductoSeleccionado(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('clienteId antes de enviar:', clienteId);
    if (!clienteId) {
      console.error('clienteId es undefined');
      toast.error('Selecciona un cliente');
      return; // Detén el envío si `clienteId` es undefined
    }
    onSubmit(pedido); // Usa la función `onSubmit` del contexto
    resetPedido();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-[150px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[50px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-[20px]" />
            </TableCell>
          </TableRow>
        ))}
      </div>
    );
  }

  if (error) {
    throw new Error('Error al cargar productos');
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Formulario de productos */}
      <form onSubmit={handleSubmit} className="md:w-2/3">
        <div className="md:w-full">
          <CardHeader>
            <CardTitle className="mt-0">Productos Disponibles</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-100 p-4 rounded-lg">
            <div className="flex flex-wrap gap-4 bg-slate-400 p-4 rounded-lg cursor-pointer">
              {products.map((product) => (
                <Card
                  key={product.id}

                  className="h-auto py-2 px-4 text-sm cursor-pointer hover:bg-slate-200"
                  onClick={() => setProductoSeleccionado(product.id)}
                >
                  {product.nombre_producto}
                </Card>
              ))}
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="product">Producto Seleccionado</Label>
                <Input
                  id="product"
                  value={productoSeleccionado ? productoSeleccionado : 'Ningún producto seleccionado'}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  type="number"
                  min="0"
                  max={products.find(p => p.id === productoSeleccionado)?.cantidad || 0}
                  value={cantidadInput}
                  onChange={(e) => setCantidadInput(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="precio">Precio de Venta</Label>
                <Input
                  id="precio"
                  type="number"
                  min="0"
                  value={precioVentaInput}
                  onChange={(e) => handlePrecioVentaChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              type="button" 
              onClick={handleAgregarProducto} 
              disabled={!productoSeleccionado || !cantidadInput || !precioVentaInput}
              className="mt-4 w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Agregar a Factura
            </Button>
          </CardContent>
        </div>

      {/* Factura */}
      <div className="md:w-1/3">
        <Card className="bg-white shadow-lg p-4 rounded-lg">
          <CardHeader>
            <CardTitle>Factura</CardTitle>
            <ComboboxDemo />
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedido.map((item) => {
                  const producto = products.find((p) => p.id === item.id);
                  if (!producto) return null;
                  const precioFinal = precioVenta[item.id] || producto.precio_compra;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{producto.nombre_producto}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>${precioFinal.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${(precioFinal * item.cantidad).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between pt-4">
              <CardTitle>Total</CardTitle>
              <div className="text-2xl font-bold">${calcularTotal().toLocaleString()}</div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Finalizar Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
      </form>
    </div>
  );
}

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ cliente_id: number; nombre_tienda: string } | null>(null);
  const { users } = useClienteSwr();
  const { setClienteId } = usePedidoContext();

  const handleSelectCliente = (user: Cliente) => {
    setValue({ cliente_id: user.id_cliente, nombre_tienda: user.nombre_tienda });
    setClienteId(user.id_cliente.toString());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? value.nombre_tienda : "Selecciona un cliente..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandList>
            <CommandEmpty>No se encontraron coincidencias.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem key={user.id_cliente} onSelect={() => handleSelectCliente(user)}>
                  <CheckIcon className={cn("mr-2 h-4 w-4", value?.cliente_id === user.id_cliente ? "opacity-100" : "opacity-0")} />
                  {user.nombre_tienda}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
