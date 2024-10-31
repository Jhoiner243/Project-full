import { Router, type Request, type Response } from "express";
import { db } from "../../../prisma/index";

const router: Router = Router()
interface clienteDelete {
    id_cliente: string
}
export const clienteDelete = async (req: Request, res: Response) => {
    try {
        const  id_cliente  = req.params.id_cliente

        if(!id_cliente){
            res.status(403).json({message: 'Falta id del cliente'})
        }
        const id_cliente_number = parseInt(id_cliente);

        if (isNaN(id_cliente_number)) {
             res.status(400).json({ message: 'El id del cliente debe ser un número válido' });
        }

        const deleCliente = await db.cliente.delete({
            where: {
                id_cliente: id_cliente_number
            }         
        })
    } catch (error) {
        console.log('Error al eliminar cliente')
    }
   

}

