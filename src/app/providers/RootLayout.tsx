import {Outlet} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import Main from "@/app/layouts/Main";

export default () => {

    const {sm} = useContext(BreakpointsContext)

    return <>
        <Header/>
        <div className="flex">
            <Sidebar/>
            <Main>
                <Outlet/>
            </Main>
        </div>
    </>
}