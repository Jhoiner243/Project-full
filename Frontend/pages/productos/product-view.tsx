import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UpdateProduct from '../../pages/productos/actualizarProducto'
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
import { PlusIcon,  RefreshCw, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useProductos } from "@/hooks/useProducts"
import usePedido, { Productos } from '../../src/hooks/Pedidos/usePedido'
import { useState } from "react"
import { toast } from "react-toastify"

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
const {products} = usePedido()  
const {handleUpdateProduct, setUpdateProduct} = useProductos()
const [DialogUpdateProduct, setDialogUpdateProduct] = useState<boolean>(false)

const handeleDeleteClick = (id: number) => {
  try{
    fetch(`http://localhost:3000/api/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
     try{ toast.success(`Producto eliminado correctamente`) 
      console.log(res)
     }catch(error){
      toast.error(`Error al eliminar producto`)
      console.log(error)
    }
    })
  }catch(error){
    console.log('Error al eliminar producto', error)
  }

}

const handleClickUpdate = () => {
  setUpdateProduct(products)  
  setDialogUpdateProduct(true)
}
console.log(products); // Agrega este log justo después de definir products
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold pr-2">Productos</h1>
        <Dialog>
          <DialogTrigger asChild className="flex justify-end pb-3 mb-1">
            <Button>
              Añadir Producto
              <PlusIcon className="ml-2 h-4 w-4 mb-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Producto</DialogTitle>
              <DialogDescription>
                Completa el formulario para añadir un nuevo producto a tu inventario.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm/> 
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.isArray(products) && products.map((producto: Productos) => (
          <Card  key={producto.nombre_producto}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{producto.nombre_producto}</CardTitle>
            <div className="flex space-x-2 gap-2">
          <Button onClick={handleClickUpdate} className="flex-1" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button onClick={() => handeleDeleteClick(producto.id)} variant="destructive" className="px-3">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex justify-between">
                <span className="text-2xl font-bold">${producto.precio_compra}</span>
                <Badge variant='outline' className="text-sm text-slate-500 text-center">Stock: {producto.cantidad}</Badge>
                {
                  DialogUpdateProduct ? (
                    <UpdateProduct producto={producto} handleUpdateProduct={handleUpdateProduct}/>
                  ): null
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

