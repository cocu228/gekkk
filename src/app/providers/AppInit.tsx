import {AuthProvider, useAuth} from "./AuthRouter";
import AuthPage from "@/pages/auth";
import RootLayout from "@/app/providers/RootLayout";
import ErrorsProvider from "@/app/providers/ErrorsProvider";
import {useLocation} from "react-router";
import PageProblems from "@/pages/page-problems/PageProblems";

const AppInit = () => {

    const {token} = useAuth();

    const content = !token ? <AuthPage/> : <RootLayout/>

    return <ErrorsProvider>{content}</ErrorsProvider>

}


export default () => <AuthProvider>
    <AppInit/>
</AuthProvider>