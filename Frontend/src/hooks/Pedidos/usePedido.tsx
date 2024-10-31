import { useState } from 'react';
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
  const [clienteId, setClienteId] = useState<string | null>('1'); // Estado como número
  const { data = [], isLoading, error } = useSWR('http://localhost:3000/api/productos', fetcher, { refreshInterval: 1000 });

  // Manejar cambios en la cantidad del producto seleccionado
  const handleCantidadChange = (id: number, cantidad: number, precio_venta: number) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === id);
      if (productoExistente) {
        // Actualizamos la cantidad y el precio de venta
        return prevPedido.map((p) =>
          p.id === id ? { ...p, cantidad, precio_venta } : p
        );
      } else {
        // Si es un nuevo producto, lo agregamos al pedido
        return [...prevPedido, { id, cantidad, precio_venta }];
      }
    });
  };

  const handleResetPedido = () => {
    // Reiniciar el pedido a un array vacío
    setPedido([]); 
  
  };
  
  // Enviar el pedido al backend
  const onSubmit = async (pedido: Pedido[]) => {
    try {
      // Incluir cliente_id en la URL
      const res = await fetch(`http://localhost:3000/api/pedidos/${clienteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: pedido }), // Enviar solo los productos en el cuerpo
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
  
  

  return {
    handleCantidadChange,
    onSubmit,
    setClienteId, // Exponer setClienteId para actualizar desde otros componentes
    products: data,
    isLoading,
    error,
    pedido,
    clienteId, // Exponer clienteId para verificación
    handleResetPedido
  };
}
