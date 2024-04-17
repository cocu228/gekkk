import {useContext, useEffect} from "react";
import SidebarMobile from "./mobile";
import SidebarDesktop from "./desktop";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {storeInvestments} from "@/shared/store/investments/investments";

const Sidebar = () => {
    const {md} = useContext(BreakpointsContext);

    const {
        investments,
        totalAmount,
        getInvestments
    } = storeInvestments(state => state);

    useEffect(() => {
        (async () => {
            await getInvestments()
        })()
    }, [])

    if (!investments) return null

    return md
        ? <SidebarMobile/>
        : <SidebarDesktop/>;
}

export default Sidebar;
