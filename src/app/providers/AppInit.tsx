import {AuthProvider, useAuth} from "./AuthRouter";
import AuthPage from "@/pages/auth/ui";
import RootLayout from "@/app/providers/RootLayout";

const AppInit = () => {

    const {token} = useAuth();

    if (!token) {
        return <AuthPage/>;
    }

    return <RootLayout/>
}


export default () => <AuthProvider><AppInit/></AuthProvider>