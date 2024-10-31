importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js")

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnniu1lKDMB7wEaodGtHtrbYJkLMCpyYo",
  authDomain: "maxpollo-c170b.firebaseapp.com",
  projectId: "maxpollo-c170b",
  storageBucket: "maxpollo-c170b.firebasestorage.app",
  messagingSenderId: "343277605512",
  appId: "1:343277605512:web:d954e1ba216e78cff9853d",
  measurementId: "G-HP5KRZRJQ3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Define cómo se manejarán las notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Recibido mensaje en segundo plano: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // Cambia esto según tu ícono preferido
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
