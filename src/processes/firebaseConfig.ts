import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
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

const auth = getAuth(app);

console.log(auth)
