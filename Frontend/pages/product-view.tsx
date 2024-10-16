

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon, PackageIcon } from "lucide-react"
import { useProductos } from "@/hooks/useProducts"
import {  ProductosProps } from "@/types/constants"

export interface Dato {
  nombre_producto: string;
  precio_compra: number;
  cantidad: number;
}




function AddProductForm () {
  const { handleChange, onSubmit, formProductos } = useProductos();
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Producto</Label>
        <Input
          id="name"
          name="nombre_producto"
          value={formProductos.nombre_producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input
          id="price"
          name="precio_compra"
          type="number"
          min="0"
          step="0.01"
          value={formProductos.precio_compra}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          name="cantidad"
          type="number"
          min="0"
          value={formProductos.cantidad}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Añadir Producto
      </Button>
    </form>
  );
}



export default function ProductViewComponent() {
  const {productos} = useProductos()
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Añadir Producto
              <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Producto</DialogTitle>
              <DialogDescription>
                Completa el formulario para añadir un nuevo producto a tu inventario.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm /> 
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {Array.isArray(productos) && productos.map((producto: ProductosProps) => (
          <Card  key={producto.nombre_producto}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{producto.nombre_producto}</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex justify-between">
                <span className="text-2xl font-bold">${producto.precio_compra}</span>
                <span className="text-sm text-muted-foreground">Stock: {producto.cantidad}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
