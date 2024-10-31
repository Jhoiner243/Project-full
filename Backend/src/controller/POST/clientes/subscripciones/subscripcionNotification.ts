// //import admin from "../../../../firebase-admin";
// import { db } from "../../../../prisma";


// // Ejemplo de lógica cuando el inventario está bajo
// async function verificarInventario(productId: number) {
//   const producto = await db.producto.findUnique({ where: { id: productId } });
//   if (producto && producto.cantidad <= 10) {
//     enviarNotificacionPush(producto);
//   }
// }

// function enviarNotificacionPush(producto) {
//   const mensaje = {
//     notification: {
//       title: 'Producto agotándose',
//       body: `El producto ${producto.nombre} se está agotando.`,
//     },
//     topic: 'usuarios', // Puedes enviar a un "topic" o a tokens específicos
//   };

//   admin.messaging().send(mensaje)
//     .then((response) => {
//       console.log('Notificación enviada:', response);
//     })
//     .catch((error) => {
//       console.error('Error enviando notificación:', error);
//     });
// }
