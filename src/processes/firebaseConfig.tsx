// import {useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult} from "firebase/auth";
// import Button from "@/shared/ui/button/Button";
// import Input from "@/shared/ui/input/Input";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | undefined;
        confirmationResult: ConfirmationResult | undefined;
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyCSi9_z5zxYQ3wJJ0WGz87wIRbYHRDOr8E",
    authDomain: "blackcationic.firebaseapp.com",
    databaseURL: "https://blackcationic.firebaseio.com",
    projectId: "blackcationic",
    storageBucket: "blackcationic.appspot.com",
    messagingSenderId: "113434870661",
    appId: "1:113434870661:web:e5ef22a0e9ab65aa99baec",
    measurementId: "G-EVQ624H1SH"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
