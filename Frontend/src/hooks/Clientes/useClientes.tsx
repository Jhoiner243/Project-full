import {useState, useEffect, FormEvent } from 'react'
import { Cliente } from './clientes.types'

export const useClientes = () =>{
    const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [clienteSearch, setClienteSearch] = useState('')
  const [clienteEdit, setClienteEdit ] = useState<Cliente | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error fetching clientes:', error))
  }, [])

 

  const onSubmit = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    console.log('Datos a enviar:', JSON.stringify(clienteEdit));

    if (!clienteEdit|| !clienteEdit.id_cliente) {
      console.error('No se puede actualizar porque falta el id_cliente');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/clientes/:id_cliente`,{
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteEdit)
      })
      if(!res.ok){
        throw new Error(`Error al actualizar datos del cliente ${res.status}`)
      }
    } catch (error) {
      console.error('Error del fetch', error)
    }
   
    
  }
  

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre_tienda.toLowerCase().includes(clienteSearch.toLowerCase())
  )

  return {filteredClientes, clienteSeleccionado,  setClienteSearch, setClienteSeleccionado, clientes, clienteEdit, onSubmit, setClienteEdit }
}