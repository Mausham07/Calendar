import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { api_key } from "./api_key";
import {
    emailInput,
    passwordInput,
    signinBtn,
    signupBtn,
    signoutBtn,
} from "./ui.js";
import { showCalendarPage, showSigninPage } from "./utils.js";

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

const loginWithEmailPassword = async () => {
    console.log("login called");
    const loginEmail = emailInput.value;
    const loginPassword = passwordInput.value;

    try {
        const userCredentials = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        console.log(userCredentials);
        console.log(userCredentials.user);
    } catch (e) {
        console.error(e);
    }
};

const signupWithEmailPassword = async () => {
    console.log("Signup called");
    const loginEmail = emailInput.value;
    const loginPassword = passwordInput.value;

    try {
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        console.log(userCredentials);
        console.log(userCredentials.user);
    } catch (e) {
        console.error(e);
    }
};

const logout = async () => {
    await signOut(auth);
};

// Adds an event listener that detects whenever the state of the user changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If we have a signed in user, show the calendar
        showCalendarPage();
    } else {
        // Otherwise show the signin page
        showSigninPage();
    }
});

signinBtn.addEventListener("click", loginWithEmailPassword);
signupBtn.addEventListener("click", signupWithEmailPassword);
signoutBtn.addEventListener("click", logout);
