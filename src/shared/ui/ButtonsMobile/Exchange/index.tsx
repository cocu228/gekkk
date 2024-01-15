import { NavLink, useMatch, useParams } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo, useContext, useEffect } from "react"
import { CtxCurrencies } from "@/processes/CurrenciesContext"
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context"

interface IParams {
    wallet?: boolean
}

const ExchangeButton = memo(({wallet}:IParams) => {
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage
    let $constant
    if(wallet){
        const {$const} = useContext(CtxWalletData);  
        $constant = $const
    }
    

    return(
        <>
            <NavLink state={$constant} to={"/exchange"}>
                <div className={styles.BottomMenuMobileButtons +` ${(exchangePage || wallet) && styles.BottomMenuButtonsActive}`}>
                    <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1.66669 8.33333C1.66669 8.33333 1.76779 7.62563 4.69672 4.6967C7.62565 1.76777 12.3744 1.76777 15.3033 4.6967C16.341 5.73443 17.0111 7.0006 17.3135 8.33333M1.66669 8.33333V3.33333M1.66669 8.33333H6.66669M18.3334 11.6667C18.3334 11.6667 18.2323 12.3744 15.3033 15.3033C12.3744 18.2322 7.62565 18.2322 4.69672 15.3033C3.65899 14.2656 2.98893 12.9994 2.68654 11.6667M18.3334 11.6667V16.6667M18.3334 11.6667H13.3334" stroke={(!!exchangePage || wallet) ? "#1F3446" : "#9D9D9D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Exchange</span>
                </div>
            </NavLink>
        </>
    )
})

export default ExchangeButton
