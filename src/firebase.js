import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4493KIMjdbLWIBtRuCAmlpcXA2x1Z-3s",
  authDomain: "sophisticated-ignorance-adec4.firebaseapp.com",
  projectId: "sophisticated-ignorance-adec4",
  storageBucket: "sophisticated-ignorance-adec4.firebasestorage.app",
  messagingSenderId: "870907590478",
  appId: "1:870907590478:web:94010ce7aa8c951376101f",
  measurementId: "G-JSXCPCM0T1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
