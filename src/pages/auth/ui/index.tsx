import React, {useState} from 'react';
import "@/app/styles/index.scss";
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code/index";

export type S = "authorization" | "code"

const AuthPage = () => {

    const [view, setView] = useState<S>("authorization")

    const handleView = (val: S): void => setView(val)

    return (
        <div className='grid justify-center w-screen h-full'>
            <div className='bg-white w-sm h-m rounded-lg px-40 pt-10 pb-12 my-auto'>
                <div className="grid justify-center pt-8 pb-10">
                    <img src="/public/logo.svg" width={120} height={40} alt="logo"/>
                </div>

                {view === "authorization" ? <FormLoginAccount handleView={handleView}/> :
                    <FormCode handleView={handleView}/>}
            </div>

            <footer className='text-gray text-center font-light mt-auto mb-10 mb max-w-sm'>
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
