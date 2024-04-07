import { NavLink, useMatch } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo, useContext } from "react"
import { CtxCurrencies } from "@/processes/CurrenciesContext"
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context"
import { useTranslation } from "react-i18next"

interface IParams {
    wallet?: boolean
}

const ExchangeButton = memo(({wallet}:IParams) => {
    const {t} = useTranslation();
    const exchangePage = useMatch("/exchange");
    const privateRoom = useMatch("/private-room");
    const {currencies} = useContext(CtxCurrencies);

    let $constant;

    if(wallet && currencies){
        const {$const} = useContext(CtxWalletData);
        $constant = currencies.get($const);
    }

    return(
        <>
            <NavLink to={$constant?.$const ?`/exchange?from=${$constant?.$const}`:"/exchange"}>
                <div className={styles.BottomMenuMobileButtons +` ${(exchangePage || privateRoom || wallet) && styles.BottomMenuButtonsActive}`}>
                    <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1.66669 8.33333C1.66669 8.33333 1.76779 7.62563 4.69672 4.6967C7.62565 1.76777 12.3744 1.76777 15.3033 4.6967C16.341 5.73443 17.0111 7.0006 17.3135 8.33333M1.66669 8.33333V3.33333M1.66669 8.33333H6.66669M18.3334 11.6667C18.3334 11.6667 18.2323 12.3744 15.3033 15.3033C12.3744 18.2322 7.62565 18.2322 4.69672 15.3033C3.65899 14.2656 2.98893 12.9994 2.68654 11.6667M18.3334 11.6667V16.6667M18.3334 11.6667H13.3334" stroke={(!!exchangePage || !!privateRoom || wallet) ? "#29354C" : "#9D9D9D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{t("exchange_button")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default ExchangeButton
