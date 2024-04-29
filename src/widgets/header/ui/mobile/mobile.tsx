import styles from "./style.module.scss";
import { useContext } from "react";
import { CtxRootData } from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import { AccountRights } from "@/shared/config/account-rights";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import { NavLink, useLocation, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExchangeRoomMenu } from "./ExchangeRoomMenu";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

const HeaderMobile = ({ items, actions }) => {
    const {account} = useContext(CtxRootData);
    const {t} = useTranslation();
    const [params] = useSearchParams();
    const roomId = params.get('roomId');
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange");
    const privateRoomPage = useMatch('/private-room');
    const historyPage = useMatch("/history")
    const isOnMainPages = !!homePage || !!historyPage
    const navigate = useNavigate()
    const location = useLocation()
    const {md} = useContext(BreakpointsContext);

    const tab = params.get("tab");

    const headerTitle = () => {
        switch (location.pathname.split('/')[1]) {
            case `wallet`:
                return t("wallet").capitalize();
            case `partnership-program`:
                return t("partnership_program.title").capitalize();
            case `support`:
                return t("support.title").capitalize();
            case `faq`:
                return t("faq").capitalize();
            case `crypto-assets`:
                return t("crypto_assets.title").capitalize();
            case `profile-settings`:
                return t("profile_settings").capitalize();
            case `transfers`:
                return t("transfers").capitalize();
            case `exchange`:
                return t("exchange.title").capitalize()
            case `private-room`:
                return t("exchange_button").capitalize();
            case 'card-menu':
                return t("card_menu").capitalize()
            case 'gekkard-pro':
                return t("gekkard_pro.title").capitalize()
            default:
                return t(`${location.pathname.slice(1).replace("-", "_")}`).capitalize()
        }
    }
    // const isOpen = storyToggleSidebar(state => state.isOpen);
    // const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

    return <>
        <header className={styles.Header}>

            {isOnMainPages && location.pathname.split('/')[1] !== 'history' ?
                <HeaderMenu items={items} actions={actions} className="pl-5">
                    <div className="flex items-center justify-start" data-testid="HeaderMenuContainer">
                        {account?.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22} /> :
                            <IconApp code="t10" size={24} color="white"/>
                        }
                        {account?.number &&
                            <div className="wrapper flex flex-col justify-center  self-stretch">
                                <span className={styles.Name}>{account?.name}</span>

                                <span className={styles.Number}>
                                    {getFormattedIBAN(account?.number)}
                                </span>
                            </div>
                        }

                        <button className={`${styles.ArrowBtn}`}>
                            <IconApp code="t08" size={14} color="#fff" className="rotate-[90deg]" />
                        </button>
                    </div>
                </HeaderMenu>
                : tab === 'custom' ? (
                    <div className="flex items-center w-full" onClick={() => { navigate('/history') }} data-testid="HeaderMenuContainer">
                        <IconApp className="rotate-[180deg] m-[0_5vw]" size={13} code="t08" color="#fff" />
                        <span className={styles.HeaderTitle}>Custom search</span>
                    </div>
                ) : (
                    <div className="flex items-center w-full" onClick={() => { navigate('/') }} data-testid="HeaderMenuContainer">
                        <IconApp className="rotate-[180deg] m-[0_5vw] cursor-pointer" size={13} code="t08" color="#fff" />
                        <span className={styles.HeaderTitle}>{headerTitle()}</span>
                    </div>
                )
            }

            {!(exchangePage || privateRoomPage) ? null : (
                <div className="flex items-center justify-end w-[20%] gap-2 pr-2" data-testid="ExchangeRoomMenu">
                    <ExchangeRoomMenu roomId={roomId}/>
                </div>
            )}

            {
                historyPage && md && tab !== 'custom' && (
                    <div className="h-full items-center flex pr-[1.25rem]">
                        <NavLink to='/history?tab=custom' >
                            <IconApp 
                                code="t30"
                                color="#fff"
                                size={15}
                            />
                        </NavLink>
                    </div>
                )
            }
        </header>
    </>
}

export default HeaderMobile;
