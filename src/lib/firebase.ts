import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const metaEnv = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "AIzaSyDGMh8t70BcFbqq-okgfV7wN6ty-KNaqt0",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "recycling-store-locator-be37b.firebaseapp.com",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "recycling-store-locator-be37b",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "recycling-store-locator-be37b.firebasestorage.app",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "300871355780",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:300871355780:web:681d6446a2d2852c4f61d1",
  measurementId: metaEnv.VITE_FIREBASE_MEASUREMENT_ID || "G-41N14FF7E4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Safe Analytics instantiation (essential in sandboxed iframe / server preview context)
export let analytics: any = null;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((err) => {
    console.warn("Firebase Analytics is not supported in this environment:", err);
  });

export { app };
