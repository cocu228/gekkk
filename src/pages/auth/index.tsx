import "@styles/index.scss";
import {AxiosResponse} from 'axios';
import {useTranslation} from 'react-i18next';
import {useSessionStorage} from "usehooks-ts";
import {useAuth} from "@/app/providers/AuthRouter";
import {$AxiosResponse} from '@/shared/lib/(cs)axios';
import {TSessionAuth} from "@/widgets/auth/model/types";
import {memo, useContext, useEffect} from 'react';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {IResSessionData, apiTokenHash} from "@/widgets/auth/api";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import {authForTokenHashUrl, helperApiTokenHash} from "@/widgets/auth/model/helpers";
import LoginBackground from '@/assets/login-background.svg?react';

import { NewHeader } from "@/widgets/new-header/ui/NewHeader";
import {$ENV_MODE} from "@/shared/lib/helpers";
import ForgotPassword from "@/widgets/auth/ui/forgot-password";
import AuthFooter from "@/widgets/auth/ui/auth-footer";
import CookiePolicyApplies from "@/widgets/auth/ui/cookie-policy-applies";

const AuthPage = memo(() => {
    const {login} = useAuth();
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const {stage, toggleStage} = storyDisplayAuth(state => state);

    const gekkardUrl = import.meta.env[`VITE_GEKKARD_URL_${import.meta.env.MODE}`];
    const [{verificationId}] = useSessionStorage<TSessionAuth>("session-auth", {
        phone: "",
        sessionIdUAS: "",
        verificationId: ""
    });

    useEffect(() => {
        authForTokenHashUrl().success((sessionId: string) =>
            apiTokenHash(sessionId)
                .then((res: AxiosResponse<$AxiosResponse<IResSessionData>>) => helperApiTokenHash(res)
                    .success(() => login(
                        res.data.result.authorization,
                        res.data.result.token,
                        res.data.result.tokenHeaderName
                    ))).catch(e => console.warn(e)));

    }, []);

    return (
        <div style={{
            background: 'var(--new-brand-white)',
            position: 'relative',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
        }}>
            <NewHeader />
            <div style={{
                background: 'var(--new-brand-white)',
                height: 'calc(100% - 70px)',
                width: '100%',
                display: 'flex',
                overflow: 'auto',
            }}>
                <div style={{
                    width: md ? 0 : '270px',
                    flex: '0 1 auto',
                }} id={"recaptcha-container"}></div>

                <div style={{
                    width: md ? '100%' : '',
                    margin: '20px',
                    display: "flex",
                    flexDirection: 'column',

                }}>

                <div style={{
                    width: md ? '100%' : '499px',
                    flex: '0 0 auto'
                }}>

                    <h1 className="typography-h1"  style={{
                        color: 'var(--new-dark-blue)',
                        marginBottom: '18px',
                    }}>
                        Welcome to Gekkard online bank
                    </h1>
                    {stage === 'forgot-password' ?
                        <ForgotPassword /> : 
                        
                        <FormLoginAccount/>
                    }
                    
                    {stage !== 'forgot-password' ? <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '60px',

                    }}>
                        <span className="typography-b2" style={{
                            color: 'var(--new-dark-grey)',
                        }}>

                            Don’t have an account? Sign up now
                        </span>
                        <button
                            className='account-button'
                            onClick={() => window.open(import.meta.env[`VITE_REGISTRATION_URL_${$ENV_MODE}`]
                                ?? 'https://webregistration-dev.gekkard.com/', "_blank")}
                        >
                            Sign up
                        </button>
                    </div> : null}
                    
                    </div>
                    <CookiePolicyApplies />
                    
                    <div style={{ height: "100%", minHeight: '30px'}}></div>
                    
                    {/* <p className="typography-b4" style={{
                        color: 'var(--new-light-grey)',
                        paddingTop: '60px',
                    }}>
                        Gekkard is issued by Papaya Ltd. Papaya Ltd is licensed by the Malta Financial Services Authority as an Electronic Money Institution (EMI). Registration number C55146. Copyright © 2023 Gekkard.
                    </p> */}
                    <AuthFooter />
                </div>
                { !md ?
                <div style={{
                    position: 'relative',
                    flex: '0 1 auto',
                    overflow: "hidden",
                    display: 'flex',
                    alignItems: 'top',
                    height: '100%',
                    width:"100%",
                    maxWidth: "100%",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        right: 0,
                        width: '100%',

                        maxWidth: "783px",
                    }}>
                        <LoginBackground height="100%" width="100%" />
                    </div>
                </div> : null}
        </div>
        </div>
    )
})

export default AuthPage;
