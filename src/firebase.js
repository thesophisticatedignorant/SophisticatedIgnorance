import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyD4493KIMjdbLWIBtRuCAmlpcXA2x1Z-3s",
  authDomain: "sophisticatedignorance.co",
  projectId: "sophisticated-ignorance-adec4",
  storageBucket: "sophisticated-ignorance-adec4.firebasestorage.app",
  messagingSenderId: "870907590478",
  appId: "1:870907590478:web:94010ce7aa8c951376101f",
  measurementId: "G-JSXCPCM0T1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// App Check verifies that Auth and Firestore requests are coming from this real app
// instance (backed by a reCAPTCHA v3 score), covering both sign-ins and every
// Firestore write (newsletter signups, request-access submissions, etc.) from one
// integration point rather than a widget on each form. Requires:
//  1. VITE_RECAPTCHA_SITE_KEY (public, safe client-side - set below). The matching
//     SECRET key is never put in this codebase - it only goes into Firebase Console >
//     App Check when registering the reCAPTCHA v3 provider there.
//  2. Registering this app + turning on enforcement in Firebase Console > App Check
//     (a manual step - turning on enforcement before a valid key is deployed will
//     lock out real users, so do this only after confirming the key works).
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (recaptchaSiteKey) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true
  });
} else if (import.meta.env.DEV) {
  console.warn('App Check not initialized: VITE_RECAPTCHA_SITE_KEY is not set');
}
