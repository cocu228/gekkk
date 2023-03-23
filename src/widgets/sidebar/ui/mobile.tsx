import styles from "./mobile.module.scss"
import {storyToggleSidebar} from "../module/story"
import SidebarDesktop from "@/widgets/sidebar/ui/desktop";

const SidebarMobile = () => {

    const isOpen = storyToggleSidebar(state => state.isOpen)

    return <div id="sidebar" className={`${styles.Sidebar} ${isOpen ? "active" : ""}`}>
        <SidebarDesktop/>
    </div>

}

export default SidebarMobile