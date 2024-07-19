import styles from './style.module.css';
import {useEffect} from "preact/hooks";
import 'react-phone-number-input/style.css';
import {SignIn} from "../../../shared";
import '../../../styles/swal-material-ui.scss';
import { Header } from '../../header/header/Header';
import gekLogo from '../../../images/gek-logo.svg'
import { IconApp } from '../../components/IconApp';
import useResponsiveWidth from '../../../shared/hooks/useResponsiveWidth';
import { AddNewKey } from '../../add-new-device-key';
import useNewKeyForm from '../hooks/useNewKeyForm';
import { useAddToHomescreenPrompt } from '../../useAddToHomescreenPrompt';

export const GekwalletAuth = () => {
    const {opened, openForm} = useNewKeyForm()
    const {width} = useResponsiveWidth()
    const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt()    
    
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
        <>
            <Header code='w10' />
                    <div className={styles.Main}>
                    {opened 
                        ? <AddNewKey />
                        : (
                            <div className={styles.Wrapper}>
                                <div className={styles.Outline}>
                                    <div className={styles.Dashed}>
                                        <div className={styles.ImageWrapper}>
                                            <img className={styles.GekLogo} src={gekLogo} alt="" />
                                        </div>
                                        <div className={styles.DeviceKeyWrapper}>
                                            <button onClick={openForm} className={styles.DeviceKey}>
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
                                    {promptable && !isInstalled && ( 
                                        <button onClick={promptToInstall} className={styles.Install}>
                                            <IconApp code='w6' size={20} lib={3}/>
                                            <span title="Install Gekwallet">Install Gekwallet</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    </div>
        </>
    )
};
