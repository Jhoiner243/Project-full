import { type Request, Response } from "express";
import { db } from "../../../prisma";
import { ClienteEdit } from "./clientes.types";
import validator from "validator"; 

export const clienteEdit = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validar el ID del cliente
        const id_cliente = req.params.id;
        if (!validator.isNumeric(id_cliente)) {
            res.status(400).json({ message: 'ID del cliente no es válido, debe ser numérico' });
            return 
        }

        // Validar los datos del cuerpo de la solicitud
        const { nombre_cliente, direccion , nombre_tienda, ruta, telefono}: ClienteEdit = req.body;

        // Validación de nombre del cliente
        if (!validator.isLength(nombre_cliente, { min: 1 })) {
             res.status(400).json({ message: 'El nombre del cliente es obligatorio' });
             return
        }

        // Validación de teléfono: debe ser numérico y tener 10 dígitos
        if (telefono && (!validator.isNumeric(telefono) || !validator.isLength(telefono, { min: 10, max: 10 }))) {
             res.status(400).json({ message: 'El teléfono debe ser numérico y de 10 dígitos' });
             return
        }

        // Validación opcional de otros campos
        if (nombre_tienda && !validator.isLength(nombre_tienda, { min: 1 })) {
             res.status(400).json({ message: 'El nombre de la tienda no es válido' });
             return
        }

        if (ruta && !validator.isLength(ruta, { min: 1 })) {
            res.status(400).json({ message: 'La ruta no es válida' });
            return
        }

        if (direccion && !validator.isLength(direccion, { min: 1 })) {
             res.status(400).json({ message: 'La dirección no es válida' });
             return
        }

        // Intentar actualizar el cliente en la base de datos
        const clienteEditado = await db.cliente.update({
            where: { id_cliente: parseInt(id_cliente) },
            data: {
                nombre_cliente,
                direccion,
                nombre_tienda,
                ruta,
                telefono,
            },
        });

        if (!clienteEditado) {
             res.status(404).json({ message: 'Cliente no encontrado' });
             return
        }

        // Responder con el cliente editado
        res.status(200).json({ message: 'Cliente editado exitosamente', cliente: clienteEditado });

    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
