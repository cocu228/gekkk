import React, {memo, useContext, useState} from 'react';
import useMask from '@/shared/model/hooks/useMask';
import {MASK_CODE} from '@/shared/config/mask';
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from '@/shared/config/message';
import {Input} from 'antd';
import Button from '@/shared/ui/button/Button';
import {S} from "@/pages/auth";
import {apiRequestCode} from "@/widgets/auth/api";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {useAuth} from "@/app/providers/AuthRouter";
import {useSessionStorage} from "usehooks-ts";
import {apiSignIn} from "@/widgets/auth/api/";
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';


type TProps = {
    handleView: (val: S) => void;
}

const sessionKey = "session-auth"

const FormCode = memo(({handleView}: TProps) => {

    const {login} = useAuth();

    const {md} = useContext(BreakpointsContext);

    const {onInput} = useMask(MASK_CODE);

    const [state, setState] = useState({
        code: "",
        loading: false
    });

    const [{phone, sessionId}] = useSessionStorage("session-auth", {phone: "", sessionId: ""});
    const [, setSessionGlobal] = useSessionStorage("session-global", {});

    const onBack = () => handleView("authorization");

    const onFinish = () => {

        setState(prev => ({...prev, loading: true}));

        apiRequestCode(phone, formatAsNumber(state.code), sessionId).then(async res => {

            if (res.data?.success) {


                setSessionGlobal({sessionId: res.data.sessid})

                await apiSignIn(formatAsNumber(state.code), sessionId, phone).then(async (res) => {

                    if (res.data.errors) throw new Error(res.data.errors[0].message)

                    login(phone, res.data.token)

                }).catch(e => {

                    alert(e);
                    setState(prev => ({...prev, loading: false}));
                    onBack();
                    console.warn(e);

                })

            } else {
                setState(prev => ({...prev, loading: false}));
            }

        });
    }

    return <Form onFinish={onFinish}>
        <h1 className={`font-extrabold text-center text-gray-600 pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>One-time code</h1>
        <p className='text-center mb-9 text-gray-500'>
            SMS with one-time code was sent to
            <br/>
            <b>
                {phone}
            </b>
        </p>

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
            <a onClick={onBack} className="text-sm text-gray-500 underline">
                Re-send one-time code again
            </a>
        </div>
        
        <div className="row">
            <Button tabIndex={0} disabled={state.loading} htmlType="submit" className={"w-full disabled:opacity-5"}>Next</Button>
        </div>
    </Form>
})

export default FormCode
