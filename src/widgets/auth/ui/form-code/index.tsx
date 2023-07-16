import React, {memo, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
    const [timeLeft, setTimeLeft] = useState(180);

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
                                        () => {
                                            toggleStage("authorization");
                                            login(phone, res.data.token)
                                        })
                                ).catch(e => {
                                console.log(e)
                            })
                        }).reject((v) => {
                    console.log(res)
                })
            )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (timeLeft <= 0) toggleStage("authorization");

    return <Form onFinish={onFinish}>
        <h1 className={`font-extrabold text-center text-gray-600 min-w-[336px] pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>One-time code</h1>
        <p className='text-center mb-9 text-gray-500'>
            SMS with one-time code was sent to
            <br/>
            <b>+{phone}</b>
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

        <div className="row text-right -mt-1 mb-12 text-gray-400">
            You can use the code for {timeLeft} seconds
        </div>

        <div className="row">
            <Button tabIndex={0} disabled={loading || code === ""} className={"w-full"} size={"lg"}
                    htmlType="submit">Next</Button>
        </div>
    </Form>
})

export default FormCode
