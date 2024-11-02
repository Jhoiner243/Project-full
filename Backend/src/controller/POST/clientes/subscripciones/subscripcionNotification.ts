import admin from "../../../../firebase-admin";
import messaging from "../../../../firebase-admin";
import { db } from "../../../../prisma";
import type { Request, Response } from 'express';

// Ruta para enviar notificaciones a todos los usuarios registrados
export async function notificationsSend(req: Request, res: Response) {
  try {
    // Recupera todos los tokens desde la base de datos
    const tokensData = await db.notificationToken.findMany();
    const tokens = tokensData.map((token) => token.token);

    // Verifica si hay tokens disponibles
    if (tokens.length === 0) {
      res.status(404).json({ message: "No tokens found" });
      return;
    }

    // Configura el contenido de la notificación
    const { title, body } = req.body;

    const singleMessage = {
      token: 'dJjn4zhWEa_3Dfg7pRs8vk:APA91bHFOBYMCjY43BhPkCPzDW-D4Naj-UT63UbRC51JNi7yIduxiX7LYTM_IqkQ_zK_glvkWXf_TGTnIfb08nY8UXFFUQQ84MhhP6sF__rSOIoC3UkaaJk', // Usa un token válido
      notification: {
        title,
        body,
      },
    };
    
    try {
      const response = await messaging.send(singleMessage);
      console.log("Notification enviada correctamente:", response);
    } catch (err) {
      console.error("Error sending notification:", err);
    }

    

    res.status(200).json({
      status: 200,
      message: "Notificacaciones enviadas correctamente",
    });
  } catch (err) {
    console.error("Error sending notifications:", err);
    res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", error: err });
  }
}
