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
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {authForTokenHashUrl, helperApiTokenHash} from "@/widgets/auth/model/helpers";
import LoginBackground from '@/assets/login-background.svg?react';
import { NewHeader } from "@/widgets/new-header/ui/NewHeader";



const AuthPage = memo(() => {
    const {login} = useAuth();
    const {t} = useTranslation();
    const {md} = useContext(BreakpointsContext);
    const {stage, toggleStage} = storyDisplayAuth(state => state);

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
        }}>
            <NewHeader />
            <div style={{
                background: 'var(--new-brand-white)',
                height: '100vh',
                width: '100vw',
                display: 'flex',
            }}>
                <div style={{
                    width: '270px',
                    flex: '0 1 auto',
                }} id={"recaptcha-container"}></div>

                <div style={{
                    margin: '20px',
                    width: '466px',
                    flex: '0 0 auto'
                }}>

                    <h1 className="typography-h1"  style={{
                        color: 'var(--new-dark-blue)',
                        marginBottom: '18px',
                    }}>
                        Welcome to Gekkard online bank
                    </h1>
                    <FormLoginAccount/> 
                    <div style={{
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
                        <button className='account-button'>
                            Sign up
                        </button>
                    </div>

                    <p className="typography-b4" style={{
                        color: 'var(--new-light-grey)',
                        paddingTop: '60px',
                    }}>
                        Gekkard is issued by Papaya Ltd. Papaya Ltd is licensed by the Malta Financial Services Authority as an Electronic Money Institution (EMI). Registration number C55146. Copyright © 2023 Gekkard.
                    </p>
                </div>
                <div style={{
                    flex: '0 1 auto',
                    width:"100%",
                    overflow: "hidden",
                    display: 'flex',
                    alignItems: 'top',
                    height: '100%',
                }}>
                    <div style={{
                        transform: 'translate(0, -10%)'
                    }}>
                        <LoginBackground height="130%" width="100%" />
                    </div>
                </div>
        </div>
        </div>
    )
})

export default AuthPage;
