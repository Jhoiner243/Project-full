// PedidoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

// Interfaces de datos
interface Pedido {
  id: number;
  cantidad: number;
  precio_venta: number;
}

interface PedidoContextProps {
  pedido: Pedido[];
  clienteId: string | undefined;
  setClienteId: (id: string) => void;
  addProducto: (producto: Pedido) => void;
  resetPedido: () => void;
  onSubmit: (pedido?: Pedido[]) => Promise<void>; // Acepta pedido opcionalmente
  handleCantidadChange: (id: number, cantidad: number, precio_venta: number) => void;
}


// Contexto inicial
const PedidoContext = createContext<PedidoContextProps | undefined>(undefined);

// Provider
export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [pedido, setPedido] = useState<Pedido[]>([]);
  const [clienteId, setClienteId] = useState<string | undefined>(undefined);

  const addProducto = (producto: Pedido) => {
    setPedido((prevPedido) => {
      const productoExistente = prevPedido.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prevPedido.map((p) =>
          p.id === producto.id ? { ...p, ...producto } : p
        );
      } else {
        return [...prevPedido, producto];
      }
    });
  };

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

  const resetPedido = () => setPedido([]);

  const onSubmit = async (pedidoArg?: Pedido[]) => {
    const pedidoParaEnviar = pedidoArg || pedido;
    if (!clienteId) return;
  
    try {
      const res = await fetch(`http://localhost:3000/api/pedidos/${clienteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: pedidoParaEnviar }),
      });
  
      if (!res.ok) {
        throw new Error('Error en la creación del pedido');
      }
  
      const data = await res.json();
      console.log('Pedido creado con éxito:', data);
      toast.success('Pedido creado con éxito');
      resetPedido(); // Limpiar pedido tras enviar
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      toast.error('Error al crear el pedido');
    }
  };
  

  return (
    <PedidoContext.Provider value={{handleCantidadChange, pedido, clienteId, setClienteId, addProducto, resetPedido, onSubmit }}>
      {children}
    </PedidoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
// eslint-disable-next-line react-refresh/only-export-components
export const usePedidoContext = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido debe usarse dentro de un PedidoProvider');
  }
  return context;
};
