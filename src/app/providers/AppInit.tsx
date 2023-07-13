import AuthPage from "@/pages/auth";
import {AuthProvider, useAuth} from "./AuthRouter";
import RootLayout from "@/app/providers/RootLayout";
import ErrorsProvider from "@/app/providers/ErrorsProvider";

const AppInit = () => {

    const {token} = useAuth();

    const content = !token ? <AuthPage/> : <RootLayout/>

    return <ErrorsProvider>{content}</ErrorsProvider>

}


export default () => <AuthProvider>
    <AppInit/>
</AuthProvider>

// export default () => <Assets/>
