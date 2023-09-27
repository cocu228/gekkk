// import md5 from 'md5';
import {Input} from 'antd';
import Form from '@/shared/ui/form/Form';
import '@styles/(cs)react-phone-input.scss';
import {useSessionStorage} from "usehooks-ts";
import Button from '@/shared/ui/button/Button';
import md5 from 'md5';
import {memo, useContext, useRef, useState} from 'react';
import ReactPhoneInput from "react-phone-input-2";
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayStage} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import useValidation from '@/shared/model/hooks/useValidation';
import {phoneMessage, pinMessage} from '@/shared/config/message';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "@/processes/firebaseConfig";
import useError from "@/shared/model/hooks/useError";
// import {apiCheckPassword} from "@/widgets/auth/api";
import {helperApiCheckPassword} from "@/widgets/auth/model/helpers";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {apiPasswordCheck} from "@/widgets/auth/api/password-check";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = ReactPhoneInput.default ? ReactPhoneInput.default : ReactPhoneInput;


const FormLoginAccount = memo(() => {

    const {toggleStage} = storyDisplayStage(state => state)
    const {md} = useContext(BreakpointsContext)
    const {phoneValidator, pinValidator} = useValidation()
    const inputRef = useRef(null)
    const [, setSessionAuth] = useSessionStorage<TSessionAuth>("session-auth",
        {phone: "", dateTimeStart: null, verificationId: ""})
    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError] = useError()

    const [state, setState] = useState<{
        phone: string,
        password: string
    }>({
        phone: "",
        password: ""
    });

    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = () => {

        const {password} = state
        const phone = formatAsNumber(state.phone)

        setLoading(true)

        onSingIn()

        // apiPasswordCheck(phone, md5(`${password}_${phone}`))
        //     .then(res => helperApiCheckPassword(res)
        //         .success(() => onSingIn()))
        //     .catch(err => {
        //         setLoading(false)
        //     })
    }
    const onCaptchaVerify = () => {

        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response: unknown) => {

            }
            });

        onSingIn()

    }
    const onSingIn = () => {

        localErrorClear()

        setLoading(true)


        if (!window.recaptchaVerifier) {

            onCaptchaVerify()

        } else {

            signInWithPhoneNumber(auth, "+" + formatAsNumber(state.phone), window.recaptchaVerifier)
                .then((confirmationResult) => {

                    window.confirmationResult = confirmationResult;

                    setSessionAuth(prev => ({
                        ...prev,
                        phone: state.phone,
                        verificationId: confirmationResult.verificationId
                    }))

                    setLoading(false)
                    toggleStage("code")

                }).catch((error) => {

                console.log(JSON.stringify(error))

                setLoading(false)

                if (error.code === "auth/invalid-phone-number") {
                    localErrorHunter({code: 0, message: "Invalid phone number"})
                } else if (error.code === "auth/too-many-requests") {
                    localErrorHunter({code: 1, message: "You're seeing this error because of sending too many auth requests from or using one IP address for a given period of time"})
                } else if (error.code === "auth/quota-exceeded") {
                    localErrorHunter({code: 1, message: "Exceeded quota for updating account information."})
                } else if (error.code === "auth/invalid-verification-code") {
                    localErrorHunter({code: 2, message: "Invalid verification code"})
                }
            });
        }
    }

    const gekkardUrl = import.meta.env[`VITE_GEKKARD_URL_${import.meta.env.MODE}`];

    return <Form autoComplete={"on"} onFinish={onFinish}>
        <h1 className={`font-extrabold text-center text-gray-600 pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>
            Login to your account
        </h1>

        <p className='text-center mb-9 text-gray-500'>
            Login to your personal account is carried out through the <a
                className='font-inherit underline'
                href={import.meta.env.VITE_APP_STORE_GEKKARD}
                target={'_blank'}>Gekkard application
            </a> credentials
        </p>

        <FormItem className="mb-2" label="Phone" id={"phoneNumber"} preserve
                  rules={[{required: true, ...phoneMessage}, phoneValidator]}>
            <PhoneInput
                disableDropdown
                inputProps={{
                    name: 'phone',
                    ref: inputRef,
                    type: "tel"
                }}
                disabled={loading}
                placeholder="Enter phone number"
                value={state.phone}
                onEnterKeyPress={(v: unknown) => onSingIn()}
                onChange={(value: string) => setState(prevState =>
                    ({...prevState, phone: value}))}/>
        </FormItem>
        {localErrorSpan}

        <FormItem name="password" label="Password"
                  rules={[{required: true, ...pinMessage}, pinValidator]}>
            <Input.Password style={{borderColor: 'var(--color-gray-400)'}}
                            disabled={loading}
                            onChange={({target}) => setState(prev => ({
                                ...prev,
                                password: target.value
                            }))}
                            placeholder="PIN"/>
        </FormItem>

        <div className="row text-right mb-4">
            {/*<a onClick={() => toggleStage("qr-code")} className="text-sm font-semibold text-blue-400">Forgot*/}
            {/*    your PIN? Log in with a QR code*/}
            {/*</a>*/}
        </div>

        <div className="row mb-8">
            <Button disabled={loading || state.phone === ""}
                    tabIndex={0}
                    htmlType="submit"
                    className="w-full">Login</Button>
        </div>

        <div className='text-center'>
            <p className='text-gray-600 mb-6'>No Gekkard credentials? Download the app and register:</p>

            <ul className='flex justify-center gap-4'>
                <li>
                    <div className='grid gap-y-2'>
                        <a href={import.meta.env.VITE_GOOGLE_PLAY_GEKKARD} target={"_blank"}>
                            <img
                                src='/img/google-play.svg'
                                height="40px"
                                alt="Google play"
                            />
                        </a>

                        <a href={`${gekkardUrl ?? 'https://dev.gekkard.com'}/app-release.apk`}
                           className='underline hover:no-underline text-sm hover:text-blue-400 text-gray-500'>
                            Download
                        </a>
                    </div>
                </li>

                <li>
                    <a href={import.meta.env.VITE_APP_STORE_GEKKARD} target={"_blank"}>
                        <img
                            src='/img/app-store.svg'
                            height="40px"
                            alt="App store"
                        />
                    </a>
                </li>
            </ul>
        </div>
    </Form>
})

export default FormLoginAccount
