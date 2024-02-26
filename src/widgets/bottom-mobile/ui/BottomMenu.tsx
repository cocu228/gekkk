import styles from "../../../widgets/sidebar/ui/desktop/style.module.scss"
import { scrollToTop } from "@/shared/lib/helpers";
import { NavLink, useMatch } from 'react-router-dom';
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useCallback, useContext, useRef } from "react";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';

import NewAssetMobileIcon from "@public/img/icon/NewAssetMobileIcon.svg"
import FundsButton from "@/shared/ui/ButtonsMobile/Funds";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import HistoryButton from "@/shared/ui/ButtonsMobile/History";


export function BottomMenu(){
    const { t } = useTranslation();
    
    const { sm, md } = useContext(BreakpointsContext);
    const { totalAmount } = useContext(CtxCurrencies);

    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))



    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md])
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    // const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return(
        <>
            {//isOnMainPages &&
                <>
                    {
                    !!homePage &&
                        <div className={styles.AssetInfo3}>
                            <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                                <div className={styles.NewAsset}>
                                    <img src={NewAssetMobileIcon} className={styles.NewAssetIcon} alt="" />
                                </div>
                            </NavLink>
                        </div>
                    }
                    <div className={styles.BottomMobile}>
                            <div className={styles.BottomMenuMobile}>
                                <FundsButton/>
                                <TransfersButton/>
                                <ExchangeButton/>
                                <HistoryButton/>
                            </div>
                    
                    </div>
                </>    
            }
        </>
    )
}