import {useContext, useEffect, useState} from 'react';
import "@styles/index.scss";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code";
import QRCode from "@/widgets/auth/ui/qr-code";
import {apiQRCode} from "@/widgets/auth/api";
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';

export type S = "authorization" | "code" | "qr-code";

const AuthPage = () => {
    const { md } = useContext(BreakpointsContext);

    useEffect(() => {
        let url = document.location.toString(),
            params = new URL(url).searchParams,
            sessionId = params.get("sessionId");

        if (sessionId) {
            apiQRCode(sessionId).then(res => {
                console.log(res)
            }).catch(e => console.warn(e))
        }

    }, []);

    const [view, setView] = useState<S>("authorization");

    const handleView = (val: S): void => setView(val);

    return (
        <div className='flex items-center w-screen h-full flex-col'>
            <div className={
                `bg-white min-h-m rounded-lg my-auto pb-12
                ${  md ? 'w-full mt-0 px-4 rounded-none' : 'max-w-[756px] px-40 pt-10'}`
            }>
                <div className={`flex justify-center ${md ? 'pt-6 pb-5' : 'pt-8 pb-10'}`}>
                    <img src="/img/logo.svg" width={md ? 72 : 120} alt="logo"/>
                </div>

                {view === "authorization" ? <FormLoginAccount handleView={handleView}/> : view === "code" ?
                    <FormCode handleView={handleView}/> : <QRCode handleView={handleView}/>}
            </div>

            <footer className={`text-center text-gray-400 mt-auto mb-10 mb max-w-[756px]
            ${!md ? '' : 'px-4'}`}>
                <p className='mb-4 font-light'>
                    <a
                        className={`${md ? 'text-xs' : ''} font-light hover:underline`}
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : ''} font-light hover:underline`}
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : ''} font-light hover:underline`}
                        href="https://gekkoin.com/source/Cookies_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Cookie policy</a>
                </p>

                <p className='font-light'>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
            </footer>
        </div>
    )
}

export default AuthPage;