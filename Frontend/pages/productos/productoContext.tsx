import React, {ReactNode,createContext, useContext, useState} from 'react';

interface Producto {
  id: number;
  precio_compra: number;
  cantidad: number;
}

interface ProductosContextProps {
  producto: Producto;
  setProductoUpdate: (producto: Producto) => void;
  handleUpdateProduct: (producto?: Producto) => void;
}

const ProductosContext = createContext<ProductosContextProps | undefined>(undefined);

// Provider
export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  const [producto, setProducto] = useState<Producto | undefined>(undefined);

  const setProductoUpdate = (producto: Producto) => {
    setProducto(producto);
  };
  
  if(!producto) return '...';

  const handleUpdateProduct = (producto?: Producto) => {
    if (producto) { // Verificamos que no sea undefined
      fetch(`http://localhost:3000/api/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al actualizar el producto');
          }
          return res.json();
        })
        .then((data) => {
          setProducto(data);
        })
        .catch((error) => {
          console.error('Error al actualizar el producto', error);
        });
    } else {
      console.error("Producto no definido");
    }
  };
  
  return (
    <ProductosContext.Provider value={{ producto, setProductoUpdate, handleUpdateProduct }}>
      {children}
    </ProductosContext.Provider>
  );
};


// Hook personalizado para acceder al contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useProductosContext = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider');
  }
  return context;
};