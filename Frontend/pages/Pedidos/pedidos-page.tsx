import * as Combobox from '@radix-ui/react-select'
import { ChevronsUpDown } from "lucide-react"
import { useClientes } from '../../src/hooks/Clientes/useClientes'
import { useState } from 'react'
import { Input } from '@/components/ui/input'


export default function PedidosPage(){
  const [openCombobox, setOpenCombobox] = useState(false)
  const { clienteSeleccionado, setClienteSearch} = useClientes()
  
    return(
        <>
        <div className='container'>
            <h1>Crear pedidos</h1>
            <div>
        <div>
            <label htmlFor="cliente"></label>
            <Combobox.Root open={openCombobox} onOpenChange={setOpenCombobox}>
                <Combobox.Trigger>
                    <span>
                        {clienteSeleccionado ? clienteSeleccionado.nombre_tienda : 'Selecciona un cliente'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                </Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content>
                        <Input 
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        onChange={(event:  React.ChangeEvent<HTMLInputElement>) => setClienteSearch(event.target.value)}
                        placeholder="Buscar cliente..."
                        />
                    </Combobox.Content>
                </Combobox.Portal>

            </Combobox.Root>
        </div>
      </div>
      </div>
      </>
    )
}
