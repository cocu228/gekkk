import {Outlet, Navigate} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import {useAuth} from "./AuthRouter";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import Main from "@/app/layouts/Main";
import Content from "@/app/layouts/Content";
import AuthPage from "@/pages/auth/ui";

export default () => {

    const {user, login} = useAuth();

    if (!user) {
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