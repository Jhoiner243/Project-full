import React, { FormEvent, useState, useEffect } from 'react'
import {ProductosProps} from '../types/constants'
import { Dato } from '../../pages/product-view'

// eslint-disable-next-line react-refresh/only-export-components
const URL = 'http://localhost:3000/api/productos'

export const useProductos = () =>{
    const [datos, setDatos ] = useState<Dato>()
    const [productos, setProductos] = useState([])
    const [formProductos, setFormProducts] = useState<ProductosProps>({
        nombre_producto: '',
        precio_compra: 0,
        cantidad: 0
    })

    const onSubmit = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        console.log(formProductos);
        try {
          const res = await fetch(URL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",  // Incluye credenciales si es necesario
            body: JSON.stringify(formProductos)
          });
          if (!res.ok) {
            throw new Error(`Error en la peticion: ${res.status}`);
          }
          const data = await res.json();
          setDatos(data.message);
        } catch (error) {
          console.error('Error en el fetch datos', error);
        }
      };
      

      useEffect(() => {
        fetch('http://localhost:3000/api/productos')
          .then((res) => {
            console.log(res); // Log para ver la respuesta
            if (!res.ok) {
              throw new Error(`Error en la petición: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => setProductos(data))
          .catch((error) => console.error('Error fetching productos:', error));
      }, []);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name , value} = evento.target;
        console.log(datos)
        setFormProducts({
            ...formProductos,
            [name]: value
        })
    }
    return {handleChange, onSubmit, datos, formProductos, productos}
}