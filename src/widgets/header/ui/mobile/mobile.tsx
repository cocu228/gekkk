import styles from "./style.module.scss"
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {useMemo, useRef} from "react";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {defaultItems, HeaderMenuItems} from "@/widgets/header/model/header-menu-items";
import {TOnActionParams} from "@/widgets/header/model/types";
import {useAuth} from "@/app/providers/AuthRouter";
import {useNavigate} from "react-router-dom";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";

const HeaderMobile = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    const isOpen = storyToggleSidebar(state => state.isOpen)
    const items = useMemo(() => new HeaderMenuItems(defaultItems), [])
    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "link", action: (value) => navigate(value)},
        {type: "change-account", action: async (value) => await navigate(value)},
        {type: "logout", action: () => logout()}
    ], [])

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
            <div className="wrapper flex flex-row flex-nowrap">
                <HeaderMenu items={items.get()} actions={actionsForMenuFunctions}>
                    <div className="wrapper flex justify-end w-[180px]">
                        <button className="arrow-down-xs"></button>
                    </div>
                </HeaderMenu>
                <div className="wrapper w-[32px] flex pr-4">
                    <LocalizationMenu/>
                </div>
            </div>
        </header>
    </>

}

export default HeaderMobile
