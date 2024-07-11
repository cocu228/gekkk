import styles from './style.module.css';
import backgroundLogoIcon from "../../../../../../../public/img/G_logo.svg";
import {useEffect, useState} from "preact/hooks";
import {CallResetForm} from '../../call-reset-form/CallResetForm';
import {ChangePasswordForm} from '../../change-password-form/ChangePasswordForm';
import {LoginForm} from '../../login-form/LoginForm';
import 'react-phone-number-input/style.css';
import {SignIn} from "../../../shared";
import '../../../styles/swal-material-ui.scss';
import {useAddToHomescreenPrompt} from '../../useAddToHomescreenPrompt';
import {CookiePolicy} from '../../cookie-policy/CookiePolicy';
// import SupportChatUnauthorized from '../chat';
import { IconApp } from "../../components/IconApp"
import { Header } from '../../header/header/Header';
import { IForm } from '../types';

export const GekwalletAuth = () => {
    const [detailsActive, setDetailsActive] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailCode = urlParams.get('emailCode');
    const [phone, setPhone] = useState<string>('');

    const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
    const [form, setForm] = useState<IForm>(!emailCode ? 'LOGIN' : 'RESET_PASSWORD');

    // const [chatOpened, setChatOpened] = useState<boolean>(false)

    useEffect(() => {
        const runCMA = async () => {
            // Availability of `window.PublicKeyCredential` means WebAuthn is usable.
            if (window.PublicKeyCredential &&
                //@ts-ignore
                PublicKeyCredential.isConditionalMediationAvailable) {
                // Check if conditional mediation is available.
                //@ts-ignore
                const isCMA = await PublicKeyCredential.isConditionalMediationAvailable();
                console.log(isCMA);
                //if (isCMA) {
                // To abort a WebAuthn call, instantiate an `AbortController`.
                //const abortController = new AbortController();
                // Call WebAuthn authentication
                SignIn(true);
                //}
            }
        }
        runCMA();
    }, []);

    return (
        // chatOpened ? <SupportChatUnauthorized setClose={setChatOpened}/> :
        <>
            <Header code='w10' />
            <div className={styles.Main}>
                <div className={styles.Outline}>
                    <div className={styles.Dashed}>

                    </div>
                    <div className={styles.Login}>
                        <div className={styles.Round}/>
                        <span className={styles.LoginTitle}>Log in</span>
                    </div>
                </div>
            </div>
            <CookiePolicy />
        </>
    );
};
