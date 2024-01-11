import styles from "./style.module.scss";
import {useContext, useRef} from "react";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import { useMatch, useNavigate } from "react-router-dom";

const HeaderMobile = ({items, actions}) => {
    const {account} = useContext(CtxRootData);
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    // const isOpen = storyToggleSidebar(state => state.isOpen);
    // const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

    return <>
        <header className={styles.Header}>
            {/* <div className="flex items-center"> */}
                {/* <button onClick={() => toggleSidebar.current(!isOpen)}
                        className={`${styles.NavBtn} ${isOpen ? "active" : ""}`}/> */}
                
                {/*<a href="/">*/}
                {/*    <img style={{objectFit: "contain"}} src="/img/logo.svg" width={72}*/}
                {/*         height={24} alt="logo"/>*/}
                {/*</a>*/}
            {/* </div> */}
            
            {/* <div className="wrapper flex flex-row flex-nowrap"> */}

                {isOnMainPages ? 
                        <HeaderMenu items={items} actions={actions} className="pl-5">
                            <div className="flex items-center justify-start" data-testid="HeaderMenuContainer">
                                {/* <div className="wrapper flex justify-end"> */}
                                    {account?.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22}/> :
                                        <img width={24}
                                            height={24}
                                            alt="UserIcon"
                                            src="/img/icon/UserIconMobile.svg"
                                            className={styles.AccountIcon}
                                        />}
                                    {account?.number &&
                                    <div className="wrapper flex flex-col justify-center  self-stretch">
                                            <span className={styles.Name}>{account?.name}</span>

                                            <span className={styles.Number}>
                                                {getFormattedIBAN(account?.number)}
                                            </span>
                                    </div>
                                    }

                                    <button className={`${styles.ArrowBtn}`}></button>
                                {/* </div> */}
                            </div>
                        </HeaderMenu>
                    :
                            <div className="flex items-center w-full" data-testid="HeaderMenuContainer">
                                <button className={styles.GoBackBtn} onClick={()=>{goBack()}}></button>
                                <span></span>
                            </div>
                }
                
                {/* <div className="wrapper w-[32px] ml-2 flex pr-4">
                    <LocalizationMenu/>
                </div> */}
            {/* </div> */}
        </header>
    </>
}

export default HeaderMobile;
