// src/controller/POST/clientes/subscripciones/tokenPost.ts

import { Request, Response } from 'express';
import { db } from "../../../../prisma";

export default async function suscripcionPushPOST(req: Request, res: Response): Promise<void> {
  const { token } = req.body;
  console.log(token)
  if (!token) {res.status(400).json({ error: 'Token de notificación es requerido.' });
  return 
  }

  if (!res.locals.userId) {
    res.status(401).json({ message: 'Usuario no autenticado.' });
    return
  }

  try {
    const existingToken = await db.notificationToken.findUnique({
      where: {  id: res.locals.userId},
    });

    if (existingToken) {
      await db.notificationToken.update({
        where: { id: existingToken.id },
        data: { token },
      });
    } else {
      await db.notificationToken.create({
        data: {
          token,
          user: { connect: { id: res.locals.userId} },
        },
      });
    }

    res.status(200).json({ message: 'Token de notificación guardado correctamente.' });
  } catch (error) {
    console.error('Error al guardar el token de notificación:', error);
    res.status(500).json({ error: 'Error al procesar el token de notificación.' });
  }
}
