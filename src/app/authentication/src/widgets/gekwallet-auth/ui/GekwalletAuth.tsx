import styles from './style.module.css';
import {useEffect} from "preact/hooks";
import 'react-phone-number-input/style.css';
import {SignIn} from "../../../shared";
import '../../../styles/swal-material-ui.scss';
import {CookiePolicy} from '../../cookie-policy/CookiePolicy';
// import SupportChatUnauthorized from '../chat';
import { Header } from '../../header/header/Header';

export const GekwalletAuth = () => {


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
