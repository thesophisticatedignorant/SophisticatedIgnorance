import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // TODO: The USER needs to replace this with their actual Firebase Config keys
    apiKey: "YOUR_API_KEY",
    authDomain: "sophisticated-ignorance.firebaseapp.com",
    projectId: "sophisticated-ignorance",
    storageBucket: "sophisticated-ignorance.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
