import {useEffect, useState} from "react";
import Decimal from "decimal.js";
import {timer} from "@/widgets/auth/model/helpers";
import {useSessionStorage} from "usehooks-ts";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import {auth} from "@/processes/firebaseConfig";

export const ReSendCode = props => {


    const [{
        phone,
        secondaryForTimer,
        verificationId
    }, setSessionGlobal] = useSessionStorage<TSessionAuth>("session-auth",
        {phone: "", secondaryForTimer: 0, verificationId: ""}
    );

    const [state, setState] = useState<null | number>(null)

    useEffect(() => {

        const secondaryTime = (new Decimal(secondaryForTimer).isInteger() && secondaryForTimer > 0) ?
            secondaryForTimer : 60

        timer.call({setSessionGlobal, setState}, secondaryTime)

    }, []);

    const onSend = () => {

        if (!window.recaptchaVerifier) {
            signInWithPhoneNumber(auth, phone, new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: (response: unknown) => {
                    console.log(response)
                    console.log("callback")
                    // setTimeout(() =>
                    //     document.getElementById("recaptcha-container").style.display = "none", 500)
                }
            })).then(function (confirmationResult) {
                setSessionGlobal(prev => ({
                    ...prev,
                    phone: phone,
                    verificationId: confirmationResult.verificationId
                }))
                // confirmationResult can resolve with the fictional testVerificationCode above.
                console.log("confirmationResult")
                console.log(confirmationResult)
            }).catch(function (error) {

            });
        } else {
            signInWithPhoneNumber(auth, phone, window.recaptchaVerifier).then(function (confirmationResult) {
                // confirmationResult can resolve with the fictional testVerificationCode above.
                console.log("confirmationResultawdawd")
                console.log(confirmationResult)
            }).catch(function (error) {

            });
        }
    }


    return <div>
        {state === null ? <a onClick={onSend}>Send a repeat message to your phone</a> :
            <span>You can resend the message via: {state}</span>}
    </div>
}
