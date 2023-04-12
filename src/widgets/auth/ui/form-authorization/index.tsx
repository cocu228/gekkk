import React, {memo, useContext, useLayoutEffect, useRef, useState} from 'react';
import useValidation from '@/shared/model/hooks/useValidation';
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {passwordMessage, phoneMessage} from '@/shared/config/message';
import {Input} from 'antd';
import Button from '@/shared/ui/button/Button';
import {apiCheckPassword, apiRequestCode} from "@/widgets/auth/api";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {S} from "@/pages/auth";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {useSessionStorage} from "usehooks-ts";
import {APP_STORE_GEKKARD, GOOGLE_PLAY_GEKKARD} from "../../model/healpers";

import ReactPhoneInput from "react-phone-input-2";
import '@styles/(cs)react-phone-input.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = ReactPhoneInput.default ? ReactPhoneInput.default : ReactPhoneInput;



const FormLoginAccount = memo(({handleView}: { handleView: (val: S) => void }) => {

    const {md} = useContext(BreakpointsContext);
    // const ref = useRef(null)

    const [state, setState] = useState({
        phone: "",
        password: "",
        loading: false
    });

    useLayoutEffect(() => {
        // ref.current.focus()
    }, [])

    const {phoneValidator, validationPassword} = useValidation();

    const [, setSessionAuth] = useSessionStorage("session-auth", {phone: "", sessionId: "", currentTime: new Date()})
    const onFinish = () => {

        const phone = formatAsNumber(state.phone)
        setState(prev => ({...prev, loading: true}))

        apiCheckPassword(phone, state.password).then(res => {

            if (res.data?.status === "ok") {

                apiRequestCode(phone).then(res => {
                    if (res.data?.success) {
                        setSessionAuth({sessionId: res.data.sessid, phone, currentTime: new Date()})
                        handleView("code")
                    } else {
                        setState(prev => ({...prev, loading: false}))
                    }
                }).catch(err => {
                    // alert(err.response?.data?.errors[0]?.type)
                    setState(prev => ({...prev, loading: false}))
                })

            } else {
                setState(prev => ({...prev, loading: false}))
            }

        }).catch(err => {
            // alert(err.response?.data?.errors[0]?.type)
            setState(prev => ({...prev, loading: false}))
        })
    }

    //

    return <Form onFinish={onFinish}>
        <h1 className={`font-extrabold text-center text-gray-600 pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>
            Login to your account
        </h1>

        <p className='text-center mb-9 text-gray-500'>
            Login to your personal account is carried out through the
            <a
                className='font-inherit underline'
                href={APP_STORE_GEKKARD}
                target={'_blank'}> Gekkard application
            </a> credentials
        </p>


        <FormItem className="mb-2" name="phone" label="Телефон" preserve
                  rules={[{required: true, ...phoneMessage}, phoneValidator]}>
            <PhoneInput
                // inputProps={{ref: ref}}
                disableDropdown
                placeholder="Enter phone number"
                value={state.phone}
                onChange={(value) => setState(prevState =>
                    ({...prevState, phone: value}))}/>
        </FormItem>

        <FormItem name="password" label="Password"
                  rules={[{required: true, ...passwordMessage}, validationPassword]}>
            <Input.Password onChange={({target}) => setState(prev => ({
                ...prev,
                password: target.value
            }))} placeholder="Password"/>
        </FormItem>

        <div className="row text-right mb-4">
            <a onClick={() => handleView("qr-code")} className="text-sm font-semibold text-blue-400">Forgot
                your PIN? Log in with a QR code
            </a>
        </div>

        <div className="row mb-8">
            <Button disabled={state.loading} tabIndex={0} htmlType="submit"
                    className="w-full">Login</Button>
        </div>

        <div className='text-center'>
            <p className='text-gray-600 mb-6'>No Gekkard credentials? Download the app and register:</p>

            <ul className='flex justify-center gap-4'>
                <li>
                    <a href={GOOGLE_PLAY_GEKKARD} target={"_blank"}>
                        <img
                            src='/img/google-play.svg'
                            height="40px"
                            alt="Google play"
                        />
                    </a>
                </li>

                <li>
                    <a href={APP_STORE_GEKKARD} target={"_blank"}>
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
