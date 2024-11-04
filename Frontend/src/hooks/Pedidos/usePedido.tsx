import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface Productos {
  id: number;
  nombre_producto: string;
  precio_compra: number;
  cantidad: number;
}

export interface Pedido {
  id: number;
  cantidad: number;
  precio_venta: number;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Productos[]> =>
  fetch(...args).then((res) => res.json());

export default function usePedido() {
  const [pedido, setPedido] = useState<Pedido[]>([]);
  const [clienteId, setClienteId] = useState<string | null>('1');

  // Llamada a SWR para obtener productos
  const { data = [], isLoading, error } = useSWR(
    'http://localhost:3000/api/productos',
    fetcher,
    { refreshInterval: 1000 }
  );

  // Efecto para enviar notificación cuando hay productos con baja cantidad
  useEffect(() => {
    const productosConBajaCantidad = data.filter(
      (producto) => producto.cantidad < 10
    );

    if (productosConBajaCantidad.length > 0) {
      notification();
    }
  }, [data]);

  // Función para manejar cambios en la cantidad de productos
  const handleCantidadChange = (id: number, cantidad: number, precio_venta: number) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === id);
      if (productoExistente) {
        return prevPedido.map((p) =>
          p.id === id ? { ...p, cantidad, precio_venta } : p
        );
      } else {
        return [...prevPedido, { id, cantidad, precio_venta }];
      }
    });
  };

  // Función para reiniciar el pedido
  const handleResetPedido = () => {
    setPedido([]);
  };

  // Función para enviar el pedido al backend
  const onSubmit = async (pedido: Pedido[]) => {
    try {
      const res = await fetch(`http://localhost:3000/api/pedidos/${clienteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: pedido }),
      });

      if (!res.ok) {
        throw new Error('Error en la creación del pedido');
      }

      const data = await res.json();
      console.log('Pedido creado con éxito:', data);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  // Función para enviar notificación
  const notification = () => {
    fetch('http://localhost:3000/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Stock Bajo',
        body: 'Algunos productos tienen menos de 10 unidades. Revisa el inventario.',
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
    handleCantidadChange,
    onSubmit,
    setClienteId,
    products: data,
    isLoading,
    error,
    pedido,
    clienteId,
    handleResetPedido,
  };
}
