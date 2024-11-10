import { ProductosProvider } from "./productoContext"; 
import ProductViewComponent from './product-view'
import React from 'react';
import UpdateProduct from "./actualizarProducto";

function ProductPage() {
  return (
    <ProductosProvider>
      <ProductViewComponent />
      <UpdateProduct />
      {/* Agrega otros componentes que necesiten el contexto aquí */}
    </ProductosProvider>
  );
}

export default ProductPage;