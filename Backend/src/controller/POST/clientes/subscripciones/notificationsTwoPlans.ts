import { GoogleAuth } from 'google-auth-library';

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Ruta al archivo JSON de la cuenta de servicio
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  return token;
}

async function sendNotification() {
  const projectId = 'maxpollo-c170b'; // Reemplaza con tu ID de proyecto de Firebase

  // Obtén el Access Token dinámicamente
  const accessToken = await getAccessToken();

  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

  const message = {
    message: {
      token: 'e3rXjlAzff20WGW7Xz6lAp:APA91bHATQELEfI_G1ppbnNY9sPmsYV5yhRs97PKko1bRvoSm-R5PA-oyqteQ-6eJGOzcmNi6ZrElWaA820Mnq_Ez0zgNrhB50ZxvRZK1MZWrkq6cSMgbGI', // Reemplaza con el token del dispositivo al que quieres enviar la notificación
      notification: {
        title: 'Mensaje en segundo plano',
        body: 'Nada para decir andamos probando',
      },
      webpush: {
        fcm_options: {
          link: 'https://dummypage.com',
        },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Token de acceso dinámico
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      console.log('Notificación enviada correctamente:', await response.json());
    } else {
      console.error('Error en la respuesta de FCM:', await response.json());
    }
  } catch (error) {
    console.error('Error enviando la notificación:', error);
  }
}

sendNotification();
