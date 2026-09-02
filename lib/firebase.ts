'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// Client-safe Firebase Web configuration reused from the existing Admin Dashboard.
const firebaseConfig = {
  apiKey: 'AIzaSyDucWzTVZomZYsXyWZ83ygCSJOCArOBzIs',
  authDomain: 'cie-connect.firebaseapp.com',
  projectId: 'cie-connect',
  storageBucket: 'cie-connect.firebasestorage.app',
  messagingSenderId: '226102698550',
  appId: '1:226102698550:android:6f5be6ef43910a3d6dee97',
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
