import React from 'react'
import ReactDOM from 'react-dom/client'
import "@/app/styles/index.scss"
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";

const AuthPage = () => {

    return (
        <div className="wrapper absolute top-0 left-0 right-0 px-4 pt-6">
            <div className="wrapper">
                <div className="grid grid-rows-1 justify-center pb-6">
                    <img width={72} height={24} src="/public/logo.png" alt="logo"/>
                </div>
            </div>
            <FormLoginAccount/>
        </div>

    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthPage/>
)

export default AuthPage;
