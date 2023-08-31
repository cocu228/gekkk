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
    apiKey: "AIzaSyBTmEAfPYT_rxWrjwWZg2CnzVP-aWrgGo0",
    authDomain: "gekkard-com.firebaseapp.com",
    databaseURL: "https://gekkard-com.firebaseio.com",
    projectId: "gekkard-com",
    storageBucket: "gekkard-com.appspot.com",
    messagingSenderId: "389504038547",
    appId: "1:389504038547:web:0545194fc30d8642103f66",
    measurementId: "G-WM6QN2K1RK"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// const AuthFirebaseComponent = () => {

    // const [state, setState] = useState("")

    // function onCaptchaVerify() {
    //
    //     if (!window.recaptchaVerifier) {
    //
    //         console.log(auth.currentUser)
    //
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //             size: 'invisible',
    //             callback: (response) => {
    //                 console.log(response)
    //                 onSingIn()
    //             }
    //         });
    //     }
    // }

    // const onInput = ({target}) => setState(target.value)

    // const onSingIn = () => {
    //
    //     onCaptchaVerify()
    //
    //     const phoneNumber = "+995574836618"
    //     const appVerifier = window.recaptchaVerifier;
    //
    //
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //             // ...
    //         }).catch((error) => {
    //         console.log("error")
    //         console.log(error)
    //     });
    // }

    // const onCode = () => {
    //     const code = state
    //
    //     window.confirmationResult.confirm(code).then((result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //         console.log(user)
    //         // ...
    //     }).catch((error) => {
    //         console.log("errorCode")
    //         console.log(error)
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //     });
    // }

//     return <div>
//         <span>Phone number</span>
//         <span>+79111111111</span>
//         <div id="recaptcha-container" className="justify-center flex">
//         </div>
//         <Button onClick={onSingIn}>SingIn Firebase</Button>
//         <Input onChange={onInput} type="text"/>
//         <Button onClick={onCode}>SingIn code</Button>
//
//     </div>
// }
// export default AuthFirebaseComponent
