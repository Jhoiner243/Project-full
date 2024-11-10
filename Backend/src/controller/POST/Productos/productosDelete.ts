import type {Request, Response} from 'express'
import {Router} from 'express'
import {db} from '../../../prisma/index'

export const routerProducts: Router = Router()

interface ProductDelete {
    id_producto: string
}


    routerProducts.delete('/productos/:id_producto'), async (req: Request, res: Response) => {
    try {
        const  id_producto  = req.params.id_producto

        const deleteProductos = await db.producto.delete({
            where: {
                id: Number(id_producto)
            }
        })

        res.status(200).json({message: `Producto eliminado exitosamente`})
    }catch(error){
        console.log('Error al eliminar producto')
    }
    }

    routerProducts.put('/productos/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { precio_compra, cantidad } = req.body;
            
            console.log(id, precio_compra, cantidad);
    
            // Validar que precio_compra y cantidad no sean undefined o null y que sean números
            if (precio_compra === undefined || cantidad === undefined || isNaN(precio_compra) || isNaN(cantidad)) {
                res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser números válidos' });
                return;
            }
    
            // Actualizar el producto en la base de datos
            const updateProductos = await db.producto.update({
                where: {
                    id: Number(id),
                },
                data: {
                    precio_compra: parseInt(precio_compra, 10),
                    cantidad: parseInt(cantidad, 10),
                },
            });
    
            // Responder con el producto actualizado o un mensaje de éxito
            res.status(200).json({ message: 'Producto actualizado exitosamente', producto: updateProductos });
    
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({ error: 'Error interno al actualizar el producto' });
        }
    });
    