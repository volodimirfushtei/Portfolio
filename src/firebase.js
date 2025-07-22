// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KlekF2sounwD9o2c1t5lKIlALnmh9vQ",
  authDomain: "portfolio-713fd.firebaseapp.com",
  projectId: "portfolio-713fd",
  storageBucket: "portfolio-713fd.firebasestorage.app",
  messagingSenderId: "1092341176888",
  appId: "1:1092341176888:web:d3f82ae86a85dc114724cd",
  measurementId: "G-F3D7RNPM1D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
