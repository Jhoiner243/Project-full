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
    fetcher, {refreshInterval: 1000}
  );

  // Ref para rastrear los productos notificados
  const notifiedProductsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Filtrar productos que tienen baja cantidad y no han recibido notificación
    const productosConBajaCantidad = data.filter(
      (producto) => producto.cantidad < 5 && !notifiedProductsRef.current.has(producto.id)
    );

    if (productosConBajaCantidad.length > 0) {
      // Enviar notificación para cada producto nuevo en bajo stock
      productosConBajaCantidad.forEach((producto) => {
        sendNotification(producto);
        notifiedProductsRef.current.add(producto.id); // Marcar producto como notificado
      });
    }
  }, [data]);

  // Función para enviar notificación personalizada para cada producto
  const sendNotification = (producto: Productos) => {
    fetch('http://localhost:3000/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Stock Bajo',
        body: `El producto ${producto.nombre_producto} tiene menos de 10 kl en stock. Revisa el inventario.`,
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
