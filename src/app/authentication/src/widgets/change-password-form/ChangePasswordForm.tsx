import styles from './style.module.css';
import Button from "../components/button/Button";
import {useState} from "preact/hooks";
import {ResetPass} from '../../shared';
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
            /* todo: register device key
                let r = await RegisterDeviceKey(optValue, codeValue);
                if (r?.result === "Success") {
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
                    text: r.error?.message ?? r.result
                });
            */
        }
    }

    return <main className={styles.ResetForm}>
        <Form onSubmit={onSubmit} className={styles.FormBody}>
            <div>
                <PasswordInput
                    id='password'
                    name='password'
                    value={password}
                    disabled={smsSended}
                    placeholder={"New password"}
                    onChange={e => setPassword(e.currentTarget.value)}
                />
                <PasswordInput
                    id="passwordC"
                    name='passwordC'
                    disabled={smsSended}
                    value={passwordConfirm}
                    placeholder={"Confirm password"}
                    onChange={e => setPasswordConfirm(e.currentTarget.value)}
                />
                <CheckList value={password}/>

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
                >{smsSended
                    ? "Reset password"
                    : "Send SMS"
                }</Button>
                
                <Button text onClick={handleCancel}>Back to login</Button>
            </div>
        </Form>
    </main>
}
