import { Router, type Request, type Response } from 'express';
import { db } from '../../prisma';
import { startOfWeek, startOfMonth, format } from 'date-fns';

const pedidosRouter: Router = Router();

pedidosRouter.get('/pedidos', async (req: Request, res: Response) => {
    try {
        // Consulta los datos de ambas tablas
        const pedidos = await db.pedido.findMany({ include: { detalles: true } }); // Incluye detalles de cada pedido

        const dataMap = {
            diario: new Map<string, any>(),
            semanal: new Map<string, any>(),
            mensual: new Map<string, any>(),
        };

        pedidos.forEach((pedido) => {
            const fecha = new Date(pedido.fecha); // Convierte la fecha a objeto Date
            const diaKey = format(fecha, 'yyyy-MM-dd');
            const semanaKey = format(startOfWeek(fecha), 'yyyy-MM-dd');
            const mesKey = format(startOfMonth(fecha), 'yyyy-MM');

            // Calcula las ganancias
            const ganancias = (pedido.detalles || []).reduce((acc: number, detalle: any) => {
                return acc + (detalle.precio_venta - detalle.precio_compra) * detalle.cantidad;
            }, 0);

            // Actualiza los mapas de datos
            [{ key: diaKey, map: dataMap.diario }, { key: semanaKey, map: dataMap.semanal }, { key: mesKey, map: dataMap.mensual }]
                .forEach(({ key, map }) => {
                    if (!map.has(key)) {
                        map.set(key, { periodo: key, ganancias: 0, pedidos: 0, clientes: new Set() });
                    }
                    const data = map.get(key);
                    data.ganancias += ganancias;
                    data.pedidos += 1;
                    data.clientes.add(pedido.id); // Usa el ID del pedido para representar al cliente
                });
        });

        // Formatea los datos para enviarlos al frontend
        const formatData = (map: Map<string, any>) => Array.from(map.values()).map((item) => ({
            ...item,
            clientes: item.clientes.size, // Convierte el Set de clientes a un número
        }));

        const response = {
            pedidos,
            diario: formatData(dataMap.diario),
            semanal: formatData(dataMap.semanal),
            mensual: formatData(dataMap.mensual),
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error al mostrar pedidos:', error); 
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default pedidosRouter;
