import Form from '@/shared/ui/form/Form';
import Input from "@/shared/ui/input/Input";
import {useSessionStorage} from "usehooks-ts";
import Button from '@/shared/ui/button/Button';
import {MASK_CODE} from '@/shared/config/mask';
import useMask from '@/shared/model/hooks/useMask';
import {useAuth} from "@/app/providers/AuthRouter";
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {memo, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import useError from "@/shared/model/hooks/useError";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {PhoneAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from "@/processes/firebaseConfig";
import {ReSendCode} from "@/widgets/auth/ui/form-code/ReSendCode";
import {apiPasswordVerify, apiSignIn} from "@/widgets/auth/api";
import {helperApiSignIn, helperApiVerifyPassword} from "@/widgets/auth/model/helpers";
import {useForm} from "antd/es/form/Form";
import {useTranslation} from 'react-i18next';

declare module 'firebase/auth' {
    interface User {
        accessToken: string;
    }
}

const FormCode = memo(() => {
    const [form] = useForm();
    const {login} = useAuth();
    const {t} = useTranslation();
    const inputRef = useRef(null);
    const {onInput} = useMask(MASK_CODE);
    const [code, setCode] = useState("");
    const {md} = useContext(BreakpointsContext);
    const [loading, setLoading] = useState<boolean>(false);
    const {toggleStage, data} = storyDisplayAuth(state => state);

    const [
        localErrorHunter,
        localErrorSpan, ,
        localErrorClear
    ] = useError();
    
    const [{
        phone,
        verificationId,
        sessionIdUAS
    }, ] = useSessionStorage<TSessionAuth>("session-auth", {
        phone: "",
        sessionIdUAS: "",
        verificationId: ""
    });

    useLayoutEffect(() => {
        inputRef.current.focus();
    }, []);

    const onChange = (str: string) => {
        localErrorClear();
        setCode(str);
    }

    const onCode = () => {
        setLoading(true);

        signInWithCredential(auth, PhoneAuthProvider.credential(
            verificationId,
            formatAsNumber(code)
        )).then(async (result) => {
            const user = result.user;

            const response = await apiPasswordVerify(
                phone,
                data,
                user.accessToken,
                "token-firebase"
            );

            helperApiVerifyPassword(response).success(() => {
                const user = result.user;

                toggleStage("authorization");
                sessionStorage.removeItem("session-auth");
                login(user.phoneNumber, user.accessToken, "token-firebase", user.refreshToken);
            }).reject((e) => {
                toggleStage("authorization");
                sessionStorage.removeItem("session-auth");
            });
        }).catch(error => {
            form.resetFields();
            setLoading(false);
            if (error.code === "auth/code-expired") {
                localErrorHunter({code: 0, message: "This code has expired"});
            } else if (error.code === "auth/invalid-verification-code") {
                localErrorHunter({code: 1, message: "Invalid code. Try again"});
            }
        })
    }

    const onCodeUAS = async () => {
        const _phone = formatAsNumber(phone);

        setLoading(true);

        // apiRequestCode(_phone, formatAsNumber(code), sessionIdUAS)
        //     .then(res => helperApiRequestCode(res)
        //         .success(() => {
        apiSignIn(formatAsNumber(code), sessionIdUAS, _phone)
                        .then(res => helperApiSignIn(res)
                            .success(async () => {
                                sessionStorage.removeItem("session-auth");
                                // const response = await apiPasswordVerify(_phone, data)
                                //
                                login(_phone, res.data.token, "token");
                                toggleStage("authorization");

                            }))
                        .catch(e => {
                            localErrorHunter(e)
                            setLoading(false);
                        });
        // })
        //         .reject(e => {
        //             localErrorHunter(e)
        //             setLoading(false);
        //         })
        //     ).catch(e => {
        //     localErrorHunter(e)
        //     setLoading(false);
        // })
    }
    
    return <Form form={form} autoComplete="off" onFinish={sessionIdUAS === "" ? onCode : onCodeUAS}>
        <h1 className={`font-extrabold text-center text-gray-600 pb-4
                ${md ? 'text-2xl' : 'text-header min-w-[436px]'}`}>{t("one-time code")}</h1>
        <p className='text-center mb-9 text-gray-500'>
            {t("sms_code_sent")}
            <br/>
            <b>+{phone}</b>
        </p>
        
        <FormItem name="code" label="Code" preserve >
            <Input type="text"
                   ref={inputRef}
                   data-testid="PhoneCode"
                   placeholder={t("phone_code")}
                   onInput={onInput}
                   onChange={({target}) => onChange(target.value)}
            />
        </FormItem>

        <div className="row w-full">
            <div className="col">
                <span className="text-red-800">{localErrorSpan}</span>
            </div>
        </div>
        
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
                data-testid='Next'
                disabled={loading || code.length < 11} 
            >{t("next")}</Button>
        </div>
        <a
            className='flex mt-2 justify-center underline text-gray-400 hover:text-blue-400'
            onClick={() => {
                sessionStorage.removeItem("session-auth")
                toggleStage('authorization')
            }}
        >{t("back_to_login_page")}</a>    
    </Form>
});


export default FormCode;
