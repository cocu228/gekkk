import {useContext} from "react";
// import SidebarMobile from "./mobile";
// import SidebarDesktop from "./desktop";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Sidebar = () => {
    const {md} = useContext(BreakpointsContext);

    return null
    // return md
    //     ? <SidebarMobile/>
    //     : <SidebarDesktop/>;
}

export default Sidebar;
