import { Router, Request, Response } from 'express';
import { db } from '../../prisma'; // Ajusta según tu estructura
import validator from 'validator';

// Definir el router de Express
const router = Router();


// Definir la ruta para crear un pedido
export const pedidosCreate = async (req: Request, res: Response): Promise<void> => {
  try {

   

    const cliente_id = req.params.cliente_id;
        if (!validator.isNumeric(cliente_id)) {
            res.status(400).json({ message: 'ID del cliente no es válido, debe ser numérico' });
            return 
        }

      if (!cliente_id) {
        res.status(400).json({ message: 'El cliente no existe.' });
        return;
      }

    const { productos } = req.body;


    // Verificar que los productos están presentes
    if (!productos || productos.length === 0) {
      res.status(400).json({ message: 'No se proporcionaron productos.' });
      return;
    }

    // Crear el pedido
    const newPedido = await db.pedido.create({
      data: {
        cliente_id: Number(cliente_id),
        fecha: new Date(),
        total: 0,
        estado: 'pagado',
      },
    });

    // Lógica de los productos
    let total = 0;
    for (const producto of productos) {
      const { id, cantidad, precio_venta } = producto;

      const productDetails = await db.producto.findUnique({
        where: { id },
      });

      if (productDetails) {
        const subtotal = cantidad * precio_venta;
        total += subtotal;

        // Crear el detalle del pedido
        await db.detallePedido.create({
          data: {
            pedido_id: newPedido.id,
            producto: productDetails.nombre_producto,
            cantidad,
            precio_compra: productDetails.precio_compra,
            precio_venta,
          },
        });

        // Actualizar la cantidad del producto en el inventario
        const nuevaCantidad = productDetails.cantidad - cantidad;
        if (nuevaCantidad < 0 || productDetails.cantidad < cantidad) {
          res.status(400).json({ message: `Cantidad insuficiente para el producto ${productDetails.nombre_producto}.` });
          return;
        }

        await db.producto.update({
          where: { id },
          data: {
            cantidad: nuevaCantidad,
          },
        });
      }
    }

    // Actualizar el total del pedido
    await db.pedido.update({
      where: { id: newPedido.id },
      data: { total },
    });
    res.status(201).json({ message: 'Pedido creado con éxito', pedido: newPedido });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
