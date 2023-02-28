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


const setSessionId = (id: string, phone: string): void => {

    sessionStorage.setItem("sessid", JSON.stringify({
        sessid: id,
        phone: phone,
        currentTime: Date.now(),
        id: randomId()
    }));

}

const FormLoginAccount = memo(() => {

    const {onInput} = useMask(MASK_PHONE);

    const [state, setState] = useState({
        phone: "",
        password: "",
        sessionId: null
    });

    const {phoneValidator, validationPassword} = useValidation();

    const onFinish = () => {

        apiCheckPassword(state.phone, state.password).then(res => {
            console.log(res)
            console.log("res?.data?.status")
            console.log(res?.data?.status)
            console.log("res?.data?.data?.status")
            console.log(res?.data?.data?.status)

            if (res?.data?.status === "ok") {

                apiRequestCode(state.phone).then(res => {
                    console.log(res)
                    console.log("res?.data?.success")
                    console.log(res?.data?.success)
                    console.log("res?.data?.data?.success")
                    console.log(res?.data?.data?.success)
                    if (res?.data?.success) {
                        setSessionId(res?.data?.sessid, state.phone)
                        setState(prev => ({
                            ...prev,
                            sessionId: res?.data?.sessid
                        }))
                    }
                })

            }

        })
    }


    console.log(state)

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
            <Button htmlType="submit" className={"w-full"}>Login</Button>
        </div>
    </Form>
})

export default FormLoginAccount