import "@styles/index.scss";
import {AxiosResponse} from 'axios';
import {useTranslation} from 'react-i18next';
import {useSessionStorage} from "usehooks-ts";
import QRCode from "@/widgets/auth/ui/qr-code";
import FormCode from "@/widgets/auth/ui/form-code";
import {useAuth} from "@/app/providers/AuthRouter";
import {$AxiosResponse} from '@/shared/lib/(cs)axios';
import {TSessionAuth} from "@/widgets/auth/model/types";
import React, {memo, useContext, useEffect} from 'react';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {IResSessionData, apiTokenHash} from "@/widgets/auth/api";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {authForTokenHashUrl, helperApiTokenHash} from "@/widgets/auth/model/helpers";

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
        if (verificationId !== "") {
            toggleStage("code");
        }
    }, []);

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

    let content: React.ReactNode;

    switch (stage) {
        case "authorization":
            content = <FormLoginAccount/>;
            break;
        case "code":
            content = <FormCode/>;
            break;
        case "qr-code":
            content = <QRCode/>;
            break;
    }

    return (
        <div className='flex items-center w-screen h-full flex-col'>
            <div className={
                `bg-white min-h-m rounded-lg my-10 pb-12
                ${md ? 'w-full mt-0 px-4 rounded-none' : 'min-h-[710px] max-w-[756px] px-40 pt-10'}`
            }>
                <div className={`flex justify-center ${md ? 'pt-6 pb-5' : 'pt-8 pb-10'}`}>
                    <a href="/">
                        <img src="/img/logo.svg" width={md ? 72 : 120} alt="logo"/>
                    </a>
                </div>
                {content}
                <div id={"recaptcha-container"}></div>
            </div>

            <footer className={`text-center text-gray-500 mt-auto mb-10 font-normal mb max-w-[756px]
            ${!md ? '' : 'px-4'}`}>
                <p className='mb-4'>
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/terms-and-conditions.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >{t("auth.general_terms_and_conditions")}</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/data-protection-policy.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >{t("auth.data_protection_policy")}</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/legal-agreements.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >{t("auth.legal_agreements")}</a>
                </p>
                <p className={` ${md ? 'text-xs' : 'text-sm'} mb-2`}>
                    {t("auth.crypto_exchange_service")}
                </p>
                <span
                    className={`text-gray-500 font-semibold text-sm w-full block`}>
                    © Gekkard. v.{import.meta.env.VITE_APP_VERSION}
                </span>
            </footer>
        </div>
    )
})

export default AuthPage;
