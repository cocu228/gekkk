import styles from "./style.module.scss"
import {useRef} from "react";
import HeaderMenu from "@/widgets/header/ui/menu/header-menu";
import headerMenuList from "@/widgets/header/model/header-menu-list";

const HeaderMobile = () => {

    // const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    // const isOpen = storyToggleSidebar(state => state.isOpen)

    return <>
        <header className="flex justify-between bg-white">
            <div className="flex items-center pl-4">
                <a href="/">
                    <img style={{objectFit: "contain"}} src="/img/logo.svg" width={72}
                         height={24} alt="logo"/>
                </a>
            </div>
            <div className="wrapper">
                <HeaderMenu items={headerMenuList}>
                    <div className="wrapper flex justify-end w-[180px]">
                        <button className="arrow-down-xs"></button>
                    </div>
                </HeaderMenu>
            </div>
        </header>
    </>

}

export default HeaderMobile