// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
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
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);