import styles from './style.module.css';
import Button from "./components/button/Button";
import { useState } from "preact/hooks";
import { RegisterDeviceKey, ResetPass } from '../shared';
import Form from './components/form';
import TextInput from './components/textInput';
import CheckList from './components/checklist';
import PasswordInput from './components/passwordInput';
import Swal from 'sweetalert2';
import { RegisterOptions, ResetPassword } from '../shared/apiInterfaces';
import flags from 'react-phone-number-input/flags';
import PhoneInput from 'react-phone-number-input';

export interface Props {
    phone: string | undefined;
    emailCode: string | undefined;
    handleCancel: { handleCancel: () => void; }
}

export const CallResetPasswordForm = (Props) => {

    const [devKey, setdevKey] = useState<boolean>(false);
    const checkHandler = () => {setdevKey(!devKey)};

    const [smsSended, setSmsSended] = useState<boolean>(false);
    const [ecodeSended, setECodeSended] = useState<boolean>(!!Props.emailCode);

    const [phoneValue, setPhone] = useState(Props.phone);
    const [codeValue, setCode] = useState('');
    const [ecodeValue, setECode] = useState(Props.emailCode);
    const [passValue, setPass] = useState('');
    const [passCValue, setCPass] = useState('');
    const [optValue, setOpt] = useState(null);

    const onSubmit = async (_dataObject) => {
        if (!ecodeSended) {
            if (phoneValue) {
                let r = await ResetPassword(phoneValue);
                if (r.result === "Success") {
                    setECodeSended(true);
                    Swal.fire({
                        icon: "success",
                        title: 'Email code',
                        text: 'A message with a confirmation code has been sent by email.',
                        timer: 2000
                    });
                }
                else Swal.fire({
                    icon: "error",
                    title: 'Not success email send',
                    text: r.error?.message ?? r.result
                });
            }
        }
        else if (!smsSended) {
            let r = await RegisterOptions(ecodeValue);

            if (r.result?.fido2_options && r.result?.phone) {
                setOpt(r.result);
                setPhone(r.result.phone)
                setSmsSended(true);

                Swal.fire({
                    icon: "success",
                    title: 'Sms code sended',
                    text: 'A message with a confirmation code has been sent by sms.',
                    timer: 2000
                });
            }
            else Swal.fire({
                icon: "error",
                title: 'Not success sms send or options get :(',
                text: r.error?.message
            });
        }
        else {
            if(devKey && codeValue && optValue)
            {
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
            }
            else if (codeValue && optValue && passValue) {
                if (passValue !== passCValue) {
                    Swal.fire({
                        icon: "warning",
                        title: 'Password check failed',
                        text: "passwords mismatch",
                        timer: 2000
                    });
                    return;
                }

                let r = await ResetPass(optValue, passValue, codeValue);
                if (r?.result === "Success") {
                    Swal.fire({
                        icon: "success",
                        title: 'Reset password',
                        text: 'Reset password Success!',
                        timer: 2000
                    });
                    location.replace('/');
                }
                else Swal.fire({
                    icon: "error",
                    title: 'Not success password reset :(',
                    text: r.error?.message ?? r.result
                });
            }
        }
    }

    return <Form onSubmit={onSubmit} className={styles.FormBody}>
        {(!smsSended && !ecodeSended) ?
            <PhoneInput required minLength={8} flags={flags} placeholder="Enter phone number" name='phone' value={phoneValue} onChange={setPhone} />
            : ""}
        {(!smsSended && ecodeSended) ?
            <TextInput autoComplete={"off"} label='Рaste the email code into the field:' required minLength={10} placeholder={"Email code"} type={"text"} value={ecodeValue} onChange={e => setECode(e.currentTarget.value)} id='ecode' name='ecode' />
            : ""}
        {(smsSended && ecodeSended) ?
            <div className={styles.passWrapper}>
                <TextInput autoComplete={"off sms new-password"} required minLength={6} placeholder={"SMS code"} type={"text"} value={codeValue} onChange={e => setCode(e.currentTarget.value)} id='code' name='code' />
                {!devKey?
                <>
                <PasswordInput autoComplete={"new-password"} minLength={8} required placeholder={"New password"} value={passValue} onChange={e => setPass(e.currentTarget.value)} id='password' name='password' />
                <PasswordInput autoComplete={"new-password"} minLength={8} required placeholder={"Confirm password"} value={passCValue} onChange={e => setCPass(e.currentTarget.value)} id="passwordC" name='passwordC' />
                </> : ""}
                <div className={styles.rulesList} >
                    {!devKey? <>
                    <CheckList value={passValue} /> 
                    <div><div className={styles.rulesListH}>ℹ check list ℹ</div></div>
                    </>:""}
                    <div className={styles.deviceKey}>
                        <label for="typeKey">Create device key</label>
                        <input type="checkbox" id="typeKey" name="typeKey" checked={devKey} onChange={checkHandler} />
                    </div>
                </div>
            </div>
            : ""}

        <div className={styles.FormButtons} >
            <Button type="submit">{ecodeSended ? (smsSended ? "Confirm" : "Send SMS") : "Send to email"}</Button>
            <Button text onClick={Props.handleCancel}>Back to login</Button>
        </div>
    </Form>

}
