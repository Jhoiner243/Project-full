import React, { FormEvent, useState, useEffect } from 'react';
import { ProductosProps } from '../types/constants';

// eslint-disable-next-line react-refresh/only-export-components
const URL = 'http://localhost:3000/api/productos';

export const useProductos = () => {
  const [datos, setDatos] = useState();
  const [productos, setProductos] = useState<ProductosProps[]>([]);
  const [formProductos, setFormProducts] = useState<ProductosProps>({
    nombre_producto: '',
    precio_compra: 0,
    cantidad: 0,
  });

  const onSubmit = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    console.log(formProductos);
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluye credenciales si es necesario
        body: JSON.stringify(formProductos),
      });
      if (!res.ok) {
        throw new Error(`Error en la petición: ${res.status}`);
      }
      const data = await res.json();
      setDatos(data.message);
    } catch (error) {
      console.error('Error en el fetch datos', error);
    }
  };

  // Lógica para obtener los productos y comprobar la cantidad
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((res) => {
        console.log(res); // Log para ver la respuesta
        if (!res.ok) {
          throw new Error(`Error en la petición: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);

        // Comprobar si hay productos con cantidad menor a 10
        const productosConBajaCantidad = data.filter(
          (producto: ProductosProps) => producto.cantidad < 10
        );

        if (productosConBajaCantidad.length > 0) {
          // Si hay productos con baja cantidad, envía la notificación
          notification();
        }
      })
      .catch((error) => console.error('Error fetching productos:', error));
  }, []);

  // Función para enviar la notificación
  const notification = () => {
    fetch('http://localhost:3000/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Stock Bajo',
        body: 'Algunos productos tienen menos de 10 kilos. Revisa el inventario.',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Notificación enviada:', data);
      })
      .catch((error) => {
        console.error('Error al enviar la notificación:', error);
      });
  };

  const handleChange = (
    evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evento.target;
    console.log(datos);
    setFormProducts({
      ...formProductos,
      [name]: value,
    });
  };

  return { handleChange, onSubmit, datos, formProductos, productos };
};
