import useSWR from 'swr'
import { PedidoGet } from './pedidos'

// Cambiamos el tipo de retorno de Promise<PedidoGet> a Promise<PedidoGet[]>
const fetcher = async (...args: [RequestInfo, RequestInit?]): Promise<PedidoGet[]> =>
    fetch(...args).then(res => res.json())

export const usePedidosGet = () => {
    const { data = [], isLoading, error } = useSWR<PedidoGet[]>('http://localhost:3000/api/pedidos', fetcher, { refreshInterval: 1000 })
    
    return {
        pedidos: data,   // Ahora 'data' está tipado como PedidoGet[]
        isLoading, 
        error
    }
}
