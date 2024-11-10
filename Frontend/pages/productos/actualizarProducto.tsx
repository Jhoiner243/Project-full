import { Button } from "../../src/components/ui/button"
import React, { useState } from 'react'
import { Input } from "../../src/components/ui/input"
import { Label } from "../../src/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../../src/components/ui/dialog"

export interface productoUpdate {
    id: number
    nombre_producto: string
    precio_compra: number
    cantidad: number
}

interface handleUpdateProduct {
    producto: productoUpdate;
    handleUpdateProduct: (producto: productoUpdate) => void;
}

 const UpdateProduct: React.FC<handleUpdateProduct> =  ({producto, handleUpdateProduct}) => { 

  const [updateProduct, setUpdateProduct] = useState<productoUpdate | null>(producto)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (updateProduct) {
        handleUpdateProduct(updateProduct);
      }
    };
    return (
      <Dialog open={!!updateProduct} onOpenChange={()=>setUpdateProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Realiza cambios en la información del producto aquí.
            </DialogDescription>
          </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
                  <Input
          id="price"
          name="precio_compra"
          type="number"
          min="0"
          step="0.01"
          value={updateProduct?.precio_compra || 0}
          onChange={(e) =>
            setUpdateProduct((prev) =>
              prev ? { ...prev, precio_compra: parseFloat(e.target.value) } : null
            )
          }
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
            value={updateProduct?.cantidad || 0}
            onChange={(e) => setUpdateProduct((prev)=> prev ? {...prev, cantidad: parseFloat(e.target.value)} : null)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Añadir Producto
        </Button>
      </form>
      </DialogContent>
      </Dialog>
    );
  }

export default UpdateProduct;
    