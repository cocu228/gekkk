import styles from './style.module.css';
import {useEffect} from "preact/hooks";
import 'react-phone-number-input/style.css';
import {SignIn} from "../../../shared";
import '../../../styles/swal-material-ui.scss';
import {CookiePolicy} from '../../cookie-policy/CookiePolicy';
// import SupportChatUnauthorized from '../chat';
import { Header } from '../../header/header/Header';
import gekLogo from '../../../images/gek-logo.svg'
import { IconApp } from '../../components/IconApp';
import useResponsiveWidth from '../../../shared/hooks/useResponsiveWidth';
export const GekwalletAuth = () => {

    const {width} = useResponsiveWidth()
    
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
                <div className={styles.Wrapper}>
                    <div className={styles.Outline}>
                        <div className={styles.Dashed}>
                            <div className={styles.ImageWrapper}>
                                <img className={styles.GekLogo} src={gekLogo} alt="" />
                            </div>
                            <div className={styles.DeviceKeyWrapper}>
                                <button className={styles.DeviceKey}>
                                    + Add new device key
                                </button>
                            </div>
                        </div>
                        <button title='Log in' className={styles.Login}>
                            <div className={styles.Round}/>
                            <span className={styles.LoginTitle}>Log in</span>
                        </button>
                    </div>
                    <div className={styles.Footer}>
                        {width > 768 && <button title="Registration" className={styles.Registration}>Registration</button>}
                        <button className={styles.Install}>
                            <IconApp code='w6' size={20} />
                            <span title="Install Gekwallet">Install Gekwallet</span>
                        </button>
                    </div>
                </div>
            </div>
            <CookiePolicy />
        </>
    );
};
