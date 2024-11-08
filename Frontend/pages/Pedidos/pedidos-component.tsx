'use cliente'
import {  useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Plus, Package } from "lucide-react"
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
import usePedido from "@/hooks/Pedidos/usePedido"
import * as React from "react"
import { Label } from '@radix-ui/react-label'



export default function PedidoForm() {
  const { handleCantidadChange, onSubmit, products, pedido, isLoading, error, setClienteId, handleResetPedido } = usePedido();
  const [precioVenta, setPrecioVenta] = useState<{ [key: number]: number }>({});
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);
  const [cantidadInput, setCantidadInput] = useState<string>('');
  const [precioVentaInput, setPrecioVentaInput] = useState<string>('');
  const { cliente_id } = useParams();

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
      handleCantidadChange(productoSeleccionado, Number(cantidadInput), Number(precioVentaInput));
      setPrecioVenta(prev => ({ ...prev, [productoSeleccionado]: Number(precioVentaInput) }));
      setCantidadInput('');
      setPrecioVentaInput('');
    }
  };

  React.useEffect(() => {
    if (cliente_id) {
      setClienteId(cliente_id);
    }
  }, [cliente_id, setClienteId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(pedido);
    handleResetPedido();
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
    <div className="lg:w-1/3 mb-8 lg:mb-0 order-2 lg:order-2">
      <h1 className="text-3xl font-bold mb-6 text-center">Nuevo Pedido</h1>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <ComboboxDemo />
        </div>
        
        <div className="products-bar mb-6">
          <Card className="lg:w-2/3 order-1 lg:order-1">
            <CardHeader>
              <CardTitle className="text-2xl">Productos Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products?.filter(p => p.cantidad > 0).map((producto) => (
                  <Card 
                    key={producto.id} 
                    className={`shadow-sm cursor-pointer transition-all ${
                      productoSeleccionado === producto.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setProductoSeleccionado(producto.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{producto.nombre_producto}</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Stock: {producto.cantidad}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Producto Seleccionado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {productoSeleccionado 
                        ? products.find(p => p.id === productoSeleccionado)?.nombre_producto 
                        : 'Ningún producto seleccionado'}
                    </div>
                    <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Agregar a Factura
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <div className='min-w-full divide-y divide-gray-200'>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Factura</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCTO</TableHead>
                    <TableHead className="font-semibold">CANTIDAD</TableHead>
                    <TableHead className="font-semibold">PRECIO</TableHead>
                    <TableHead className="font-semibold">TOTAL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedido.map((item) => {
                    const producto = products.find((p) => p.id === item.id);
                    if (!producto) return null;
                    const precioFinal = precioVenta[item.id] || producto.precio_compra;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{producto.nombre_producto}</TableCell>
                        <TableCell>{item.cantidad}</TableCell>
                        <TableCell>${precioFinal.toLocaleString()}</TableCell>
                        <TableCell>${(precioFinal * item.cantidad).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-6 text-right">
                <p className="text-2xl font-bold">Total: ${calcularTotal().toLocaleString()}</p>
              </div>
              <Button type="submit" size="lg" className="w-full mt-4">
                <ShoppingCart className="mr-2 h-5 w-5" /> Finalizar Pedido
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </form>
    </div>
  );
}


export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ cliente_id: number; nombre_tienda: string } | null>(null);
  const { users } = useClienteSwr();
  const { setClienteId } = usePedido();
  
  const navigate = useNavigate(); // Hook para redirigir

  const handleSelectCliente = (cliente_id: number, nombre_tienda: string) => {
    setValue({ cliente_id, nombre_tienda });
    setClienteId(cliente_id.toString());
    
    // Actualiza la URL con el nuevo cliente_id
    navigate(`/pedidos/${cliente_id}`); // Esto cambiará la URL
    
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
          <CommandInput placeholder="Buscar cliente..." className="h-9" />
          <CommandList>
            <CommandEmpty>Cliente no encontrado</CommandEmpty>
            <CommandGroup>
              {Array.isArray(users) && users?.map((user: Cliente) => (
                <CommandItem
                  key={user.id_cliente}
                  onClick={() => handleSelectCliente(user.id_cliente, user.nombre_tienda)}
                  onSelect={() => {
                    // Esto asegurará que la opción seleccionada se muestre
                    setValue({ cliente_id: user.id_cliente, nombre_tienda: user.nombre_tienda });
                    setOpen(false);
                  }}
                >
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