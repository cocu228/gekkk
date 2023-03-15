import {Outlet, Navigate} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import {useAuth} from "./AuthRouter";
import Main from "@/app/layouts/Main";
import Content from "@/app/layouts/Content";
import AuthPage from "@/pages/auth/ui";

export default () => {

    const {token, login} = useAuth();

    if (!token) {
        return <AuthPage/>;
    }

    return <>
        <Header/>
        <Main>
            <Sidebar/>
            <Content>
                <Outlet/>
            </Content>
        </Main>
    </>
}