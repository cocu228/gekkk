import styles from './style.module.css';
import backgroundLogoIcon from "../../../../../../public/img/G_logo.svg";
import {useEffect, useState} from "preact/hooks";
import {CallResetForm} from '../../widgets/call-reset-form/CallResetForm';
import {ChangePasswordForm} from '../../widgets/change-password-form/ChangePasswordForm';
import {LoginForm} from '../../widgets/login-form/LoginForm';
import 'react-phone-number-input/style.css';
import {SignIn} from "../../shared";
import '../../styles/swal-material-ui.scss';
import {useAddToHomescreenPrompt} from '../../widgets/useAddToHomescreenPrompt';
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import {CookiePolicy} from '../../widgets/cookie-policy/CookiePolicy';
// import SupportChatUnauthorized from '../chat';
import { IconApp } from "../../widgets/components/IconApp"
import {AppType, getInitialAppType} from "../../utils/getMode";


type IForm = 'LOGIN' | 'FORGOT_PASSWORD' | 'RESET_PASSWORD';

const Auth = () => {
    const [detailsActive, setDetailsActive] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailCode = urlParams.get('emailCode');
    const [phone, setPhone] = useState<string>('');

    const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
    const [form, setForm] = useState<IForm>(!emailCode ? 'LOGIN' : 'RESET_PASSWORD');

    // const [chatOpened, setChatOpened] = useState<boolean>(false)
    
    useEffect(() => {
        const pathname = window.location?.pathname
        const search = window.location?.search
        const redirectLink = pathname+search
    

        if(redirectLink && redirectLink !== '/') {
            localStorage.setItem('redirectPath', redirectLink)
        }
    }, [])

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

    const iconCodes: Record<AppType, { title: string, icon: string }> = {
        gekkard: {
            title: "Welcome to Gekkard online bank",
            icon: 'w2'
        },
        gekkoin: {
            title: "Welcome to Gekkoin invest platform",
            icon: 'w9'
        },
        gekwallet: {
            title: "Welcome to Gekwallet",
            icon: 'w10'
        },
    };

    const modeInfo = iconCodes[getInitialAppType()];

    return (
        // chatOpened ? <SupportChatUnauthorized setClose={setChatOpened}/> :
        <>

            <div className={styles.Header}>
                <div className={styles.LogoContainer}>
                    <IconApp width={120} height={40} code={modeInfo.icon} color='none' lib={3}/>
                </div>
                <div
                    onClick={() => {
                        document.getElementById("chat").classList.toggle("isOpen")
                        // setChatOpened(true)
                    }}
                    style={{cursor: "pointer"}}
                >
                    <IconApp code='t25' color='#fff' size={22} />
                </div>
            </div>

            <div className={styles.Main}>
                <div className={styles.Body}>
                    <header>
                        <h2>
                            {form === 'LOGIN'
                                ? modeInfo.title
                                : 'Password reset form'
                            }
                        </h2>
                        <p>
                            {form === 'LOGIN'
                                ? 'Log in using the form below'
                                : 'To start the password reset process you must have an active account'
                            }
                        </p>
                    </header>

                    <main>
                        {form === 'LOGIN'
                            ? <LoginForm
                                phone={phone}
                                onPhoneChange={(phone: string) => setPhone(phone)}
                                onPasswordForget={() => setForm('FORGOT_PASSWORD')}
                            />
                            : form === 'FORGOT_PASSWORD'
                                ? <CallResetForm
                                    phone={phone}
                                    handleCancel={() => setForm('LOGIN')}
                                    onContinue={() => setForm('RESET_PASSWORD')}
                                    onPhoneChange={(phone: string) => setPhone(phone)}
                                />
                                : <ChangePasswordForm
                                    emailCodeDefault={emailCode}
                                    handleCancel={() => {
                                        setForm('LOGIN');
                                        location.replace('/');
                                    }}
                                />
                        }
                    </main>

                    <CookiePolicy/>

                    <details>
                        <summary onClick={() => setDetailsActive(!detailsActive)} >
                            <h4>
                                <div style={{rotate: detailsActive ? '90deg' : '0deg'}} class={`detailsArr`} >
                                    <IconApp code='w4' color='#000' size={10} lib={3} />
                                </div>
                                Don’t have an account?
                            </h4>
                        </summary>

                        <a href="https://webreg.gekkard.com/" target="_blank" rel="noreferrer noopener">
                            Go to Gekkard registration form
                        </a>
                    </details>
                    {
                        promptable && !isInstalled ?
                            <button onClick={promptToInstall} className={styles.InstallButton}>
                                <div className={styles.underlineOne}>
									<span>
										<svg width="16" viewBox="0 0 50 35" xmlns="http://www.w3.org/2000/svg">
											<path
                                                d="M24.9663 34.2161C18.1377 34.2161 11.32 34.2161 4.49137 34.2161C3.49576 34.2161 2.53261 34.0646 1.66686 33.5452C1.07166 33.188 0.552211 32.7227 0.249199 32.0518C0.0544056 31.6297 0.0111182 31.2076 0.0111182 30.7639C0.0111182 28.5238 0.0327619 26.2945 0.00029629 24.0544C-0.0213474 22.9289 1.14741 22.3662 1.99152 22.5934C2.75987 22.7991 3.12781 23.2319 3.13863 24.0219C3.14946 25.9699 3.13863 27.907 3.13863 29.8549C3.13863 30.2012 3.13863 30.5475 3.13863 30.8938C3.13863 31.2726 3.45247 31.3592 3.70137 31.3916C4.3074 31.4674 4.92424 31.4998 5.53026 31.4998C9.29627 31.5107 13.0731 31.5107 16.8391 31.4998C19.4255 31.4998 22.012 31.489 24.5876 31.489C27.6177 31.489 30.6478 31.4998 33.6779 31.4998C37.6604 31.4998 41.6428 31.489 45.6252 31.489C45.7551 31.489 45.8958 31.4782 46.0257 31.4565C46.7399 31.3483 46.8373 31.2293 46.8373 30.515C46.8373 28.3831 46.8481 26.2404 46.8373 24.1085C46.8373 23.5025 47.0321 23.0047 47.5948 22.7341C48.255 22.4203 48.8934 22.4636 49.5103 22.9073C49.9865 23.2536 49.9973 23.7406 49.9973 24.2275C50.0081 26.3594 49.9215 28.5022 49.9973 30.6341C50.0622 32.3439 48.9584 33.4045 47.5948 33.8698C46.9672 34.0754 46.2854 34.1837 45.6252 34.1837C38.7534 34.2269 31.8598 34.2161 24.9663 34.2161ZM23.3106 21.0351C22.3366 20.1369 21.3626 19.2278 20.3887 18.3296C19.6311 17.6154 18.8736 16.8903 18.1161 16.1869C17.1854 15.3212 16.2331 14.4771 15.324 13.5897C14.7721 13.0594 14.1553 12.8754 13.441 13.0919C12.3589 13.4382 12.2182 14.6069 12.8242 15.2562C13.3112 15.7865 13.8739 16.2518 14.3934 16.7388C15.2158 17.4963 16.0383 18.2539 16.8499 19.0222C17.2179 19.3577 17.5642 19.7148 17.9321 20.0503C18.7005 20.7646 19.4905 21.468 20.248 22.1822C20.8432 22.7449 21.4276 23.3185 22.0228 23.8812C22.6721 24.4873 23.3322 25.0716 23.9707 25.6885C24.7174 26.4136 25.3667 26.4352 26.0377 25.6885C26.3732 25.3097 26.7627 24.9743 27.1415 24.6388C27.8882 23.957 28.6349 23.2969 29.3708 22.6043C30.15 21.8792 30.9075 21.1325 31.6867 20.4074C32.7039 19.4551 33.7212 18.5028 34.7493 17.5505C35.1497 17.1825 35.5609 16.8362 35.9505 16.4575C36.4267 15.9921 36.9028 15.5376 37.3465 15.0398C37.8984 14.4229 37.5305 13.5788 36.9136 13.2434C36.1669 12.8321 35.3769 12.9403 34.7493 13.5247C33.8943 14.3255 33.0394 15.1264 32.1845 15.9272C31.3296 16.728 30.4638 17.5288 29.6089 18.3296C28.6782 19.2062 27.7584 20.0828 26.8385 20.9593C26.7736 21.0243 26.687 21.0459 26.5463 21.1217C26.5463 20.9485 26.5463 20.8511 26.5463 20.7537C26.5463 19.2387 26.5571 17.7128 26.5571 16.1977C26.5571 11.2846 26.5463 6.3823 26.5463 1.46918C26.5463 1.02548 26.4273 0.657539 26.0485 0.365349C25.5291 -0.0242378 24.9663 -0.0999908 24.3819 0.127268C23.7759 0.365349 23.4296 0.798223 23.4296 1.50164C23.4404 3.29807 23.4188 5.10532 23.4188 6.90175C23.4188 10.8193 23.4296 14.726 23.4296 18.6435C23.4296 19.4443 23.4296 20.2451 23.4296 21.0892C23.3755 21.0567 23.3322 21.0567 23.3106 21.0351Z"/>
										</svg>
										Install Gekkard Progressive Web App
									</span>
                                    <span className={styles.bottom}></span>
                                </div>
                            </button>
                            : ""
                    }
                    <PwaInstallPopupIOS delay={3} lang="en" appIcon="/img/favicon/favicon-192x192.png"/>

                    <footer>
                        <nav>
                            <a href="https://gekkard.com/terms-and-conditions.html" target="_blank"
                               rel="noreferrer noopener">
                                General terms and conditions
                            </a>

                            <a href="https://gekkard.com/data-protection-policy.html" target="_blank"
                               rel="noreferrer noopener">
                                Data protection policy
                            </a>

                            <a href="https://gekkard.com/legal-agreements.html" target="_blank"
                               rel="noreferrer noopener">
                                Legal agreements
                            </a>
                        </nav>

                        <p>
                            Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and
                            exchange)
                        </p>
                        <p>© Gekkard. v."2.0.70"</p>
                    </footer>
                </div>

                <figure>
                    <div className={styles.MainBackground}>
                        <img src={backgroundLogoIcon} />
                    </div>
                </figure>
            </div>
        </>
    );
}

export default Auth;
