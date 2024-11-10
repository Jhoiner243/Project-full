import { db } from "../../../prisma/index";
import type { Request, Response } from "express";

interface Productos {
    precio_compra: number;
    cantidad: number;
}


export const AñadirProductos = async (req: Request, res: Response): Promise<void> =>{
    
        try {
            // Obtener los datos del producto desde el cuerpo de la petición
            const { nombre_producto, precio_compra, cantidad } = req.body;
    
            // Verificar que todos los campos necesarios están presentes
            if (!nombre_producto ||  !precio_compra || !cantidad) {
                res.status(400).json({ error: 'Todos los campos son obligatorios' });
                return;
            }

            const newProduct = await db.producto.create({
                data: {
                    nombre_producto,
                    precio_compra: parseInt(precio_compra), 
                    cantidad: parseInt(cantidad)
                }
            })

        res.status(200).json({message: `Producto creado exitosamente`})

    
        } catch (error) {
            console.error('Error al crear el producto:', error);
             res.status(500).json({ error: 'Error al crear el producto' });
             return
        }
    };
    