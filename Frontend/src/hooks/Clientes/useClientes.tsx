import {useState, useEffect } from 'react'
import { Cliente } from './clientes.types'

export const useClientes = () =>{
    const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [clienteSearch, setClienteSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error fetching clientes:', error))
  }, [])

  

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre_tienda.toLowerCase().includes(clienteSearch.toLowerCase())
  )

  return {filteredClientes, clienteSeleccionado,  setClienteSearch, setClienteSeleccionado }
}