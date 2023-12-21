import styles from "./style.module.scss";
import {useContext, useRef} from "react";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";

const HeaderMobile = ({items, actions}) => {
    const {account} = useContext(CtxRootData);
    const isOpen = storyToggleSidebar(state => state.isOpen);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

    return <>
        <header className="flex justify-between bg-[#1F3446]">
            <div className="flex items-center">
                <button onClick={() => toggleSidebar.current(!isOpen)}
                        className={`${styles.NavBtn} ${isOpen ? "active" : ""}`}/>
                
                {/*<a href="/">*/}
                {/*    <img style={{objectFit: "contain"}} src="/img/logo.svg" width={72}*/}
                {/*         height={24} alt="logo"/>*/}
                {/*</a>*/}
            </div>
            
            <div className="wrapper flex flex-row flex-nowrap">
                <HeaderMenu items={items} actions={actions}>
                    <div className="flex items-center justify-end" data-testid="HeaderMenuContainer">
                        <div className="wrapper flex justify-end">
                            {account.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22}/> :
                                <img width={32}
                                     height={32}
                                     alt="UserIcon"
                                     src="/img/icon/UserIcon.svg"
                                     className={styles.AccountIcon}
                                />}
                            
                            <button className={`${styles.AccountIcon} arrow-down-xs`}></button>
                        </div>
                    </div>
                </HeaderMenu>
                
                <div className="wrapper w-[32px] ml-2 flex pr-4">
                    <LocalizationMenu/>
                </div>
            </div>
        </header>
    </>
}

export default HeaderMobile;
