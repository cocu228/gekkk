import {useContext, useEffect, useState} from 'react';
import "@styles/index.scss";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code";
import QRCode from "@/widgets/auth/ui/qr-code";
import {IResSessionData, apiTokenHash} from "@/widgets/auth/api";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {useAuth} from "@/app/providers/AuthRouter";
import {storyDisplayStage} from "@/widgets/auth/model/story";
import {authForTokenHashUrl, helperApiTokenHash} from "@/widgets/auth/model/helpers";
import { AxiosResponse } from 'axios';
import { $AxiosResponse } from '@/shared/lib/(cs)axios';


const AuthPage = () => {

    const {md} = useContext(BreakpointsContext);
    const {login} = useAuth();
    const {stage} = storyDisplayStage(state => state);


    useEffect(() => {
        authForTokenHashUrl().success((sessionId) =>
            apiTokenHash(sessionId)
                .then((res: AxiosResponse<$AxiosResponse<IResSessionData>>) => helperApiTokenHash(res)
                    .success(
                        () => login(res.data.result.authorization, res.data.result.token, res.data.result.tokenHeaderName)
                    )).catch(e => console.warn(e)))

    }, []);

    let content
    switch (stage) {
        case "authorization":
            content = <FormLoginAccount/>
            break
        case "code":
            content = <FormCode/>
            break
        case "qr-code":
            content = <QRCode/>
            break
    }

    return (
        <div className='flex items-center w-screen h-full flex-col'>
            <div className={
                `bg-white min-h-m rounded-lg my-10 pb-12
                ${md ? 'w-full mt-0 px-4 rounded-none' : 'max-w-[756px] px-40 pt-10'}`
            }>
                <div className={`flex justify-center ${md ? 'pt-6 pb-5' : 'pt-8 pb-10'}`}>
                    <a href="/">
                        <img src="/img/logo.svg" width={md ? 72 : 120} alt="logo"/>
                    </a>
                </div>
                {content}
            </div>

            <footer className={`text-center text-gray-500 mt-auto mb-10 font-normal mb max-w-[756px]
            ${!md ? '' : 'px-4'}`}>
                <p className='mb-4'>
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/Cookies_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Cookie policy</a>
                </p>

                <p className={` ${md ? 'text-xs' : 'text-sm'}`}>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
            </footer>
        </div>
    )
}

export default AuthPage;
