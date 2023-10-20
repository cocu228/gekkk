import Form from '@/shared/ui/form/Form';
import Input from "@/shared/ui/input/Input";
import {useSessionStorage} from "usehooks-ts";
// import {apiSignIn} from "@/widgets/auth/api/";
import Button from '@/shared/ui/button/Button';
import {MASK_CODE} from '@/shared/config/mask';
// import {apiRequestCode} from "@/widgets/auth/api";
import useMask from '@/shared/model/hooks/useMask';
import {useAuth} from "@/app/providers/AuthRouter";
import {codeMessage} from '@/shared/config/message';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
// import {helperApiRequestCode, helperApiSignIn} from "@/widgets/auth/model/helpers";
import {memo, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import useError from "@/shared/model/hooks/useError";
// import Decimal from "decimal.js";
import {TSessionAuth} from "@/widgets/auth/model/types";
// import firebase from "firebase/compat";
// import User = firebase.User;
import {PhoneAuthProvider, signInWithCredential} from 'firebase/auth';

import {auth} from "@/processes/firebaseConfig";
import {ReSendCode} from "@/widgets/auth/ui/form-code/ReSendCode";
import {apiPasswordVerify, apiRequestCode, apiSignIn, apiTokenHash} from "@/widgets/auth/api";
import {helperApiRequestCode, helperApiSignIn, helperApiVerifyPassword} from "@/widgets/auth/model/helpers";
import {actionResSuccess, uncoverArray} from "@/shared/lib/helpers";
import {useForm} from "antd/es/form/Form";
import {AxiosResponse} from "axios";


declare module 'firebase/auth' {
    interface User {
        accessToken: string;
    }

}

const FormCode = memo(() => {

    const {login} = useAuth();
    const [form] = useForm();
    const inputRef = useRef(null);
    const {onInput} = useMask(MASK_CODE);
    const [code, setCode] = useState("");
    const {md} = useContext(BreakpointsContext);
    const [loading, setLoading] = useState<boolean>(false);
    const {toggleStage, data} = storyDisplayAuth(state => state);

    const [{
        phone,
        verificationId,
        sessionIdUAS
    }, ] = useSessionStorage<TSessionAuth>("session-auth",
        {phone: "", verificationId: "", sessionIdUAS: ""}
    );

    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError] = useError()

    useLayoutEffect(() => {
        inputRef.current.focus();
    }, []);

    const onChange = (str: string) => {
        localErrorClear()
        setCode(str)
    }

    const onCode = () => {
        signInWithCredential(auth, PhoneAuthProvider.credential(
            verificationId,
            formatAsNumber(code)
        )).then(async (result) => {

            const user = result.user;

            const response =
                await apiPasswordVerify(phone, data, user.accessToken, "token-firebase")

            helperApiVerifyPassword(response).success(() => {

                const user = result.user;

                toggleStage("authorization");
                sessionStorage.removeItem("session-auth");
                login(user.phoneNumber, user.accessToken, "token-firebase", user.refreshToken);

            }).reject((e) => {
                toggleStage("authorization");
                sessionStorage.removeItem("session-auth");
            })
        }).catch(error => {
            form.resetFields();

            if (error.code === "auth/code-expired") {
                localErrorHunter({code: 0, message: "This code has expired"});
            } else if (error.code === "auth/invalid-verification-code") {
                localErrorHunter({code: 1, message: "Invalid code. Try again"});
            }
        })
    }

    const onCodeUAS = async () => {
        const _phone = formatAsNumber(phone)
        
        apiRequestCode(_phone, formatAsNumber(code), sessionIdUAS)
            .then(res => helperApiRequestCode(res)
                .success(() => {
                    apiSignIn(formatAsNumber(code), res.data.sessid, _phone)
                        .then(res => helperApiSignIn(res)
                            .success(async () => {
                                sessionStorage.removeItem("session-auth");
                                // const response = await apiPasswordVerify(_phone, data)
                                //
                                login(_phone, res.data.token, "token");
                                toggleStage("authorization");

                            }))
                        .catch(e => {
                            setLoading(false);
                        });
                })
                .reject((response: AxiosResponse) => {
                    localErrorHunter({
                        code: uncoverArray<{ code: number }>(response.data.errors).code,
                        message: uncoverArray<{ message: string }>(response.data.errors).message
                    })
                    setLoading(false);
                })
            ).catch(e => {
            setLoading(false);
        })
    }
    
    return <Form form={form} autoComplete="off" onFinish={sessionIdUAS === "" ? onCode : onCodeUAS}>
        <h1 className={`font-extrabold text-center text-gray-600 min-w-[436px] pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>One-time code</h1>
        <p className='text-center mb-9 text-gray-500'>
            SMS with one-time code was sent to
            <br/>
            <b>+{phone}</b>
        </p>
        
        <FormItem name="code" label="Code" preserve >
            <Input type="text"
                   ref={inputRef}
                   placeholder="Phone code"
                   onInput={onInput}
                   onChange={({target}) => onChange(target.value)}
            />
        </FormItem>
        
        <span className="text-red-800">{localErrorSpan}</span>
        
        <div className={`row text-right ${localErrorSpan ? '-mt-[26px]' : '-mt-2'} text-gray-400`}>
            <ReSendCode isUAS={sessionIdUAS !== ""}/>
        </div>
        
        {/*<div className="row text-right -mt-1 mb-12 text-gray-400">*/}
        {/*    {timeLeft !== 0 ? (*/}
        {/*        <span>You can use the code for {timeLeft} seconds</span>*/}
        {/*    ) : (*/}
        {/*        <a onClick={restartTimer} className='underline hover:text-blue-400'>Resend code</a>*/}
        {/*    )}*/}
        {/*</div>*/}
        
        <div className="row mt-2">
            <Button
                size='lg'
                tabIndex={0}
                htmlType='submit'
                className='w-full'
                disabled={loading || code === ''}
            >Next</Button>
        </div>
        <a
            className='flex mt-2 justify-center underline text-gray-400 hover:text-blue-400'
            onClick={() => {
                sessionStorage.removeItem("session-auth")
                toggleStage('authorization')
            }}
        >← Back to login page</a>    
    </Form>
});


export default FormCode;
