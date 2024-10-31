import {Router, type Request, type Response} from 'express'
import { db } from '../../prisma'

const pedidosRouter: Router = Router()

    pedidosRouter.get('/pedidos', async (req, res) =>{
        try {
        const pedidos = await db.pedido.findMany()
        res.status(200).json(pedidos)

        } catch (error) {
        console.error('http error al mostrar pedidos', error)  
        res.status(500).json({ message: "Error interno del servidor" });  
        }
    
    })

export default pedidosRouter