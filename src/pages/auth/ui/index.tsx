import React, {useEffect, useState} from 'react';
import "@/app/styles/index.scss";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code/index";
import QRCode from "@/widgets/auth/ui/qr-code/index";
import {apiQRCode} from "@/widgets/auth/api";

export type S = "authorization" | "code" | "qr-code"

const AuthPage = () => {

    useEffect(() => {
        let url = document.location.toString()
        let params = new URL(url).searchParams;
        let sessionId = params.get("sessionId");

        if (sessionId) {
            apiQRCode(sessionId).then(res => {
                console.log(res)
            }).catch(e => console.warn(e))
        }

    }, [])

    const [view, setView] = useState<S>("authorization")

    const handleView = (val: S): void => setView(val)

    return (
        <div className='flex items-center w-screen h-full flex-col'>
            <div className='bg-white w-[756px] min-h-m rounded-lg px-40 pt-10 pb-12 my-auto'>
                <div className="flex justify-center pt-8 pb-10">
                    <img src="/public/img/logo.svg" width={120} height={40} alt="logo"/>
                </div>

                {view === "authorization" ? <FormLoginAccount handleView={handleView}/> : view === "code" ?
                    <FormCode handleView={handleView}/> : <QRCode handleView={handleView}/>}
            </div>

            <footer className='text-gray text-center font-light mt-auto mb-10 mb max-w-[756px]'>
                <p className='mb-4'>
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/Cookies_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Cookie policy</a>
                </p>

                <p>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
            </footer>
        </div>
    )
}

export default AuthPage;
