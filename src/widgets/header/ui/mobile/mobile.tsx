import styles from "./style.module.scss";
import { useContext } from "react";
import { CtxRootData } from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import { AccountRights } from "@/shared/config/account-rights";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import { useLocation, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExchangeRoomMenu } from "./ExchangeRoomMenu";

const HeaderMobile = ({ items, actions }) => {
    const {account} = useContext(CtxRootData);
    const {t} = useTranslation();
    const {currency} = useParams();
    const [params] = useSearchParams();
    const roomId = params.get('roomId');
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange");
    const privateRoomPage = useMatch('/private-room');
    const historyPage = useMatch("/history") //not used
    const isOnMainPages = !!homePage || !!historyPage
    const navigate = useNavigate()
    const location = useLocation()

    const headerTitle = () => {
        const page = location.pathname.split('/')[1];
        console.log(page);
        switch (page) {
            case `wallet`:
                return t("Wallet");
            case `partnership-program`:
                return t("partnership_program.title");
            case `support`:
                return t("support.title");
            case `faq`:
                return t("FAQ");
            case `crypto-assets`:
                return t("crypto_assets.title");
            case `profile-settings`:
                return t("profile_settings");
            case `transfers`:
                return t("transfers");
            case `exchange`:
            case `private-room`:
                return t("exchange_button");
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
                        {account?.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22} /> :
                            // <img width={24}
                            //     height={24}
                            //     alt="UserIcon"
                            //     src="/img/icon/UserIconMobile.svg"
                            //     className={styles.AccountIcon}
                            // />
                            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.3903 5.85369C13.3903 7.79342 11.8178 9.3659 9.87807 9.3659C7.93834 9.3659 6.36586 7.79342 6.36586 5.85369C6.36586 3.91395 7.93834 2.34147 9.87807 2.34147C11.8178 2.34147 13.3903 3.91395 13.3903 5.85369ZM15.7318 5.85369C15.7318 9.08658 13.111 11.7074 9.87807 11.7074C6.64517 11.7074 4.02439 9.08658 4.02439 5.85369C4.02439 2.62079 6.64517 0 9.87807 0C13.111 0 15.7318 2.62079 15.7318 5.85369ZM17.2109 21.5066C17.1532 21.3067 17.0843 21.0785 17.0029 20.8097C16.3804 18.7525 14.2057 15.2195 9.87812 15.2195C5.55047 15.2195 3.37588 18.7525 2.7533 20.8097C2.67193 21.0785 2.60309 21.3067 2.54534 21.5066C2.87463 21.5423 3.31588 21.5759 3.90152 21.6001C5.30481 21.6581 7.22213 21.6585 9.87812 21.6585C12.5341 21.6585 14.4515 21.6581 15.8547 21.6001C16.4403 21.5759 16.8816 21.5423 17.2109 21.5066ZM19.6202 22.9788C19.933 22.408 19.6637 21.5184 19.244 20.1315C18.4994 17.6712 15.7404 12.878 9.87812 12.878C4.01578 12.878 1.25679 17.6711 0.51221 20.1314C0.0925003 21.5183 -0.176756 22.408 0.136005 22.9788C0.695664 24 3.11886 24 9.87812 24C16.6373 24 19.0605 24 19.6202 22.9788Z" fill="white" />
                            </svg>

                        }
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
                <div className="flex items-center w-full" onClick={() => { goBack() }} data-testid="HeaderMenuContainer">
                    <div className={styles.GoBackIcon}></div>
                    <span className={styles.HeaderTitle}>{headerTitle()}</span>
                </div>
            }

            {!(exchangePage || privateRoomPage) ? null : (
                <div className="flex items-center justify-end w-full gap-2 pr-2" data-testid="ExchangeRoomMenu">
                    <ExchangeRoomMenu roomId={roomId}/>
                </div>
            )}

            {/* <div className="wrapper w-[32px] ml-2 flex pr-4">
                    <LocalizationMenu/>
                </div> */}
            {/* </div> */}
        </header>
    </>
}

export default HeaderMobile;
