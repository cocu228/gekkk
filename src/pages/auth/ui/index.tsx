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
        <div className="wrapper absolute top-0 left-0 right-0 px-4 pt-6">
            <div className="wrapper">
                <div className="grid grid-rows-1 justify-center pb-6">
                    <img width={72} height={24} src="/public/logo.png" alt="logo"/>
                </div>
            </div>
            {view === "authorization" ? <FormLoginAccount handleView={handleView}/> :
                <FormCode handleView={handleView}/>}
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
