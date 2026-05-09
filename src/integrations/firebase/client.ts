// Firebase client — shared with the Horus-Bot mobile app and robot fleet.
// All values here are PUBLIC web config (safe to commit). Real security is
// enforced by Firebase Auth + Firestore Security Rules in the Firebase Console.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBTuVTdWRiLvfS7ZWY4vbQQX3QaAWUPREo',
  authDomain: 'horus-bot-app.firebaseapp.com',
  projectId: 'horus-bot-app',
  storageBucket: 'horus-bot-app.firebasestorage.app',
  messagingSenderId: '227449580108',
  appId: '1:227449580108:web:8c9235b77ada4fdcee62e9',
  measurementId: 'G-P7QDT0DK6Q',
};

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
