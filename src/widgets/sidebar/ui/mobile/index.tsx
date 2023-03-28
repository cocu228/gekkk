import styles from "./style.module.scss"
import {storyToggleSidebar} from "../../model/story"
import SidebarDesktop from "@/widgets/sidebar/ui/desktop";

const SidebarMobile = () => {

    const isOpen = storyToggleSidebar(state => state.isOpen)

    return <div id="sidebar" className={`${styles.Sidebar} ${isOpen ? "active" : ""}`}>
        <SidebarDesktop/>
    </div>

}

export default SidebarMobile