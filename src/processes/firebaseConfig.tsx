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
    apiKey: "AIzaSyARFJ1vMt-c6BUOcy4b3JvL1c2v0guJqSQ",
    authDomain: "gekkardionic.firebaseapp.com",
    databaseURL: "https://gekkardionic.firebaseio.com",
    projectId: "gekkardionic",
    storageBucket: "gekkardionic.appspot.com",
    messagingSenderId: "559638122615",
    appId: "1:559638122615:web:9d9042bb5f8fd8e0feb672",
    measurementId: "G-WM6QN2K1RK"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
