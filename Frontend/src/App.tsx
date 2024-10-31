import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const handleSuccess = () => {
    toast.success("¡Acción completada con éxito!");
  };

  const handleError = () => {
    toast.error("Algo salió mal, intenta de nuevo.");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleError}>Mostrar Error</button>
      <ToastContainer />
    </div>
  );
}

export default App;
