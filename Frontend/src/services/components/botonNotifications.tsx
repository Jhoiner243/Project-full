import { messaging } from "../../../firebase";
import { getToken } from "firebase/messaging";

function NotificationButton() {
  const solicitarPermisoDeNotificacion = () => {
    if (Notification.permission === "granted") {
      console.log("Permiso ya concedido.");
      obtenerToken();
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          obtenerToken();
        } else {
          console.log("Permiso de notificación denegado.");
        }
      });
    } else {
      console.log("Permiso de notificación denegado previamente. Pide al usuario habilitarlo en la configuración del navegador.");
    }
  };

  const obtenerToken = () => {
    getToken(messaging, {
      vapidKey: "BMz_vg_A_F4dgn26pas-THz4Fn5j4EPE6MiLgjkOvFbGl1XBwv4UOnRBPoi2m6pCQHjAV9T6FMp3b2CGgmfAyBo",
    })
      .then((token) => {
        if (token) {
          console.log("Token de notificación:", token);
          // Enviar token al servidor
          return fetch("http://localhost:3000/api/subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }), // Enviar el token como parte de un objeto JSON
          });
        } else {
          console.log("No se recibió un token de notificación.");
        }
      })
      .catch((error) =>
        console.error("Error al obtener el token de notificación:", error)
      );
  };

  return (
    <button onClick={solicitarPermisoDeNotificacion}>
      Activar Notificaciones
    </button>
  );
}

export default NotificationButton;
