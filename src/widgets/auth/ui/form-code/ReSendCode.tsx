import {memo, useContext, useEffect, useMemo, useState} from "react";
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
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";


export const ReSendCode = memo(({isUAS, displayCapcha}: { isUAS: boolean, displayCapcha: () => void }) => {
    const {md} = useContext(BreakpointsContext);
    const [state, setState] = useState<null | number>(60);
    const [localErrorHunter, localErrorSpan] = useError();
    const instanceTimer = useMemo(() => new Timer(setState), []);

    const [{
        phone
    }, setSessionAuth] = useSessionStorage<TSessionAuth>("session-auth", {
        phone: "",
        verificationId: "",
        sessionIdUAS: ""
    });
    
    useEffect(() => {
        return () => instanceTimer.clear()
    }, []);
    
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
        const response = await apiRequestCode(formatAsNumber(phone));

        helperApiRequestCode(response).success(() => {
            setSessionAuth(prev => ({
                ...prev,
                sessionIdUAS: response.data.sessid
            }));
        }).reject((e) => {
            localErrorHunter(e)
        })
    }

    const onVerifier = function () {
        return new Promise((resolve, reject) => {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                    badge: "bottomleft",
                    size: md ? "compact" : "normal",
                    callback: (response: unknown) => {
                        onSend();
                    }
                })
            }
            
            window.recaptchaVerifier.verify().then(value => {
                resolve(value)
            });
        });
    }
    
    const onSendCode = async () => {
        displayCapcha()
        const onAction = isUAS ? onVerifierUAS : onVerifier;
        await onAction();
        instanceTimer.run();
    }
    
    return <>
        <button type="button" disabled={!!state} className="second_value-button" onClick={onSendCode}>
            Resend code{state ? `: ${state}` : ''}
        </button>
        {localErrorSpan ? <div className="row w-full">
            <div className="col">{localErrorSpan}</div>
        </div> : null}
    </>
})
