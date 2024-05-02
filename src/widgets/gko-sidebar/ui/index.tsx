import {useContext, useEffect, memo} from "react";
import SidebarMobile from "./mobile";
import SidebarDesktop from "./desktop";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {storeInvestments} from "@/shared/store/investments/investments";
import {CtxRootData} from '@/processes/RootContext';

const Sidebar = memo(() => {

    const {md} = useContext(BreakpointsContext);
    const {account} = useContext(CtxRootData);

    const {
        investments,
        getInvestments
    } = storeInvestments(state => state);

    useEffect(() => {
        (async () => {
            if (account) {
                await getInvestments()
            }
        })()
    }, [account])

    if (!investments) return null

    return md
        ? <SidebarMobile/>
        : <SidebarDesktop/>;
})

export default Sidebar;
