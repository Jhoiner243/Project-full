import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import ErrorPage from '../pages/error-pages/errorPage.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Register from '../pages/Sesion/register.tsx'
import {Login} from '../pages/Sesion/login.tsx'
import Layout from '../app/layout.tsx'
import  ProductViewComponent  from '../pages/product-view.tsx'
import PedidosComponentComponent from '../pages/Pedidos/pedidos-component.tsx'
import ClientesPage from '../pages/Clientes/clientes.tsx'


const router = createBrowserRouter ([
  {
    path: '/',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Layout/>,
    errorElement: <ErrorPage />,
  children: [
    {index: true, element: <PedidosComponentComponent />},
      {
        path: 'products',
        element: <ProductViewComponent/>,
        errorElement: <ErrorPage/>
      },
      {
        path: 'clientes',
        element: <ClientesPage />,
      },
        
      {
        path: 'clientes/:id_cliente',
        element: <ClientesPage />
      }
      ]
    }

  ]

)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
