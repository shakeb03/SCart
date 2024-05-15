import firebase from 'firebase/compat/app'; // Adjust import statement
import 'firebase/compat/auth'; // Import Firebase Auth module

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBzoCVT67aBETRiXayF1knOwMjikPYhI7k",
    authDomain: "scart-18a4b.firebaseapp.com",
    projectId: "scart-18a4b",
    storageBucket: "scart-18a4b.appspot.com",
    messagingSenderId: "540678379729",
    appId: "1:540678379729:web:a02471a2923aadc1a40df0"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export default firebase;