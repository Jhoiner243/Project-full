// firebase.ts
import dotenv from 'dotenv'
dotenv.config()
import {getMessaging} from 'firebase-admin/messaging'
import { initializeApp, applicationDefault } from 'firebase-admin/app';

// Inicializar Firebase Admin SDK
initializeApp({
  credential: applicationDefault()
});

const messaging = getMessaging();

export default messaging