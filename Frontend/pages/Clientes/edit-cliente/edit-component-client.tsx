import React, { useState} from 'react'
import { Button } from "../../../src/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../src/components/ui/dialog"
import { Input } from "../../../src/components/ui/input"
import { Label } from "../../../src/components/ui/label"
import { useNavigate } from "react-router-dom"

interface Cliente {
  id_cliente: string
  nombre_cliente: string
  nombre_tienda: string
  ruta: string
  direccion: string
}

interface EditClienteDialogProps {
  cliente: Cliente
  onSubmit: (cliente: Cliente) => void  // Tipo correcto para onSubmit
}

const EditClienteDialog: React.FC<EditClienteDialogProps> = ({ cliente, onSubmit }) => {
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(cliente)
  const navigate = useNavigate()

  

  if (!editingCliente) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingCliente) {
      onSubmit(editingCliente)
    }
  }

  return (
    <Dialog open={!!editingCliente} onOpenChange={() => navigate("/dashboard")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Realiza cambios en la información del cliente aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={editingCliente.nombre_cliente}
                onChange={(e) =>
                  setEditingCliente((prev) =>
                    prev ? { ...prev, nombre_cliente: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tienda" className="text-right">
                Tienda
              </Label>
              <Input
                id="tienda"
                value={editingCliente.nombre_tienda}
                onChange={(e) =>
                  setEditingCliente((prev) =>
                    prev ? { ...prev, nombre_tienda: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ruta" className="text-right">
                Ruta
              </Label>
              <Input
                id="ruta"
                value={editingCliente.ruta}
                onChange={(e) =>
                  setEditingCliente((prev) =>
                    prev ? { ...prev, ruta: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={editingCliente.direccion}
                onChange={(e) =>
                  setEditingCliente((prev) =>
                    prev ? { ...prev, direccion: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditClienteDialog
