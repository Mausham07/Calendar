import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { api_key } from "./api_key";

const firebaseConfig = {
  apiKey: api_key, // DO NOT COMMIT THE API KEY!
  authDomain: "cse310-shared-calendar.firebaseapp.com",
  projectId: "cse310-shared-calendar",
  storageBucket: "cse310-shared-calendar.firebasestorage.app",
  messagingSenderId: "102136831528",
  appId: "1:102136831528:web:51d45e19d0620048555f1d",
  measurementId: "G-BVS3SYJZZ6",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Logged in");
  } else {
    console.log("No User");
  }
});
