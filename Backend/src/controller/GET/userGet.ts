import type{Request, Response} from 'express'
import { db } from "../../prisma";
import { Router } from 'express'; 

const router: Router = Router()

router.get('/user', async (req: Request, res: Response) => {
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

export default router