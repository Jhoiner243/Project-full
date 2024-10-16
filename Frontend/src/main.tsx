import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import ErrorPage from '../pages/errorPage.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Register from '../pages/register.tsx'
import {Login} from '../pages/login.tsx'
import DashboardLayoutComponent from '../pages/dashboard-layout.tsx'
import  ProductViewComponent  from '../pages/product-view.tsx'
import PedidosComponentComponent from '../pages/pedidos-component.tsx'
import PedidosPage from '../pages/Pedidos/pedidos-page.tsx'

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
    element: <DashboardLayoutComponent/>,
    errorElement: <ErrorPage />,
  children: [
    {index: true, element: <PedidosComponentComponent />},
      {
        path: 'products',
        element: <ProductViewComponent/>,
        errorElement: <ErrorPage/>
      },
  ]

},

{
  path: '/clientes',
  element: <PedidosPage />
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
