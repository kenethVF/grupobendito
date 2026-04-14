// Archivo: src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGtHmdrechYqqKQ03ooUbqJgMv9lnYH7o",
  authDomain: "grupo-bendito.firebaseapp.com",
  projectId: "grupo-bendito",
  storageBucket: "grupo-bendito.firebasestorage.app",
  messagingSenderId: "733730551224",
  appId: "1:733730551224:web:f7c8d25f7cb3dacc068b4d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);