import styles from './style.module.css';
// import { formatAsNumber } from "./model/shared";
import Button from "./components/button/Button";
import { useState } from "preact/hooks";
import { ResetPass, ResetPassSendSMS, ResetPassStart } from '../shared';
import Form from './components/form';
import TextInput from './components/textInput';
import CheckList from './components/checklist';
import PasswordInput from './components/passwordInput';
import Swal from 'sweetalert2';

export interface Props {
    phone: string | undefined;
    emailCode: string | undefined;
    handleCancel: { handleCancel: () => void; }
}

export const CallResetPasswordForm = (Props) => {

    const [smsSended, setSmsSended] = useState<boolean>(false);

    const [phoneValue, setPhone] = useState(Props.phone);
    const [codeValue, setCode] = useState('');
    const [ecodeValue, setECode] = useState(Props.emailCode);
    const [passValue, setPass] = useState('');
    const [passCValue, setCPass] = useState('');
    const [optValue, setOpt] = useState(null);

    const onSubmit = async (_dataObject) => {
        if (!ecodeValue) {
            if (phoneValue) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: "Sending link to email..."
                });



                let r = await ResetPassStart(phoneValue);
                if (r.result === "Success") {
                    setECode("paste the code here from your email");
                    Swal.fire({
                        title: 'Email code',
                        text: 'A message with a confirmation code has been sent by email.',
                        timer: 2000
                    });
                }
                else Swal.fire({
                    title: 'Not success email send :(',
                    text: r.error?.message ?? r.result
                });
            }

        }
        else {
            if (!smsSended) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: "Sending sms code..."
                });

                let r = await ResetPassSendSMS(ecodeValue);
                console.log(r);
                if (r.result?.fido2_options) {
                    setCode("paste sms code here");
                    setSmsSended(true);
                    setOpt(r.result)
                    Swal.fire({
                        title: 'Sms code',
                        text: 'A message with a confirmation code has been sent by sms.',
                        timer: 2000
                    });
                }
                else Swal.fire({
                    title: 'Not success sms send :(',
                    text: r.error?.message ?? r.result
                });
            }
            else {
                if (codeValue) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "info",
                        title: "Reset password..."
                    });

                    let r = await ResetPass(optValue, passValue, codeValue);
                    if (r?.result === "Success") {
                        Swal.fire({
                            title: 'Reset password',
                            text: 'Reset password Success!',
                            timer: 2000
                        });
                        location.replace('/');
                    }
                    else Swal.fire({
                        title: 'Not success password reset :(',
                        text: r.error?.message ?? r.result
                    });
                }
            }
        }


    }





    return <main className={styles.CallReset}>
        <Form onSubmit={onSubmit} className={styles.FormBody}>
            <div>
                <TextInput required placeholder={"Phone"} type="tel" value={phoneValue} onChange={e => setPhone(e.currentTarget.value)} id='phone' name='phone' />
                <TextInput placeholder={"Email code"} type={"text"} value={ecodeValue} onChange={e => setECode(e.currentTarget.value)} id='ecode' name='ecode' />
                <PasswordInput //minLength={8} required 
                    placeholder={"New password"} value={passValue} onChange={e => setPass(e.currentTarget.value)} id='password' name='password' />
                <PasswordInput placeholder={"Confirm password"} value={passCValue} onChange={e => setCPass(e.currentTarget.value)} id="passwordC" name='passwordC' />
                <CheckList value={passValue} />
            </div>

            <div className={styles.FormButtons} >
                <div>
                    <Button type="submit">{ecodeValue ?(smsSended?"Reset password": "Send SMS" ): "Send link"}</Button>
                    <TextInput placeholder={"SMS code"} type={"text"} value={codeValue} onChange={e => setCode(e.currentTarget.value)} id='code' name='code' />
                </div>
                <Button text onClick={Props.handleCancel}>Back to login</Button>
            </div>
        </Form>
    </main>
}
