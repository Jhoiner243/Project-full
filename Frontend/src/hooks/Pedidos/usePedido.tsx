import { useEffect, useState } from 'react';

export interface Producto {
  id: number;
  nombre_producto: string;
  precio_compra: number;
  cantidad: number;
}

export default function usePedido() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [pedido, setPedido] = useState<{ id: number; cantidad: number }[]>([]); 
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((res) => {
        console.log(res); // Log para ver la respuesta
        if (!res.ok) {
          throw new Error(`Error en la petición: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error fetching productos:', error));
  }, []);
  

  // Manejar cambios en la cantidad del producto seleccionado
  const handleCantidadChange = (id: number, cantidad: number) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === id);
      if (productoExistente) {
        // Si el producto ya está en el pedido, actualizamos la cantidad
        return prevPedido.map((p) =>
          p.id === id ? { ...p, cantidad } : p
        );
      } else {
        // Si es un nuevo producto, lo agregamos al pedido
        return [...prevPedido, { id, cantidad }];
      }
    });
  };

  // Enviar el pedido al backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/pedidos', {
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

  return {handleCantidadChange, handleSubmit, productos, pedido}
}
