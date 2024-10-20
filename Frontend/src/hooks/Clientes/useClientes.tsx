import { useState, useEffect } from 'react'

interface Cliente {
  id_cliente: string
  nombre_cliente: string
  nombre_tienda: string
  ruta: string
  direccion: string
}

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [clienteSearch, setClienteSearch] = useState('')
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null)  // Acepta null cuando no haya cliente seleccionado
  const [formClientes, setFormClientes] = useState()


  // Función para obtener los clientes
  const fetchClientes = () => {
    fetch('http://localhost:3000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error fetching clientes:', error))
  }

  useEffect(() => {
    fetchClientes()  // Cargar clientes cuando el componente se monta
  }, [])

  useEffect(() => {
    if (!clienteEdit) return  // Solo hacer el fetch cuando no hay cliente en edición
    fetchClientes()  // Volver a cargar los clientes después de editar uno
  }, [clienteEdit])


  // Función para manejar la edición de un cliente
  const onSubmit = async (clienteActualizado: Cliente) => {
    try {
      const res = await fetch(`http://localhost:3000/api/clientes/${clienteActualizado.id_cliente}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteActualizado)
      })

      if (!res.ok) {
        throw new Error(`Error al actualizar datos del cliente: ${res.status}`)
      }

      setClienteEdit(null)  // Limpiar clienteEdit después de actualizar
      fetchClientes()  // Volver a cargar la lista actualizada
    } catch (error) {
      console.error('Error del fetch', error)
    }
  }

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre_tienda.toLowerCase().includes(clienteSearch.toLowerCase())
  )

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/clientes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formClientes)
      })

      if (!res.ok) {
        throw new Error(`Error al actualizar datos del cliente: ${res.status}`)
      }

      fetchClientes()  // Volver a cargar la lista actualizada
    } catch (error) {
      console.error('Error del fetch', error)
    }
  }

  return {
    filteredClientes,
    clienteSeleccionado,
    setClienteSearch,
    setClienteSeleccionado,
    clientes,
    clienteEdit,
    setClienteEdit,
    onSubmit,
    setFormClientes
  }
}
