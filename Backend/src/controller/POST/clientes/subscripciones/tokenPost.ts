import { Request, Response } from 'express';
//import admin from "../../../../firebase-admin"; // Asegúrate de que la ruta sea correcta

// Endpoint POST para almacenar el token
export default async function suscripcionPushPOST(req: Request, res: Response): Promise<void> {
  const { token } = req.body; // Se espera que envíes el token en el cuerpo de la solicitud

  if (!token) {
     res.status(400).json({ error: 'Token es requerido.' });
     return
  }

  try {
    // Aquí puedes almacenar el token en la base de datos
    // Por ejemplo: await db.token.create({ data: { token } });

    res.status(200).json({ message: 'Token recibido y almacenado correctamente.', token });
  } catch (error) {
    console.error('Error almacenando el token:', error);
    res.status(500).json({ error: 'Error procesando el token.' });
  }
}
