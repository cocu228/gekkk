import {memo, useEffect, useMemo, useState} from "react";
import {useSessionStorage} from "usehooks-ts";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import {auth} from "@/processes/firebaseConfig";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {apiRequestCode} from "@/widgets/auth/api";
import {helperApiRequestCode} from "@/widgets/auth/model/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from "react-i18next";
import {Timer} from "@/widgets/auth/model/helpers";


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

    const {t} = useTranslation();
    const [state, setState] = useState<null | number>(60)

    const instanceTimer = useMemo(() => new Timer(setState), [])

    useEffect(() => {
        return () => instanceTimer.clear()
    }, []);

    const onSendCode = async () => {
        const onAction = isUAS ? onVerifierUAS : onVerifier;
        await onAction();
        instanceTimer.run();
    }



    return <>
       
        <button type="button" disabled={!!state} className="second_value-button" onClick={onSendCode}>
            Resend code: {state}
        </button>
        {localErrorSpan ? <div className="row w-full">
            <div className="col">{localErrorSpan}</div>
        </div> : null}
    </>
})
