import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import "@/app/styles/index.scss"
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code/inedx";
import { ConfigProvider } from 'antd'

export type S = "authorization" | "code"

const AuthPage = () => {

    const [view, setView] = useState<S>("authorization")

    const handleView = (val: S): void => setView(val)

    return (
        <div className='grid justify-center w-screen h-full'>
            <div className='bg-white w-sm h-m rounded-lg my-auto'>
                <div className="grid justify-center py-24">
                    <img width={120} height={40} src="/public/logo.png" alt="logo"/>
                </div>
                {view === "authorization" ? <FormLoginAccount handleView={handleView}/> :
                    <FormCode handleView={handleView}/>}
            </div>

            <footer className='text-center font-light'>
                <p>
                    <a
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider theme = {{
        token: {
            fontFamily: 'inherit'
        },
    }}>
        <AuthPage/>
    </ConfigProvider>
)

export default AuthPage;
