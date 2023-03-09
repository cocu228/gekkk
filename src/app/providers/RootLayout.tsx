import {Outlet} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

export default () => {

    const {sm} = useContext(BreakpointsContext)

    return <>
        <Header/>
        <div className="flex">
            <Sidebar/>
            {/*todo*/}
            <main className="w-full" style={sm ? {} : {
                padding: "24px 170px 56px 110px",
                backgroundColor: "#F2F2F2",
                flexBasis: "100%"
            }}>
                <Outlet/>
            </main>
        </div>
    </>
}