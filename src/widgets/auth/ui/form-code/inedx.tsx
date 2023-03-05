import React, {memo, useState} from 'react';
import useMask from '@/shared/model/hooks/useMask';
import {MASK_CODE} from '@/shared/config/mask';
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from '@/shared/config/message';
import {Input} from 'antd';
import Button from '@/shared/ui/button/Button';
import {S} from "@/pages/auth/ui";
import {apiRequestCode} from "@/widgets/auth/api";
import {formatAsNumber} from "@/shared/lib/formatting-helper";


const FormCode = memo(({handleView}: {
    handleView: (val: S) => void
}) => {

    const {onInput} = useMask(MASK_CODE);

    const [state, setState] = useState({
        code: "",
        loading: false
    });


    const onBack = () => handleView("authorization")

    const onFinish = () => {
        setState(prev => ({...prev, loading: true}))

        const {sessionId, phone} = JSON.parse(sessionStorage.getItem("session-auth") || "")

        apiRequestCode(phone, formatAsNumber(state.code), sessionId).then(res => {
            console.log(res)
            if (res.data?.success) {
                sessionStorage.setItem("session-global", JSON.stringify({
                    sessionId: res.data.sessid
                }))

                window.location.href = "/dashboard"
            }

        })
    }

    return <Form onFinish={onFinish}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Send code</h2>
        <FormItem className={"mb-2"} name="code" label="Code" preserve
                  rules={[{required: true, ...codeMessage}]}>
            <Input type="text"
                   placeholder="Phone code"
                   onInput={onInput}
                   onChange={({target}) => setState(prev => ({
                       ...prev,
                       code: target.value
                   }))}
                   autoComplete="off"
            />
        </FormItem>
        <div className="row text-right mb-9">
            <button onClick={onBack} className="text-sm text-gekLinkBlue font-bold">Back to the input of the number
            </button>
        </div>
        <div className="row">
            <Button disabled={state.loading} htmlType="submit" className={"w-full disabled:opacity-5"}>Send</Button>
        </div>
    </Form>
})

export default FormCode