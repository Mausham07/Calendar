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
    prevBtn,
    nextBtn,
    addEventBtn,
} from "./ui.js";
import {
    showCalendarPage,
    showSigninPage,
    showSigninError,
    hideSigninError,
    prevMonth,
    nextMonth,
    addEventLocally,
    createEvent,
} from "./utils.js";

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

// Try to login existing user with user given email and password
const loginWithEmailPassword = async () => {
    const loginEmail = emailInput.value;
    const loginPassword = passwordInput.value;

    try {
        const userCredentials = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );

        // Probably not necessary but eh
        hideSigninError();
    } catch (e) {
        console.error(e);

        // Show the user diffrent error messages based on the problem
        switch (e.code) {
            case "auth/invalid-email":
                if (loginEmail == "") {
                    showSigninError(
                        `<p>Empty Email Field</p>
                        <p>Please input an email.</p>`
                    );
                } else {
                    showSigninError(
                        `<p>Invalid Email.</p>
                        <p>Please check your email and try again!</p>`
                    );
                }
                break;
            case "auth/missing-password":
                showSigninError(`<p>Missing password</p>`);
            case "auth/invalid-credential":
                showSigninError(
                    `<p>Wrong Password 😰</p>
                    <p>Please Try Again!</p>`
                );
                break;
            default:
                showSigninError(
                    `<p>Unknown Error</p>
                    <p>Please try again in a few minutes.</p>`
                );
        }
    }
};

// Create new user with user given email and password
const signupWithEmailPassword = async () => {
    const loginEmail = emailInput.value;
    const loginPassword = passwordInput.value;

    try {
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
    } catch (e) {
        console.error(e);
        showSigninError(
            `<p>Unknown Error</p>
            <p>Please try again in a few minutes.</p>`
        );
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

// Add event listeners to sign-up, sign-in, and sign-out
signinBtn.addEventListener("click", loginWithEmailPassword);
signupBtn.addEventListener("click", signupWithEmailPassword);
signoutBtn.addEventListener("click", logout);

// Sign-in if Enter is pressed while focus is on a sign-in input
emailInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithEmailPassword();
});
passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithEmailPassword();
});

// Add calender navigation event listeners
prevBtn.addEventListener("click", prevMonth);
nextBtn.addEventListener("click", nextMonth);
addEventBtn.addEventListener("click", () => {
    const currentEvent = createEvent();
    addEventLocally(currentEvent);
});
