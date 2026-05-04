import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Adicionando o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCG-Zz_xZp-49GXIbL3V-2vBrmux7czPPg",
  authDomain: "lembro-ee450.firebaseapp.com",
  projectId: "lembro-ee450",
  storageBucket: "lembro-ee450.firebasestorage.app",
  messagingSenderId: "434505731604",
  appId: "1:434505731604:web:0b474b1f2467863d5fa101"
};

// Verifica se o app já foi inicializado (melhor prática no Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Exportando as funcionalidades que você precisa
export const auth = getAuth(app);
export const db = getFirestore(app); // Aqui está o 'db' que faltava!