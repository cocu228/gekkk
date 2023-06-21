import styles from "./style.module.scss"
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {useRef} from "react";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import headerMenuList from "@/widgets/header/model/header-menu-items";

const HeaderMobile = () => {

    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    const isOpen = storyToggleSidebar(state => state.isOpen)

    return <>
        <header className="flex justify-between bg-white">
            <div className="flex items-center">
                <button onClick={() => toggleSidebar.current(!isOpen)}
                        className={`${styles.NavBtn} ${isOpen ? "active" : ""}`}/>
                <a href="/">
                    <img style={{objectFit: "contain"}} src="/img/logo.svg" width={72}
                         height={24} alt="logo"/>
                </a>
            </div>
            <div className="wrapper">
                <HeaderMenu items={headerMenuList} actions={headerMenuList}>
                    <div className="wrapper flex justify-end w-[180px]">
                        <button className="arrow-down-xs"></button>
                    </div>
                </HeaderMenu>
            </div>
        </header>
    </>

}

export default HeaderMobile