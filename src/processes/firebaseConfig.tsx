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


// const AuthFirebaseComponent = () => {

    // const [state, setState] = useState("")

    // function onCaptchaVerify() {
    //
    //     if (!window.recaptchaVerifier) {
    //
    //
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //             size: 'invisible',
    //             callback: (response) => {
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
    //
    //
    //     });
    // }

    // const onCode = () => {
    //     const code = state
    //
    //     window.confirmationResult.confirm(code).then((result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //
    //         // ...
    //     }).catch((error) => {
    //
    //
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
