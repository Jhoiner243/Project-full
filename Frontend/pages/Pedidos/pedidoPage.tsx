// App.tsx
import React from 'react';
import { PedidoProvider } from './pedidoContext';
import ComboboxDemo from './pedidos-component';
import PedidoForm from './pedidos-component';

function App() {
  return (
    <PedidoProvider>
      <ComboboxDemo />
      <PedidoForm />
      {/* Agrega otros componentes que necesiten el contexto aquí */}
    </PedidoProvider>
  );
}

export default App;
