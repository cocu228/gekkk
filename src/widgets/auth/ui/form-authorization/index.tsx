import md5 from 'md5';
import {Input} from 'antd';
import Form from '@/shared/ui/form/Form';
import '@styles/(cs)react-phone-input.scss';
import {useSessionStorage} from "usehooks-ts";
import Button from '@/shared/ui/button/Button';
import {memo, useContext, useRef, useState} from 'react';
import ReactPhoneInput from "react-phone-input-2";
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import useValidation from '@/shared/model/hooks/useValidation';
import {passwordMessage, phoneMessage, pinMessage} from '@/shared/config/message';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "@/processes/firebaseConfig";
import useError from "@/shared/model/hooks/useError";
// import {apiCheckPassword} from "@/widgets/auth/api";
import {helperApiCheckPassword, helperApiRequestCode} from "@/widgets/auth/model/helpers";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {apiPasswordCheck} from "@/widgets/auth/api/password-check";
import {apiRequestCode} from "@/widgets/auth/api";
import {useSearchParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {$ENV_DEV} from "@/shared/lib/helpers";
import FormCode from '../form-code';

// import {uncoverResponse} from "@/shared/lib/helpers";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const PhoneInput = ReactPhoneInput.default ? ReactPhoneInput.default : ReactPhoneInput;

const FormLoginAccount = memo(() => {
    const {t} = useTranslation(); 
    const inputRef = useRef(null);
    const [params] = useSearchParams();
    const {md} = useContext(BreakpointsContext);
    const authMethod = params.get("authMethod");
    const {toggleStage, stage} = storyDisplayAuth(state => state);
    const [loading, setLoading] = useState<boolean>(false);
    const {phoneValidator, passwordValidator} = useValidation();

    const [
        localErrorHunter,
        localErrorSpan, ,
        localErrorClear
    ] = useError();

    const [, setSessionAuth] = useSessionStorage<TSessionAuth>("session-auth", {
        phone: "",
        sessionIdUAS: "",
        verificationId: ""
    });

    const [state, setState] = useState<{
        phone: string,
        password: string
    }>({
        phone: "",
        password: ""
    });

    const onFinish = () => {
        setLoading(true);
        const {password} = state;
        const phone = formatAsNumber(state.phone);

        apiPasswordCheck(phone, md5(`${password}_${phone}`))
            .then(res => helperApiCheckPassword(res)
                .success(() => {
                    onSingIn();
                }))
            .catch(err => {
                localErrorHunter(err);
                setLoading(false);
            });
    }

    const onSingInUAS = async () => {
        const {password} = state;
        const phone = formatAsNumber(state.phone);

        const response = await apiRequestCode(formatAsNumber(state.phone));

        helperApiRequestCode(response).success(() => {
            setSessionAuth(prev => ({
                ...prev,
                phone: state.phone,
                sessionIdUAS: response.data.sessid
            }));

            toggleStage("code", md5(`${password}_${phone}`));
        });
    }
    
    const onCaptchaVerify = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response: unknown) => {}
        });

        onSingIn();
    }
    
    const onSingIn = () => {
        localErrorClear();
        setLoading(true);

        if (!window.recaptchaVerifier) {
            onCaptchaVerify();
        } else {
            const {password} = state;
            const phone = formatAsNumber(state.phone);

            signInWithPhoneNumber(auth, "+" + formatAsNumber(state.phone), window.recaptchaVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;

                    setSessionAuth(prev => ({
                        ...prev,
                        phone: state.phone,
                        verificationId: confirmationResult.verificationId
                    }));

                    setLoading(false);
                    toggleStage("code", md5(`${password}_${phone}`));
                }).catch((error) => {
                setLoading(false);

                if (error.code === "auth/invalid-phone-number") {
                    localErrorHunter({code: 0, message: "Invalid phone number"})
                } else if (error.code === "auth/too-many-requests") {
                    onSingInUAS();
                    // localErrorHunter({code: 1, message: "You're seeing this error because of sending too many auth requests from or using one IP address for a given period of time"})
                }
                // else if (error.code === "auth/quota-exceeded") {
                    // onSingInUAS()
                    // localErrorHunter({code: 1, message: "Exceeded quota for updating account information."})
                // }
                // else if (error.code === "auth/invalid-verification-code") {
                //     localErrorHunter({code: 2, message: "Invalid verification code"})
                // }
            });
        }
    }

    const gekkardUrl = import.meta.env[`VITE_GEKKARD_URL_${import.meta.env.MODE}`];

    return <div>
        <p className="tyopography-b2" style={{
            color: 'var(--pale-blue)',
            marginBottom: '36px',

        }}>
            Log in using the form below
        </p>
        <div style={{
            background: 'var(--FFFFFF)',
            padding: '24px 36px 24px 36px',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 'var(--active-account-shadow)'
        }}>

        <Form autoComplete={"on"} onFinish={authMethod === 'UAS' ? onSingInUAS : onFinish}>
            <FormItem className="mb-2" label="Phone" id={"phoneNumber"} preserve
                    rules={[{required: true, ...phoneMessage}, phoneValidator]}>
                <PhoneInput
                    disableDropdown
                    inputProps={{
                        'data-testid': 'PhoneInput',
                        name: 'phone',
                        ref: inputRef,
                        type: "tel",
                    }}
                    disabled={loading}
                    label="phone"
                    placeholder={t("auth.enter_phone_number")}
                    value={state.phone}
                    onEnterKeyPress={(v: unknown) => onSingIn()}
                    onChange={(value: string) => setState(prevState =>
                        ({...prevState, phone: value}))}/>
            </FormItem>
            <span className="text-fs12 text-red-800">{localErrorSpan}</span>

            <FormItem name="password" label="Password"
                    rules={[{required: true, ...passwordMessage}, passwordValidator]}>
                <Input.Password style={{borderColor: 'var(--color-gray-400)'}}
                                disabled={loading}
                                onChange={({target}) => setState(prev => ({
                                    ...prev,
                                    password: target.value
                                }))}
                                data-testid="PIN"
                                placeholder={t("auth.password")}/>
            </FormItem>

            <div className="row text-right mb-4">
                {/*<a onClick={() => toggleStage("qr-code")} className="text-sm font-semibold text-blue-400">Forgot*/}
                {/*    your PIN? Log in with a QR code*/}
                {/*</a>*/}
            </div>


            {stage !== 'code' ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <button className='account-button' disabled={loading || state.phone.length < 11 || !/^\d{6}$/.test(state.password)} /// <- надо переделать потом
                                tabIndex={0}
                                data-testid="Login">{t("login")}
                        </button>

                        <button type='button' className='text-button'>
                            Forgot password
                        </button>
                    </div> : null 
            }
            </Form>

            {
            stage === 'code' ?
                <FormCode/>:
                null
            }

        
        </div>
    </div>
})

export default FormLoginAccount
