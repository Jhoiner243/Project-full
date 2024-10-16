import type { Request, Response } from "express";
import { db } from "../../../prisma";
import { Clientes } from "./clientes.types";

export const clientesPOST = async (req: Request, res: Response): Promise<void> =>{
    const {nombre_cliente,  telefono, direccion, nombre_tienda, ruta }: Clientes = req.body


    const clientes = await db.cliente.create({
        data: {
            nombre_cliente,
            telefono,
            direccion,
            nombre_tienda,
            ruta
        }
    })

    res.status(200).json('Cliente creado exitosamente')
}