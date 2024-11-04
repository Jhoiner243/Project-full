import useSWR from 'swr';

const fetcher = async (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then(res => res.json());

export const usePedidosGet = () => {
  const { data= [], isLoading, error } = useSWR(
    'http://localhost:3000/api/pedidos',
    fetcher,
    { refreshInterval: 1000 }
  );

  // Asegúrate de que `data` contenga la estructura correcta
  return {
    pedidos: data?.pedidos || [],
    diario: data?.diario || [],
    semanal: data?.semanal || [],
    mensual: data?.mensual || [],
    isLoading,
    error,
  };
};
