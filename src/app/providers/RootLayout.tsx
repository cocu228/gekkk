import {Outlet} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import Main from "@/app/layouts/Main";
import Content from "@/app/layouts/Content";

export default () => {

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