'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// Client-safe Firebase Web configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyDucWzTVZomZYsXyWZ83ygCSJOCArOBzIs',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'cie-connect.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'cie-connect',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'cie-connect.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '226102698550',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:226102698550:android:6f5be6ef43910a3d6dee97',
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

function createFirestore() {
  try {
    return initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
    });
  } catch {
    return getFirestore(firebaseApp);
  }
}

export const db = createFirestore();
