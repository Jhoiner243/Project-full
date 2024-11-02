import { toast, ToastContainer } from "react-toastify";
import { messaging } from "../../../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

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
      .then((notificationToken) => {
        if (notificationToken) {
          console.log("Token de notificación:", notificationToken);
          
          // Recupera el token de autenticación desde localStorage
          const authToken = localStorage.getItem("access_token");
          if(!authToken){
            console.error('Error en el envio de el token JWT')
          }
          // Enviar token al servidor con encabezado de autorización
          return fetch("http://localhost:3000/api/subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`, // Incluye el token de autenticación en el encabezado
            },
            body: JSON.stringify({ token: notificationToken }), // Envía el token de notificación
          });
        } else {
          console.log("No se recibió un token de notificación.");
        }
      })
      .catch((error) =>
        console.error("Error al obtener el token de notificación:", error)
      );
  };
    useEffect(()=>{
     
    
    onMessage(messaging, message=>{
      console.log("tu mensaje:", message);
      toast(message.notification?.title);
    
    
    })
    
    
    }, []);
  return (
    <>
    <ToastContainer />
    <button onClick={solicitarPermisoDeNotificacion}>
      Activar Notificaciones
    </button>
    </>
  );
}

export default NotificationButton;
