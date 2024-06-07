import styles from "./style.module.scss";
import { scrollToTop } from "@/shared/lib/helpers";
import { NavLink, useMatch, useSearchParams } from 'react-router-dom';
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import FundsButton from "@/shared/ui/ButtonsMobile/Funds";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import HistoryButton from "@/shared/ui/ButtonsMobile/History";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { IS_GEKKARD_APP, IS_GEKKWALLET_APP } from "@/shared/lib";


export function BottomMenu(){
    const [params] = useSearchParams();
    const currency = params.get('currency');
    
    const isHomePage = !!useMatch("/");
    const isHistoryPage = !!useMatch("/history");
    const isExchangePage = !!useMatch("/exchange")
    const isExchangePrivate = !!useMatch("/private-room")
    const isPrivateRoom = !!useMatch("/private-room");
    const isOnTransferPage = !!useMatch(`/transfers`);
    const isOnTransferPageCurr = !!useMatch(`/transfers/${currency}`);
    
    const {sm, md} = useContext(BreakpointsContext);
    const [needBottomPadding, setNeedBottomPadding] = useState<boolean>(false);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md]);
    
    useEffect(()=>{
        setNeedBottomPadding(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    return <>
        {isHomePage && (
            <div className={styles.AssetInfo3 + " " + (needBottomPadding && styles.AddBottomAssetButtonMargin)}>
                <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                    <div className={styles.NewAsset}>
                        <IconApp color="#fff" code="t67" size={20} />
                    </div>
                </NavLink>
            </div>
        )}

        <div className={styles.BottomMobile}>
            <div className={`
                ${styles.BottomMenuMobile}
                ${IS_GEKKWALLET_APP() ? styles.Gekwallet : ""}
                ${needBottomPadding ? styles.AddBottomMenuPadding : ""}
            `}>
                <FundsButton
                    to="/"
                    className={styles.BottomMenuMobileButtons + " "
                        + (isHomePage && styles.BottomMenuMobileButtonsActive)
                    }
                    isActive={isHomePage}
                />

                <TransfersButton
                    to="/transfers"
                    className={styles.BottomMenuMobileButtons + " "
                        + ((isOnTransferPage || isOnTransferPageCurr) && styles.BottomMenuMobileButtonsActive)
                    }
                    isActive={isOnTransferPage}
                />

                {IS_GEKKARD_APP() && (
                    <ExchangeButton
                        to="/exchange"
                        className={styles.BottomMenuMobileButtons + " "
                            + ((isExchangePage || isPrivateRoom) && styles.BottomMenuMobileButtonsActive)
                        }
                        isActive={isExchangePage || isExchangePrivate}
                    />
                )}

                <HistoryButton
                    to="history"
                    className={styles.BottomMenuMobileButtons + " "
                        + (isHistoryPage && styles.BottomMenuMobileButtonsActive)
                    }
                    isActive={isHistoryPage}
                />
            </div>
        </div>
    </>
}
