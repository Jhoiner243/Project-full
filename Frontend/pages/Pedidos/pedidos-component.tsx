import React, { useState } from 'react'
import usePedido from '../../src/hooks/Pedidos/usePedido'
import { useClientes } from '@/hooks/Clientes/useClientes'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Check, ChevronsUpDown, Plus } from "lucide-react"
import * as Combobox from '@radix-ui/react-select'

export default function PedidosComponentComponent() {
  const { handleCantidadChange, handleSubmit, productos, pedido } = usePedido()
  const { filteredClientes, clienteSeleccionado, setClienteSearch, setClienteSeleccionado } = useClientes()


  const [openCombobox, setOpenCombobox] = useState(false)
  const [precioVenta, setPrecioVenta] = useState<{ [key: number]: number }>({})
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null)
  const [cantidadInput, setCantidadInput] = useState<string>('')
  const [precioVentaInput, setPrecioVentaInput] = useState<string>('')

  const calcularTotal = () => {
    return pedido.reduce((total, item) => {
      const producto = productos.find(p => p.id === item.id)
      return total + (producto ? (precioVenta[item.id] || producto.precio_compra) * item.cantidad : 0)
    }, 0)
  }

  const handlePrecioVentaChange = (precio: string) => {
    setPrecioVentaInput(precio)
  }

  const handleAgregarProducto = () => {
    if (productoSeleccionado && cantidadInput && precioVentaInput) {
      handleCantidadChange(productoSeleccionado, Number(cantidadInput))
      setPrecioVenta(prev => ({ ...prev, [productoSeleccionado]: Number(precioVentaInput) }))
      setCantidadInput('')
      setPrecioVentaInput('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center mb-0">
            {productos.filter(p => p.cantidad > 0).map((producto) => (
              <Card 
                key={producto.id} 
                className={`shadow-sm cursor-pointer ${productoSeleccionado === producto.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setProductoSeleccionado(producto.id)}
              >
                <CardContent className="p-2">
                  <h3 className="font-semibold text-xs">{producto.nombre_producto}</h3>
                  <p className="text-xs text-muted-foreground">Stock: {producto.cantidad}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Producto Seleccionado</h3>
            <p className="text-sm mb-2 flex gap-2 my-2">
              {productoSeleccionado 
                ? productos.find(p => p.id === productoSeleccionado)?.nombre_producto 
                : 'Ningún producto seleccionado'}
            </p>
            <div className="flex gap-2 mb-2 flex-1 pb-8">
              <div>
              <Input
                type="number"
                min="0"
                max={productos.find(p => p.id === productoSeleccionado)?.cantidad || 0}
                value={cantidadInput}
                onChange={(e) => setCantidadInput(e.target.value)}
                className="w-1/2"
                placeholder="Cantidad"
              />
              </div>
              <div className='pb-8 '>
              <Input
                type="number"
                min="0"
                value={precioVentaInput}
                onChange={(e) => handlePrecioVentaChange(e.target.value)}
                className="w-1/2"
                placeholder="Precio de venta"
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
        </div>
        <div className="w-full lg:w-1/3">
          <div className="mb-6">
            <Label htmlFor="cliente">Seleccionar Cliente</Label>
            <Combobox.Root open={openCombobox} onOpenChange={setOpenCombobox}>
              <div className="relative mt-1">
                <Combobox.Trigger className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">
                    {clienteSeleccionado ? clienteSeleccionado.nombre_tienda : 'Seleccione un cliente'}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Combobox.Trigger>

                <Combobox.Portal>
                  <Combobox.Content className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setClienteSearch(event.target.value)}
                      placeholder="Buscar cliente..."
                    />
                    <Combobox.Viewport>
                      {filteredClientes.map((cliente) => (
                        <Combobox.Item
                          key={cliente.id_cliente}
                          value={cliente.id_cliente.toString()}
                          className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-blue-100"
                          onSelect={() => {
                            setClienteSeleccionado(cliente)
                            setOpenCombobox(false)
                          }}
                        >
                          <div>
                            <span className={`block truncate ${clienteSeleccionado?.id_cliente === cliente.id_cliente ? 'font-medium' : 'font-normal'}`}>
                              {cliente.nombre_tienda}
                            </span>
                            {clienteSeleccionado?.id_cliente === cliente.id_cliente && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </div>
                        </Combobox.Item>
                      ))}
                    </Combobox.Viewport>
                  </Combobox.Content>
                </Combobox.Portal>
              </div>
            </Combobox.Root>
          </div>
          <h2 className="text-2xl font-bold mb-4">Factura</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PRODUCTO</TableHead>
                <TableHead>CANTIDAD</TableHead>
                <TableHead>PRECIO</TableHead>
                <TableHead>TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedido.map((item) => {
                const producto = productos.find(p => p.id === item.id)
                if (!producto) return null
                const precioFinal = precioVenta[item.id] 
                return (
                  <TableRow key={item.id}>
                    <TableCell>{producto.nombre_producto}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>${precioFinal.toLocaleString()}</TableCell>
                    <TableCell>${(precioFinal * item.cantidad).toLocaleString()}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <div className="mt-4 text-right">
            <p className="text-2xl font-bold">Total: ${calcularTotal().toLocaleString()}</p>
          </div>
          <Button type='submit' size="lg" className="w-full mt-4">
            <ShoppingCart className="mr-2 h-5 w-5" /> Finalizar Pedido
          </Button>
        </div>
      </form>
    </div>
  )
}