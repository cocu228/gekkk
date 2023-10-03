import {memo} from "react";
import {useSessionStorage} from "usehooks-ts";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import {auth} from "@/processes/firebaseConfig";
import Timer from "@/shared/model/hooks/useTimer";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {apiRequestCode} from "@/widgets/auth/api";
import {helperApiRequestCode} from "@/widgets/auth/model/helpers";
// import {storyDisplayAuth} from "@/widgets/auth/model/story";
import useError from "@/shared/model/hooks/useError";

export const ReSendCode = memo(({isUAS}: { isUAS: boolean }) => {

    const [{
        phone
    }, setSessionAuth] = useSessionStorage<TSessionAuth>("session-auth",
        {
            phone: "",
            verificationId: "",
            sessionIdUAS: ""
        }
    );

    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError] = useError()

    const onSend = () => {

        signInWithPhoneNumber(auth, "+" + phone, window.recaptchaVerifier)
            .then(({verificationId}) => {

                setSessionAuth(prev => ({
                    ...prev,
                    verificationId
                }));

            }).catch(function (error) {
            console.log(error)
            localErrorHunter(error)
        });

    }

    const onVerifierUAS = async () => {

        const response = await apiRequestCode(formatAsNumber(phone))

        helperApiRequestCode(response).success(() => {
            setSessionAuth(prev => ({
                ...prev,
                sessionIdUAS: response.data.sessid
            }))

        }).reject((e) => {
            console.log(e)
            localErrorHunter(e)
        })
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


    return <>
        {localErrorSpan}
        <Timer onAction={isUAS ? onVerifierUAS : onVerifier}/>
    </>
})
