import { useState, FormEvent } from 'react'
import useSWR from 'swr'

export interface Cliente {
  id_cliente: string
  nombre_cliente: string
  nombre_tienda: string
  ruta: string
  direccion: string
}

const fetcher = async (...args: [RequestInfo, RequestInit?]): Promise<Cliente[]> =>
  fetch(...args).then(res => res.json())

export const useClientes = () => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null)
  const [formClientes, setFormClientes] = useState({
    nombre_cliente: '',
    telefono: '',
    nombre_tienda: '',
    ruta: '',
    direccion: ''
  })
  const {data=[], error, isLoading} = useSWR('http://localhost:3000/api/clientes', fetcher, {refreshInterval: 1000})

  


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
        throw new Error(`Error al actualizar datos del cliente: ${res.status} ${res.statusText}`)
      }

      setClienteEdit(null)  
    } catch (error) {
      console.error('Error del fetch', error)
    }
  }

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formClientes)
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/clientes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formClientes)
      })

      if (!res.ok) {
        throw new Error(`Error al añadir el cliente: ${res.status} ${res.statusText}`)
      }
      // Resetear el formulario tras añadir un cliente exitosamente
      setFormClientes({
        nombre_cliente: '',
        telefono: '',
        nombre_tienda: '',
        ruta: '',
        direccion: ''
      })
    } catch (error) {
      console.error('Error del fetch', error)
    }
  }

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target
    setFormClientes({
      ...formClientes,
      [name]: value
    })
  }

  return {
    clienteSeleccionado,
    setClienteSeleccionado,
    clientes: data,
    clienteEdit,
    setClienteEdit,
    onSubmit,
    setFormClientes,
    formClientes,
    handleSubmit,
    handleChange, 
    error, 
    isLoading
  }
}
