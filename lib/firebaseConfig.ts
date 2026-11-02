// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { Platform } from 'react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDV5N8aC3deEvlF8ju1fP4Bg6s4pg-cbAQ',
  authDomain: 'taskflow-4454a.firebaseapp.com',
  projectId: 'taskflow-4454a',
  storageBucket: 'taskflow-4454a.firebasestorage.app',
  messagingSenderId: '825283220876',
  appId: '1:825283220876:web:e87f99225bc46e014372a9',
  measurementId: 'G-LLXQCGK0D9',
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
