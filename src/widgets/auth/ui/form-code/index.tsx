import {Input} from 'antd';
import Form from '@/shared/ui/form/Form';
import {useSessionStorage} from "usehooks-ts";
// import {apiSignIn} from "@/widgets/auth/api/";
import Button from '@/shared/ui/button/Button';
import {MASK_CODE} from '@/shared/config/mask';
// import {apiRequestCode} from "@/widgets/auth/api";
import useMask from '@/shared/model/hooks/useMask';
import {useAuth} from "@/app/providers/AuthRouter";
import {codeMessage} from '@/shared/config/message';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayStage} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
// import {helperApiRequestCode, helperApiSignIn} from "@/widgets/auth/model/helpers";
import {memo, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import useError from "@/shared/model/hooks/useError";
import {timer} from "@/widgets/auth/model/helpers";
import Decimal from "decimal.js";
import {TSessionAuth} from "@/widgets/auth/model/types";
// import firebase from "firebase/compat";
// import User = firebase.User;
import {PhoneAuthProvider, signInWithCredential, signInWithPhoneNumber} from 'firebase/auth';

import {auth} from "@/processes/firebaseConfig";
import {ReSendCode} from "@/widgets/auth/ui/form-code/ReSendCode";


declare module 'firebase/auth' {
    interface User {
        accessToken: string;
    }

}

// TODO: Добавить отображение сообщения об ошибке
const FormCode = memo(() => {

    const {login} = useAuth();
    const inputRef = useRef(null);
    const {onInput} = useMask(MASK_CODE);
    const [code, setCode] = useState("");
    const {md} = useContext(BreakpointsContext);
    const [loading, setLoading] = useState<boolean>(false);
    const {toggleStage} = storyDisplayStage(state => state);

    const [{
        phone,
        secondaryForTimer,
        verificationId
    }, setSessionGlobal] = useSessionStorage<TSessionAuth>("session-auth",
        {phone: "", secondaryForTimer: 0, verificationId: ""}
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
        )).then((result) => {

            const user = result.user;
            login(user.phoneNumber, user.accessToken, "token-firebase")
            sessionStorage.removeItem("session-auth")
            toggleStage("authorization")


        }).catch(error => {
            console.log(JSON.stringify(error))
            if (error.code === "auth/code-expired") {
                localErrorHunter({code: 0, message: "This code has expired"})
            } else if (error.code === "auth/invalid-verification-code") {
                localErrorHunter({code: 1, message: "Invalid verification code"})
            }
        })
    }

    return <Form autoComplete="off" onFinish={onCode}>
        <h1 className={`font-extrabold text-center text-gray-600 min-w-[436px] pb-4
                ${md ? 'text-2xl' : 'text-header'}`}>One-time code</h1>
        <p className='text-center mb-9 text-gray-500'>
            SMS with one-time code was sent to
            <br/>
            <b>+{phone}</b>
        </p>

        <FormItem name="code" label="Code" preserve
                  rules={[{required: true, ...codeMessage}]}>
            <Input type="text"
                   ref={inputRef}
                   placeholder="Phone code"
                   onInput={onInput}
                   onChange={({target}) => onChange(target.value)}
            />
        </FormItem>
        {localErrorSpan}
        <ReSendCode/>


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
