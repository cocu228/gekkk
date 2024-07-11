import styles from './style.module.css';
import Button from "../components/button/Button";
import {useRef, useState} from "preact/hooks";
import {RegisterDeviceKey, ResetPass} from '../../shared';
import Form from '../components/form';
import TextInput from '../components/textInput';
import CheckList from '../components/checklist';
import PasswordInput from '../components/passwordInput';
import {RegisterOptions} from '../../shared/apiInterfaces';
import Swal from 'sweetalert2';

interface IParams {
    handleCancel: () => void;
    emailCodeDefault?: string;
}

export const ChangePasswordForm = ({emailCodeDefault, handleCancel}: IParams) => {
    const [smsCode, setSmsCode] = useState('');
    const inputRef = useRef<HTMLInputElement>();
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState(null);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [smsSended, setSmsSended] = useState<boolean>(false);
    const [emailCode, setEmailCode] = useState<string>(emailCodeDefault);

    const [isGekkey, setIsGekkey] = useState<boolean>(false);
    const checkHandler = () => {setIsGekkey(!isGekkey)};

    const onSubmit = async () => {
        if (!smsSended) {
            setLoading(true);
            let response = await RegisterOptions(emailCode);
            
            if (response.result?.fido2_options && response.result?.phone) {
                setSmsSended(true);
                setOptions(response.result);
                Swal.fire({
                    icon: "success",
                    title: 'Sms code sended',
                    text: 'A message with a confirmation code has been sent by sms.',
                    timer: 2000
                }).then(() => setLoading(false));
            }
            else Swal.fire({
                title: 'Not success sms send :(',
                text: response.error?.message
            }).then(() => setLoading(false));
        }
        else {
            if (smsCode) {
                setLoading(true);
                if (!isGekkey) {
                    let response = await ResetPass(options, password, smsCode);

                    if (response?.result === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: 'Reset password',
                            text: 'Reset password Success!',
                        }).then(() => {
                            setLoading(false);
                            location.replace('/');
                        });
                    }
                    else Swal.fire({
                        icon: 'error',
                        title: 'Not success password reset :(',
                        text: response.error?.message ?? response.result
                    }).then(() => setLoading(false));
                }
                else {
                    let response = await RegisterDeviceKey(options, smsCode);

                    if (response?.result === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: 'New device key',
                            text: 'New device key added Success!',
                        }).then(() => {
                            setLoading(false);
                            location.replace('/');    
                        });
                    }
                    else if (response?.error?.code === 0) {
                        setLoading(false);
                    }
                    else Swal.fire({
                        icon: "error",
                        title: 'Not success create device key :(',
                        text: response.error?.message ?? response.result
                    }).then(() => setLoading(false));
                }
            }
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         console.log('setOtp call');
    //         const ac = new AbortController();
            
    //         console.log('navigator.credentials.get call');
    //         const otp = await navigator.credentials.get({
    //             // @ts-ignore
    //             otp: {transport: ["sms"]},
    //             signal: ac.signal
    //         });

    //         if (!otp) {
    //             console.log('error')
    //         }

    //         console.log('setSms call')
    //         // @ts-ignore
    //         setSmsCode(otp.code);
    //     })();
    //         /*
    //         .then((otp) => {
    //             console.log('navigator.credentials.get call');
    //             // @ts-ignore
    //             input.value = otp.code;
    //         })
    //         .catch((err) => {
    //             console.log('navigator.credentials.get error');
    //             console.error(err);
    //         });
    //         */
    // }, [smsSended])

    return <main className={styles.ResetForm}>
        <Form onSubmit={onSubmit} className={styles.FormBody}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 0 auto'
            }}>
                {!smsSended ?
                    <TextInput
                        required
                        id='ecode'
                        name='ecode'
                        type={"text"}
                        minLength={10}
                        value={emailCode}
                        autoComplete={"off"}
                        placeholder={"Email code"}
                        label='Рaste the email code into the field:'
                        onChange={e => setEmailCode(e.currentTarget.value)}
                    />
                : <>
                    <TextInput
                        id='code'
                        name='code'
                        type="text"
                        ref={inputRef}
                        value={smsCode}
                        placeholder={"SMS code"}
                        onChange={e => setSmsCode(e.currentTarget.value)}
                    />

                    {!isGekkey ? <>
                        <PasswordInput
                            id='password'
                            minLength={8}
                            name='password'
                            value={password}
                            placeholder={"New password"}
                            autoComplete={"new-password"}
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                        <PasswordInput
                            id="passwordC"
                            minLength={8}
                            name='passwordC'
                            value={passwordConfirm}
                            autoComplete={"new-password"}
                            placeholder={"Confirm password"}
                            onChange={e => setPasswordConfirm(e.currentTarget.value)}
                        />
                    </> : <>
                        <p className={styles.Description}>
                            To increase the security of your account, we suggest using a hardware storage-based access key. <a href={"https://fidoalliance.org/fido2/"}>Read more about FIDO2.</a>
                        </p>
                    </>}

                    <div className={styles.rulesList} >
                        {!isGekkey? <>
                        <CheckList value={password} onValidate={setIsValid}/> 
                        <div><div className={styles.rulesListH}>ℹ check list ℹ</div></div>
                        </>:""}
                        <div className={styles.deviceKey}>
                            <label for="typeKey">Create device key</label>
                            <input type="checkbox" id="typeKey" name="typeKey" checked={isGekkey} onChange={checkHandler} />
                        </div>
                    </div>
                </>}
            </div>

            <div className={styles.FormButtons}>
                <Button
                    type="submit"
                    disabled={loading
                        || !emailCode
                        || (smsSended && (!smsCode
                            || !isGekkey && ((password !== passwordConfirm) || !isValid)
                        ))
                    }
                >{!smsSended
                    ? "Send SMS"
                    : isGekkey
                        ? "Register gekkey"
                        : "Reset password"
                }</Button>
                
                <Button text onClick={handleCancel}>Back to login</Button>
            </div>
        </Form>
    </main>
}
