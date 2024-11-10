import { useEffect, useRef } from 'react';
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

  // Crear referencia para rastrear si ya se ha enviado la notificación
  const notificationSentRef = useRef(false);

  useEffect(() => {
    // Filtrar productos con cantidad baja
    const productosConBajaCantidad = data.filter(
      (producto) => producto.cantidad < 10
    );

    // Enviar notificación si hay productos con baja cantidad y aún no se ha enviado la notificación
    if (productosConBajaCantidad.length > 0 && !notificationSentRef.current) {
      notification();
      notificationSentRef.current = true; // Marcar como enviada
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
