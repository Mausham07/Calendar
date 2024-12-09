// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { api_key } from "./api_key";

// Our web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: api_key, // DO NOT COMMIT THIS!
  authDomain: "cse310-shared-calendar.firebaseapp.com",
  projectId: "cse310-shared-calendar",
  storageBucket: "cse310-shared-calendar.firebasestorage.app",
  messagingSenderId: "102136831528",
  appId: "1:102136831528:web:51d45e19d0620048555f1d",
  measurementId: "G-BVS3SYJZZ6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, collection, getDocs, addDoc}