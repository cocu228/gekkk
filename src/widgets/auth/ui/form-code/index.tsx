import React, {memo, useContext, useLayoutEffect, useRef, useState} from 'react';
import useMask from '@/shared/model/hooks/useMask';
import {MASK_CODE} from '@/shared/config/mask';
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from '@/shared/config/message';
import {Input} from 'antd';
import Button from '@/shared/ui/button/Button';
import {apiRequestCode} from "@/widgets/auth/api";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {useAuth} from "@/app/providers/AuthRouter";
import {useSessionStorage} from "usehooks-ts";
import {apiSignIn} from "@/widgets/auth/api/";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {storyDisplayStage} from "@/widgets/auth/model/story";
import {helperApiRequestCode, helperApiSignIn} from "@/widgets/auth/model/helpers";


const FormCode = memo(() => {

    const {toggleStage} = storyDisplayStage(state => state);
    const {login} = useAuth();
    const inputRef = useRef(null)
    const {md} = useContext(BreakpointsContext);
    const {onInput} = useMask(MASK_CODE);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [{phone, sessionId}] = useSessionStorage("session-auth", {phone: "", sessionId: ""});
    const [, setSessionGlobal] = useSessionStorage("session-global", {});


    useLayoutEffect(() => {
        inputRef.current.focus();
    }, [])
    const onFinish = () => {

        setLoading(true);

        apiRequestCode(phone, formatAsNumber(code), sessionId)
            .then(res =>
                helperApiRequestCode(res)
                    .success(
                        () => {
                            setSessionGlobal({sessionId: res.data.sessid})
                            apiSignIn(formatAsNumber(code), sessionId, phone)
                                .then(res => helperApiSignIn(res)
                                    .success(
                                        () => login(phone, res.data.token))
                                ).catch(e => {
                                toggleStage("authorization");
                            })
                        })
            )
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
                   ref={inputRef}
                   placeholder="Phone code"
                   onInput={onInput}
                   onChange={({target}) => setCode(target.value)}
                   autoComplete="off"
            />
        </FormItem>

        <div className="row text-right mb-9">
            <a onClick={() => toggleStage("authorization")} className="text-sm text-gray-500 underline">
                Re-send one-time code again
            </a>
        </div>

        <div className="row">
            <Button tabIndex={0} disabled={loading || code === ""} className={"w-full"} size={"lg"}
                    htmlType="submit">Next</Button>
        </div>
    </Form>
})

export default FormCode
