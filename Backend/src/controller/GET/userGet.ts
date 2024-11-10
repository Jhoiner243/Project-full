import type{Request, Response} from 'express'
import { db } from "../../prisma";
import { Router } from 'express'; 

export const routerUsers: Router = Router()

routerUsers.get('/user', async (req: Request, res: Response) => {
    try {
        const user = await db.user.findFirst()
        if (!user) {
            res.status(404).json({ message: 'No se encontró ningún usuario' })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        console.error('Error al obtener el usuario:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

