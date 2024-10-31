import type { Request, Response } from "express";
import { db } from "../../../prisma";
import { Clientes } from "./clientes.types";

export const clientesPOST = async (req: Request, res: Response): Promise<void> => {
    const { nombre_cliente, telefono, direccion, nombre_tienda, ruta }: Clientes = req.body;

    // Validación de datos requeridos
    if (!nombre_cliente || !telefono || !direccion || !nombre_tienda || !ruta) {
        res.status(400).json({ message: 'Faltan datos por ingresar' });
        return;
    }

    try {
        // Crear el cliente en la base de datos
        const clienteCreado = await db.cliente.create({
            data: {
                nombre_cliente,
                telefono,
                direccion,
                nombre_tienda,
                ruta
            }
        });

        res.status(201).json({ message: 'Cliente creado exitosamente', cliente: clienteCreado });
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({ message: 'Error al crear el cliente, por favor intente de nuevo' });
    }
};
