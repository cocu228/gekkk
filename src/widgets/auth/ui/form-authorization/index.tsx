import React, {memo, useState} from 'react';
import useMask from '@/shared/model/hooks/useMask';
import {MASK_PHONE} from '@/shared/config/mask';
import useValidation from '@/shared/model/hooks/useValidation';
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {passwordMessage, phoneMessage} from '@/shared/config/message';
import {Input} from 'antd';
import Button from '@/shared/ui/button/Button';
import {apiCheckPassword, apiRequestCode} from "@/widgets/auth/api";
import {randomId} from "@/shared/lib/helpers";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {S} from "@/pages/auth/ui";


export type sessionAuth = "session-auth"
const setSessionAuth = (sessionId: string, phone: string): void => {

    sessionStorage.setItem("session-auth", JSON.stringify({
        sessionId,
        phone: phone,
        currentTime: Date.now(),
        id: randomId()
    }));

}

const FormLoginAccount = memo(({handleView}: { handleView: (val: S) => void }) => {

    const {onInput} = useMask(MASK_PHONE);

    const [state, setState] = useState({
        phone: "",
        password: "",
        loading: false
    });

    const {phoneValidator, validationPassword} = useValidation();

    const onFinish = () => {

        const phone = formatAsNumber(state.phone)
        setState(prev => ({...prev, loading: true}))

        apiCheckPassword(phone, state.password).then(res => {

            if (res.data?.status === "ok") {

                apiRequestCode(phone).then(res => {

                    console.log(res)

                    if (res.data?.success) {

                        setSessionAuth(res.data.sessid, phone)

                        handleView("code")

                    } else {
                        setState(prev => ({...prev, loading: false}))
                    }
                }).catch(err => {
                    alert(err.response?.data?.errors[0]?.type)
                    setState(prev => ({...prev, loading: false}))
                })

            } else {
                setState(prev => ({...prev, loading: false}))
            }

        }).catch(err => {
            alert(err.response?.data?.errors[0]?.type)
            setState(prev => ({...prev, loading: false}))
        })
    }

    return <Form onFinish={onFinish}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Login to your
            account</h2>
        <FormItem className={"mb-2"} name="phone" label="Телефон" preserve
                  rules={[{required: true, ...phoneMessage}, phoneValidator]}>
            <Input type="tel"
                   placeholder="Phone number"
                   onInput={onInput}
                   onChange={({target}) => setState(prev => ({
                       ...prev,
                       phone: target.value
                   }))}
                   autoComplete="tel"
            />
        </FormItem>
        <FormItem name="password" label="Password"
                  rules={[{required: true, ...passwordMessage}, validationPassword]}>
            <Input.Password onChange={({target}) => setState(prev => ({
                ...prev,
                password: target.value
            }))} placeholder="Password"/>
        </FormItem>
        <div className="row text-right mb-9">
            <a className="text-sm text-blue-700 font-bold" href="#">Forgot
                password?</a>
        </div>
        <div className="row">
            <Button disabled={state.loading} htmlType="submit" className={"w-full disabled:opacity-5 !text-white"}>Login</Button>
        </div>
    </Form>
})

export default FormLoginAccount