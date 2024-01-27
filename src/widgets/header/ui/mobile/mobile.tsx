import styles from "./style.module.scss";
import {useContext, useRef} from "react";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderMobile = ({items, actions}) => {
    const {account} = useContext(CtxRootData);
    const { t } = useTranslation();
    const {currency} = useParams()
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage
    const navigate = useNavigate()
    const location = useLocation()    

    const headerTitle = () => {
        switch(location.pathname){
            case `/wallet/${currency}`:
                return `${currency} ${t("balance")}`
            case `/partnership-program`:
                return t("partnership_program.title")
            case `/support`:
                return t("support.title")
            case `/support/chat`:
                return t("chat")
            case `/faq`:
                return t("FAQ")
            case `/crypto-assets`:
                return t("crypto_assets.title")
            case `/profile-settings`:
                return t("profile_settings")
            default:
                return t(`${location.pathname.slice(1)}`)
        }
    }
    
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
                                <span className={styles.HeaderTitle}>{headerTitle()}</span>
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
