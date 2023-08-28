import {initializeApp} from "firebase/app";
// import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: 'AIzaSyD28ckCRpa3a0Z8eilrpSbs4_0UQ-UZiA8',
    authDomain: 'gekkardionic.firebaseapp.com',
    databaseURL: 'https://gekkardionic.firebaseio.com',
    projectId: 'gekkardionic',
    storageBucket: 'gekkardionic.appspot.com',
    messagingSenderId: '113434870661'
};

export const app = initializeApp(firebaseConfig);

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth();


createUserWithEmailAndPassword(auth, "test", "test")
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user")
        console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage")
        console.log(errorMessage)
    });

signInWithEmailAndPassword(auth, "email", "password")
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user")
        console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("errorMessage")
        console.log(errorMessage)
    });


