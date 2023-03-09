import styles from "./mobile.module.scss"
import {useContext} from "react";
import SidebarContext from "../module/context"
import SidebarDesktop from "@/widgets/sidebar/ui/desktop";

const SidebarMobile = () => {


    const {active} = useContext(SidebarContext)
    //todo change in context
    return <div id="sidebar" className={`${styles.Sidebar} ${active ? "active" : ""}`}>
        <SidebarDesktop/>
    </div>

}

export default SidebarMobile