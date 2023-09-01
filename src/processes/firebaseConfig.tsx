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
