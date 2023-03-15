import SidebarDesktop from "./desktop"
import SidebarMobile from "./mobile"
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Sidebar = () => {
    const {md} = useContext(BreakpointsContext)

    return md ? <SidebarMobile/> : <SidebarDesktop/>

}

export default Sidebar