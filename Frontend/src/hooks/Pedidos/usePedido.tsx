import { useEffect } from 'react';
import useSWR from 'swr';

export interface Productos {
  id: number;
  nombre_producto: string;
  precio_compra: number;
  cantidad: number;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Productos[]> =>
  fetch(...args).then((res) => res.json());

export default function useProductos() {
  const { data = [], isLoading, error } = useSWR(
    'http://localhost:3000/api/productos',
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    const productosConBajaCantidad = data.filter(
      (producto) => producto.cantidad < 10
    );

    if (productosConBajaCantidad.length > 0) {
      notification();
    }
  }, [data]);

  const notification = () => {
    fetch('http://localhost:3000/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Stock Bajo',
        body: 'Algunos productos tienen menos de 10 kl. Revisa el inventario.',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Notificación enviada:', data);
      })
      .catch((error) => {
        console.error('Error al enviar la notificación:', error);
      });
  };

  return {
    products: data,
    isLoading,
    error,
  };
}
