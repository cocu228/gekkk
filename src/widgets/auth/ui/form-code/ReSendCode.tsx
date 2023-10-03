import {memo} from "react";
import {useSessionStorage} from "usehooks-ts";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import {auth} from "@/processes/firebaseConfig";
import Timer from "@/shared/model/hooks/useTimer";

export const ReSendCode = memo(() => {

    const [{
        phone
    }, setSessionGlobal] = useSessionStorage<TSessionAuth>("session-auth",
        {
            phone: "",
            verificationId: "",
            sessionIdUAS: ""
        }
    );


    const onSend = () => {

        signInWithPhoneNumber(auth, "+" + phone, window.recaptchaVerifier)
            .then(({verificationId}) => {

                setSessionGlobal(prev => ({
                    ...prev,
                    verificationId
                }));

            }).catch(function (error) {
            console.log(error)
        });

    }

    const onVerifier = function () {

        return new Promise((resolve, reject) => {

        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: (response: unknown) => {
                    onSend()
                }
            })
        }
            window.recaptchaVerifier.verify().then(value => {
                resolve(value)
            })

        })
    }


    return <Timer onAction={onVerifier}/>
})
