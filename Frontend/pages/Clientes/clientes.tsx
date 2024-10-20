import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useClientes } from '../../src/hooks/Clientes/useClientes'
import EditClienteDialog from './edit-cliente/edit-component-client'



const ClientesPage: React.FC = () => {
  const { clientes, onSubmit, setClienteEdit, clienteEdit } = useClientes()

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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setClienteEdit(cliente)}
                >
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clienteEdit ?(
  <EditClienteDialog cliente={clienteEdit} onSubmit={onSubmit} />
) : null}
    </div>
  )
}

export default ClientesPage
