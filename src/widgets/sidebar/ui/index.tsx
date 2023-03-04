import SidebarDesktop from "./desktop"
import SidebarMobile from "./mobile"
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Sidebar = () => {

    const {sm} = useContext(BreakpointsContext)

    return sm ? <SidebarMobile/> : <SidebarDesktop/>

}

export default Sidebar