import styles from './style.module.css';
import Button from "../components/button/Button";
import {useState} from "preact/hooks";
import {RegisterDeviceKey, ResetPass} from '../../shared';
import Form from '../components/form';
import TextInput from '../components/textInput';
import CheckList from '../components/checklist';
import PasswordInput from '../components/passwordInput';
import {RegisterOptions} from '../../shared/apiInterfaces';
import Swal from 'sweetalert2';

interface IParams {
    emailCode: string;
    handleCancel: () => void;
}

export const ChangePasswordForm = ({emailCode, handleCancel}: IParams) => {
    const [smsCode, setSmsCode] = useState('');
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [smsSended, setSmsSended] = useState<boolean>(false);
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

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
                if (tab === "PASSWORD") {
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
                            timer: 2000
                        });
                        location.replace('/');
                    } 
                    else Swal.fire({
                        icon: "error",
                        title: 'Not success create device key :(',
                        text: response.error?.message ?? response.result
                    });
                }
            }
        }
    }

    return <main className={styles.ResetForm}>
        <div className={styles.FormTab}>
            <button className={`${styles.TabButton} ${tab === 'PASSWORD' ? styles.TabButtonActive : ""}`} onClick={() => setTab('PASSWORD')} >
                Password
            </button>
            <button className={`${styles.TabButton} ${tab === 'DEVICE_KEY' ? styles.TabButtonActive : ""}`} onClick={() => setTab('DEVICE_KEY')} >
                Gekkey
            </button>
        </div>
        
        <Form onSubmit={onSubmit} className={styles.FormBody}>
            <div>
                {tab === 'PASSWORD' ? <>
                    <PasswordInput
                        id='password'
                        name='password'
                        value={password}
                        placeholder={"New password"}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    <PasswordInput
                        id="passwordC"
                        name='passwordC'
                        value={passwordConfirm}
                        placeholder={"Confirm password"}
                        onChange={e => setPasswordConfirm(e.currentTarget.value)}
                    />
                    <CheckList value={password}/>
                </> : <>
                    <p className={styles.Description}>
                        Use of a hardware-based security key is fast and easy. <a href={"https://fidoalliance.org/fido2/"}>Read more about FIDO2.</a>
                    </p>
                </>}

                {!smsSended ? null : (
                    <TextInput placeholder={"SMS code"} type={"text"} value={smsCode} onChange={e => setSmsCode(e.currentTarget.value)} id='code' name='code'/>
                )}
            </div>

            <div className={styles.FormButtons}>
                <Button
                    type="submit"
                    disabled={
                        (password !== passwordConfirm)
                        || loading
                        || (smsSended && !smsCode)
                    }
                >{!smsSended
                    ? "Send SMS"
                    : tab === 'PASSWORD'
                        ? "Reset password"
                        : "Register gekkey"
                }</Button>
                
                <Button text onClick={handleCancel}>Back to login</Button>
            </div>
        </Form>
    </main>
}
