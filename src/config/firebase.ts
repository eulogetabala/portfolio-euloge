// Configuration Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDWcy1u_x2Xjn60EZDtE1N_wYIovA1EmQU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "euloge-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "euloge-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "euloge-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "482534216674",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:482534216674:web:46772cf8cf2ba8dba71fbb",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CGDPGJJDLT",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialiser Analytics (seulement en production et si disponible)
let analytics;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics non disponible:', error);
  }
}

export { analytics };
export default app;
