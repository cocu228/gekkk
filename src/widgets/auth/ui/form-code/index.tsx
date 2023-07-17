import {Input} from 'antd';
import Form from '@/shared/ui/form/Form';
import {useSessionStorage} from "usehooks-ts";
import {apiSignIn} from "@/widgets/auth/api/";
import Button from '@/shared/ui/button/Button';
import {MASK_CODE} from '@/shared/config/mask';
import {apiRequestCode} from "@/widgets/auth/api";
import useMask from '@/shared/model/hooks/useMask';
import {useAuth} from "@/app/providers/AuthRouter";
import {codeMessage} from '@/shared/config/message';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayStage} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {helperApiRequestCode, helperApiSignIn} from "@/widgets/auth/model/helpers";
import {memo, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';

const FormCode = memo(() => {
    const {login} = useAuth();
    const inputRef = useRef(null);
    const {onInput} = useMask(MASK_CODE);
    const [code, setCode] = useState("");
    const {md} = useContext(BreakpointsContext);
    const [timerOn, setTimerOn] = useState(true);
    const [timeLeft, setTimeLeft] = useState(180);
    const [loading, setLoading] = useState<boolean>(false);
    const {toggleStage} = storyDisplayStage(state => state);
    const [, setSessionGlobal] = useSessionStorage("session-global", {});
    const [{phone, sessionId}] = useSessionStorage("session-auth", {phone: "", sessionId: ""});

    useLayoutEffect(() => {
        inputRef.current.focus();
    }, []);
    
    const onFinish = () => {
        setLoading(true);

        apiRequestCode(phone, formatAsNumber(code), sessionId)
            .then(res => helperApiRequestCode(res)
                .success(() => {
                    setSessionGlobal({sessionId: res.data.sessid})
                    apiSignIn(formatAsNumber(code), sessionId, phone)
                        .then(res => helperApiSignIn(res)
                            .success(() => {
                                toggleStage("authorization");
                                login(phone, res.data.token);
                            })
                        ).catch(e => {
                            console.log(e);
                        });
                    })
                .reject(v => {
                    console.log(res);
                })
            )
    }

    useEffect(() => {
        let interval;
        if (timerOn) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            setTimerOn(false);
        }

        return () => clearInterval(interval);
    }, [timerOn, timeLeft]);

    const restartTimer = () => {
        apiRequestCode(phone);
        setTimeLeft(180);
        setTimerOn(true);
    };

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
            {timeLeft !== 0 ? (
                <span>You can use the code for {timeLeft} seconds</span>
            ) : (
                <a onClick={restartTimer} className='underline'>Resend code</a>
            )}
        </div>

        <div className="row">
            <Button tabIndex={0} disabled={loading || code === ""} className={"w-full"} size={"lg"}
                    htmlType="submit">Next</Button>
        </div>
    </Form>
});

export default FormCode;
