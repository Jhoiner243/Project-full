import { Router } from 'express'
import { db } from '../../prisma/index';
import type { Request, Response } from 'express';

const router: Router  = Router();

export const GetLogin = () =>{

router.get('/login/:id', async (req: Request, res: Response)=>{
   const User = await db.user.findUnique({
    where: {
        id: parseInt(req.params.id)
    }
   })
   res.json(User)
   return;
})

}

export const updateLogin = () =>{

router.put('/login/:id', async (req: Request, res:Response)=>{
    const userDataUpdate = await db.user.update({
    where: {
       id:  parseInt(req.params.id)
    },
    data: req.body
    })
    if(!userDataUpdate){
        res.status(400).json({message: 'No se actualizaron los datos'})
    }
})
}
export default router;