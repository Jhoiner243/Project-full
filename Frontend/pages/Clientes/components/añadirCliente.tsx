"use client"
import { Button } from "../../../src/components/ui/button"
import { Input } from "../../../src/components/ui/input"
import { Label } from "../../../src/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../src/components/ui/sheet"
import { useClientes } from "../../../src/hooks/Clientes/useClientes"

export function AñadirCliente() {
  const { handleSubmit, handleChange, formClientes } = useClientes();

  // Si `formClientes` es `null` o `undefined`, evitamos el renderizado
  if (!formClientes) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Añadir Cliente</Button>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Añadir cliente</SheetTitle>
            <SheetDescription>
              Añadir cliente a la base de datos.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre_cliente" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre_cliente"
                  name="nombre_cliente"
                  onChange={handleChange}
                  value={formClientes.nombre_cliente}
                  type="text"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre_tienda" className="text-right">
                  Nombre tienda
                </Label>
                <Input
                  id="nombre_tienda"
                  name="nombre_tienda"
                  onChange={handleChange}
                  value={formClientes.nombre_tienda}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ruta" className="text-right">
                  Ruta
                </Label>
                <Input
                  id="ruta"
                  name="ruta"
                  onChange={handleChange}
                  value={formClientes.ruta}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="direccion" className="text-right">
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  name="direccion"
                  onChange={handleChange}
                  value={formClientes.direccion}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  onChange={handleChange}
                  value={formClientes.telefono}
                  className="col-span-3"
                />
              </div>
            </div>

            <SheetFooter>
              <Button type="submit">Añadir cliente</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
