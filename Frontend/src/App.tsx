import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../app/layout";
import LoginPage from "../pages/Sesion/Login/loginPage";
import Register from "../pages/Sesion/register";
import ErrorPage from "../pages/error-pages/errorPage";
import ProductViewComponent from "../pages/productos/product-view";
import PedidosComponentComponent from "../pages/Pedidos/pedidos-component";
import ClientesPage from "../pages/Clientes/clientes";
import AnalyticsDashboard from "../pages/graficasPedidos/components/configGrafic";
import { PedidoProvider } from "../pages/Pedidos/pedidoContext"; // Ajusta la ruta según tu proyecto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta protegida para Dashboard con PedidoProvider */}
        <Route
          path="/dashboard"
          element={
            <PedidoProvider>
              <Layout />
            </PedidoProvider>
          }
          errorElement={<ErrorPage />}
        >
          {/* Rutas hijas dentro de Dashboard */}
          <Route path="analizis" element={<AnalyticsDashboard />} errorElement={<ErrorPage />} />
          <Route path="pedidos" element={<PedidosComponentComponent />} errorElement={<ErrorPage />} />
          <Route path="products" element={<ProductViewComponent />} errorElement={<ErrorPage />} />
          <Route path="clientes" element={<ClientesPage />} errorElement={<ErrorPage />} />
          <Route path="clientes/:id_cliente" element={<ClientesPage />} errorElement={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
