// PedidoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interfaces de datos
interface Pedido {
  id: number;
  cantidad: number;
  precio_venta: number;
}

interface PedidoContextProps {
  pedido: Pedido[];
  clienteId: number | undefined;
  setClienteId: (id: number) => void;
  addProducto: (producto: Pedido) => void;
  resetPedido: () => void;
}

// Contexto inicial
const PedidoContext = createContext<PedidoContextProps | undefined>(undefined);

// Provider
export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [pedido, setPedido] = useState<Pedido[]>([]);
  const [clienteId, setClienteId] = useState<number | undefined>(undefined);

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

  const resetPedido = () => setPedido([]);

  return (
    <PedidoContext.Provider value={{ pedido, clienteId, setClienteId, addProducto, resetPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
// eslint-disable-next-line react-refresh/only-export-components
export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido debe usarse dentro de un PedidoProvider');
  }
  return context;
};
