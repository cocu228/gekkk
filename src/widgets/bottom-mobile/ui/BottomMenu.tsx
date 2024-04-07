import styles from "../../../widgets/sidebar/ui/desktop/style.module.scss"
import { scrollToTop } from "@/shared/lib/helpers";
import { NavLink, useMatch } from 'react-router-dom';
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import NewAssetMobileIcon from "@public/img/icon/NewAssetMobileIcon.svg"
import FundsButton from "@/shared/ui/ButtonsMobile/Funds";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import HistoryButton from "@/shared/ui/ButtonsMobile/History";


export function BottomMenu(){
    const homePage = useMatch("/");
    const {sm, md} = useContext(BreakpointsContext);
    const [needBottomPadding, setNeedBottomPadding] = useState<boolean>();
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md]);
    
    useEffect(()=>{
        setNeedBottomPadding(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    return <>
        {!!homePage && (
            <div className={styles.AssetInfo3 + " " + (needBottomPadding && styles.AddBottomAssetButtonMargin)}>
                <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                    <div className={styles.NewAsset}>
                        <img src={NewAssetMobileIcon} className={styles.NewAssetIcon} alt="" />
                    </div>
                </NavLink>
            </div>
        )}

        <div className={styles.BottomMobile}>
            <div className={
                styles.BottomMenuMobile + " "
                + (needBottomPadding && styles.AddBottomMenuPadding)}
            >
                <FundsButton/>
                <TransfersButton/>
                <ExchangeButton/>
                <HistoryButton/>
            </div>
        </div>
    </>
}
