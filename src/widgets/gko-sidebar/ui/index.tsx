import {useContext, useEffect} from "react";
import SidebarMobile from "./mobile";
import SidebarDesktop from "./desktop";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {storeInvestments} from "@/shared/store/investments/investments";

const Sidebar = () => {

    const {md} = useContext(BreakpointsContext);

    const {
        investments,
        getInvestments
    } = storeInvestments(state => state);

    useEffect(() => {
        (async () => {
           setTimeout(async () => await getInvestments(), 2300 )
        })()
    }, [])

    if (!investments) return null

    return md
        ? <SidebarMobile/>
        : <SidebarDesktop/>;
}

export default Sidebar;
