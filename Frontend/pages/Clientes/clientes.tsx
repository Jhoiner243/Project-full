"use client"

import React, { useState } from 'react'
import { useClientes } from '../../src/hooks/Clientes/useClientes'
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

interface Cliente {
  id_cliente: string
  nombre_cliente: string
  nombre_tienda: string
  ruta: string
  direccion: string
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ setClienteEdit }: { setClienteEdit: () => Promise<unknown> }) {
  const editCliente = await setClienteEdit()
  return { editCliente }
}

const ClientesPage: React.FC = () => {
  const { clientes, onSubmit, setClienteEdit } = useClientes()
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)

 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientes?.map((cliente) => (
          <Card key={cliente.id_cliente}>
            <CardHeader>
              <CardTitle>{cliente.nombre_cliente}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{cliente.nombre_tienda}</p>
              <p>Ruta: {cliente.ruta}</p>
              <p>Dirección: {cliente.direccion}</p>
              <div className="mt-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setClienteEdit(cliente)}>
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Cliente</DialogTitle>
                      <DialogDescription>
                        Realiza cambios en la información del cliente aquí.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="nombre" className="text-right">
                            Nombre
                          </Label>
                          <Input
                            id="nombre"
                            value={editingCliente?.nombre_cliente}
                            onChange={(e) =>
                              setEditingCliente(prev =>
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
                            value={editingCliente?.nombre_tienda}
                            onChange={(e) =>
                              setEditingCliente(prev =>
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
                            value={editingCliente?.ruta}
                            onChange={(e) =>
                              setEditingCliente(prev =>
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
                            value={editingCliente?.direccion}
                            onChange={(e) =>
                              setEditingCliente(prev =>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ClientesPage