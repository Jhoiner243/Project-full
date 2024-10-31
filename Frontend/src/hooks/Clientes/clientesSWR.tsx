import useSWR from 'swr'
import { Cliente } from './clientes.types'

  const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Cliente[]> => 
    fetch(...args).then(res => res.json());
  

export  function useClienteSwr  (){
    const {data= [], error, isLoading} = useSWR(`http://localhost:3000/api/clientes` , fetcher, { refreshInterval: 1000 })


    return {
        users: data, 
        isLoading,
        error
    }
}

