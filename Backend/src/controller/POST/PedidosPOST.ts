import { Router, Request, Response } from 'express';
import { db } from '../../prisma'; // Ajusta según tu estructura

// Definir el router de Express
const router = Router();

// Definir la ruta para crear un pedido
export const pedidosCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cliente_id, productos } = req.body;

    // Verificar si el cliente existe
    const cliente = await db.cliente.findUnique({
      where: { id_cliente: cliente_id }, // Ajusta según el nombre correcto de la columna de tu tabla Cliente
    });

    if (!cliente) {
      res.status(400).json({ message: 'El cliente no existe.' });
      return;
    }

    // Verificar que los productos están presentes
    if (!productos || productos.length === 0) {
      res.status(400).json({ message: 'No se proporcionaron productos.' });
      return;
    }

    // Crear el pedido
    const newPedido = await db.pedido.create({
      data: {
        cliente_id,
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

        await db.detallePedido.create({
          data: {
            pedido_id: newPedido.id,
            producto: productDetails.nombre_producto,
            cantidad,
            precio_compra: productDetails.precio_compra,
            precio_venta,
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
