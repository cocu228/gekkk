import styles from "../../../widgets/sidebar/ui/desktop/style.module.scss"
import { scrollToTop } from "@/shared/lib/helpers";
import { NavLink, useMatch } from 'react-router-dom';
import { toLocaleFiatRounding } from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useCallback, useContext, useRef } from "react";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';

import NewAssetMobileIcon from "@public/img/icon/NewAssetMobileIcon.svg"


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
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return(
        <>
            {isOnMainPages &&
                <div className={styles.BottomMobile}>
                    {!!homePage &&
                        <div>
                            <div className={styles.AssetInfo2} >
                                <div className={styles.AssetInfo3}>
                                    <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                                        <div className={styles.NewAsset}>
                                            <img src={NewAssetMobileIcon} className={styles.NewAssetIcon} alt="" />
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                            
                        </div>
                    }
                        <div className={styles.BottomMenuMobile}>
                            <NavLink to={"/"}>
                                <div className={styles.BottomMenuMobileButtons +` ${homePage && styles.BottomMenuButtonsActive}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V9.33333C17.5 8.39991 17.5 7.9332 17.3183 7.57668C17.1586 7.26308 16.9036 7.00811 16.59 6.84832C16.2335 6.66667 15.7668 6.66667 14.8333 6.66667L5.16667 6.66667C4.23325 6.66667 3.76654 6.66667 3.41002 6.84832C3.09641 7.00811 2.84144 7.26308 2.68166 7.57668C2.5 7.9332 2.5 8.39991 2.5 9.33333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z" fill={!!homePage && "#3A5E66"}/>
                                        <path d="M2.5 12.5V8.37289C2.5 7.75473 2.5 7.44566 2.59625 7.17486C2.68135 6.93546 2.82005 6.71868 3.00175 6.5411C3.20729 6.34022 3.48792 6.2107 4.04918 5.95166M2.5 9.33333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V9.33333C17.5 8.39991 17.5 7.9332 17.3183 7.57668C17.1586 7.26308 16.9036 7.00811 16.59 6.84832C16.2335 6.66667 15.7668 6.66667 14.8333 6.66667L5.16667 6.66667C4.23325 6.66667 3.76654 6.66667 3.41002 6.84832C3.09641 7.00811 2.84144 7.26308 2.68166 7.57668C2.5 7.9332 2.5 8.39991 2.5 9.33333Z" stroke={!!homePage && "#F7F7F0"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13.3333 6.66666V3.75054C13.3333 3.05742 13.3333 2.71087 13.1873 2.49789C13.0598 2.31181 12.8622 2.18541 12.6398 2.14756C12.3852 2.10424 12.0706 2.24947 11.4413 2.53993L4.04918 5.95165C3.48792 6.2107 3.20729 6.34022 3.00175 6.54109C2.82005 6.71868 2.68135 6.93545 2.59625 7.17485C2.5 7.44565 2.5 7.75473 2.5 8.37288V12.5M13.75 12.0833H13.7583M2.5 9.33333L2.5 14.8333C2.5 15.7667 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1585 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1585 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7667 17.5 14.8333V9.33333C17.5 8.39991 17.5 7.9332 17.3183 7.57668C17.1586 7.26307 16.9036 7.00811 16.59 6.84832C16.2335 6.66666 15.7668 6.66666 14.8333 6.66666L5.16667 6.66666C4.23325 6.66666 3.76654 6.66666 3.41002 6.84832C3.09641 7.00811 2.84144 7.26307 2.68166 7.57668C2.5 7.9332 2.5 8.39991 2.5 9.33333ZM14.1667 12.0833C14.1667 12.3134 13.9801 12.5 13.75 12.5C13.5199 12.5 13.3333 12.3134 13.3333 12.0833C13.3333 11.8532 13.5199 11.6667 13.75 11.6667C13.9801 11.6667 14.1667 11.8532 14.1667 12.0833Z" stroke={!!homePage ? "#3A5E66" : "#9D9D9D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13.75 12.0833H13.7583M14.1666 12.0833C14.1666 12.3134 13.9801 12.5 13.75 12.5C13.5199 12.5 13.3333 12.3134 13.3333 12.0833C13.3333 11.8532 13.5199 11.6666 13.75 11.6666C13.9801 11.6666 14.1666 11.8532 14.1666 12.0833Z" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Funds</span>
                                </div>
                            </NavLink>
                            
                            <div className={styles.BottomMenuMobileButtons +` ${transfersPage && styles.BottomMenuButtonsActive}`}>
                                <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clip-path="url(#clip0_568_127)">
                                        <path d="M8.74958 11.25L17.4996 2.50004M8.8559 11.5234L11.046 17.1551C11.2389 17.6512 11.3354 17.8993 11.4744 17.9717C11.5949 18.0345 11.7384 18.0346 11.859 17.9719C11.9981 17.8997 12.0949 17.6517 12.2884 17.1558L17.7803 3.0827C17.955 2.63505 18.0424 2.41123 17.9946 2.2682C17.9531 2.144 17.8556 2.04652 17.7314 2.00503C17.5884 1.95725 17.3646 2.0446 16.9169 2.21929L2.84379 7.71124C2.3479 7.90476 2.09995 8.00152 2.02769 8.14061C1.96505 8.26118 1.96514 8.40472 2.02792 8.52522C2.10034 8.66422 2.3484 8.76069 2.84452 8.95363L8.47619 11.1437C8.5769 11.1829 8.62725 11.2025 8.66965 11.2327C8.70724 11.2595 8.7401 11.2924 8.76691 11.33C8.79715 11.3724 8.81673 11.4227 8.8559 11.5234Z" stroke={!!transfersPage ? "#3A5E66" : "#9D9D9D"} fill={!!transfersPage ? "#3A5E66" : "none"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_568_127">
                                        <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>                           
                                <span>Transfers</span>
                            </div>
                            <NavLink to={"exchange"}>
                                <div className={styles.BottomMenuMobileButtons +` ${exchangePage && styles.BottomMenuButtonsActive}`}>
                                    <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M1.66669 8.33333C1.66669 8.33333 1.76779 7.62563 4.69672 4.6967C7.62565 1.76777 12.3744 1.76777 15.3033 4.6967C16.341 5.73443 17.0111 7.0006 17.3135 8.33333M1.66669 8.33333V3.33333M1.66669 8.33333H6.66669M18.3334 11.6667C18.3334 11.6667 18.2323 12.3744 15.3033 15.3033C12.3744 18.2322 7.62565 18.2322 4.69672 15.3033C3.65899 14.2656 2.98893 12.9994 2.68654 11.6667M18.3334 11.6667V16.6667M18.3334 11.6667H13.3334" stroke={!!exchangePage ? "#3A5E66" : "#9D9D9D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Exchange</span>
                                </div>
                            </NavLink>
                            
                            <div className={styles.BottomMenuMobileButtons +` ${historyPage && styles.BottomMenuButtonsActive}`}>
                                <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M11.6666 9.16667H6.66665M8.33331 12.5H6.66665M13.3333 5.83334H6.66665M16.6666 5.66667V14.3333C16.6666 15.7335 16.6666 16.4335 16.3942 16.9683C16.1545 17.4387 15.772 17.8212 15.3016 18.0609C14.7668 18.3333 14.0668 18.3333 12.6666 18.3333H7.33331C5.93318 18.3333 5.23312 18.3333 4.69834 18.0609C4.22793 17.8212 3.84548 17.4387 3.6058 16.9683C3.33331 16.4335 3.33331 15.7335 3.33331 14.3333V5.66667C3.33331 4.26654 3.33331 3.56647 3.6058 3.0317C3.84548 2.56129 4.22793 2.17884 4.69834 1.93916C5.23312 1.66667 5.93318 1.66667 7.33331 1.66667H12.6666C14.0668 1.66667 14.7668 1.66667 15.3016 1.93916C15.772 2.17884 16.1545 2.56129 16.3942 3.0317C16.6666 3.56647 16.6666 4.26654 16.6666 5.66667Z" stroke="#9D9D9D" fill={!!historyPage ? "#3A5E66" : "none"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>  
                                <span>History</span>
                            </div>

                        </div>
                    
                </div>    
            }
        </>
    )
}