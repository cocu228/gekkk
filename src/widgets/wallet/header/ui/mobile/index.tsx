import {useContext, useEffect, useState} from "react";
import styles from "./style.module.scss";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {useTranslation} from 'react-i18next';
import {NavLink, useSearchParams} from "react-router-dom";
import {getCurrencyRounding, toLocaleFiatRounding} from "@/shared/lib/number-format-helper";
import ETokensConst from "@/shared/config/coins/constants";
import {apiGetRates} from "@/shared/(orval)api/gek";
import {toLocaleCryptoRounding} from "@/shared/lib/number-format-helper";
import { CtxRootData } from "@/processes/RootContext";
import { IconApp } from "@/shared/ui/icons/icon-app";


const WalletHeaderMobile = () => {
    const {t} = useTranslation();
    const {
        name,
        balance,
        decimalPrec
    } = useContext(CtxWalletData);

    const [params] = useSearchParams();
    const currency = params.get('currency');
    const {account} = useContext(CtxRootData);
    const tab = params.get('tab');
    const isOnAboutPage = tab === "about"
    const isOnProgramsPage = tab === "programs"
    const isOnNoFeeProgramPage = tab === "no_fee_program"
    const isOnCashbackProgramPage = tab === "cashback_program"

    const isEUR: boolean = currency === 'EUR';

    const [rates, setRates] = useState<Record<ETokensConst, number>>();


    useEffect(() => {
        (async () => {
            const { data } = await apiGetRates({
                to: 'EUR'
            });

            const rates: Record<string, number> = data.result;

            setRates(rates);
        })();
    }, [account]);
    if (isOnProgramsPage || isOnNoFeeProgramPage || isOnCashbackProgramPage) {
        return <></>
    }

    return (
        <>
            <div className={styles.HeaderWalletMobile}>

                <div className={styles.WalletInfoHeader}>
                    <div className={styles.WalletInfoHeaderIconAndName}>
                        <div className="grid auto-cols-max">
                            <IconCoin width={49} code={currency} />                            
                        </div>
                        <div className={styles.WalletNameContainer}>
                            <span className={styles.WalletName}>
                                {name} {t("wallet")}
                            </span>
                        </div>
                    </div>
                    <div className={styles.WalletShortName}>
                        {currency}
                    </div>
                </div>

                <div className={styles.WalletInfoMain}>
                    <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextFree}>
                        <span data-testid="wallet_free_balance" className={styles.WalletInfoMainText}>
                            {(isEUR ? t("available") : t("free")).capitalize()}:
                        </span>
                        <span>{isEUR
                            ? toLocaleFiatRounding(balance?.free_balance)
                            : toLocaleCryptoRounding(balance?.free_balance ?? 0, decimalPrec, decimalPrec) ?? '-'
                        }</span>
                    </div>
                    <div className={styles.DashedLine}></div>

                    <div className={styles.WalletInfoMainText + " " + (isEUR
                        ? styles.WalletInfoMainTextIncomeEUR
                        : styles.WalletInfoMainTextIncome
                    )}>
                        <span className={styles.WalletInfoMainText}>
                            {(isEUR ? t("block") : t("income")).capitalize()}:
                        </span>
                        <span>
                            <div data-testid="wallet_lock_in_balance">{isEUR
                                ? `${toLocaleFiatRounding(balance?.lock_in_balance) ?? '-'}`
                                : `+${toLocaleCryptoRounding(balance?.lock_in_balance ?? 0, decimalPrec, decimalPrec) ?? '-'}`
                            }</div>
                        </span>
                    </div>
                    <div className={styles.DashedLine}></div>

                    <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextOutcome}>
                        <span className={styles.WalletInfoMainText}>
                            {(isEUR ? t("planned") : t("outcome")).capitalize()}:
                        </span>
                        <span>
                            <div  data-testid="wallet_lock_out_balance">{isEUR
                                ? `${toLocaleFiatRounding(balance?.lock_out_balance) ?? '-'}`
                                : `-${toLocaleCryptoRounding(balance?.lock_out_balance ?? 0, decimalPrec, decimalPrec) ?? '-'}`
                            }</div>
                        </span>
                    </div>
                    <div className={styles.DashedLine}></div>

                    {isEUR ? null : <>
                        <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextOrders}>
                            <span className={styles.WalletInfoMainText}>{t("orders").capitalize()}:</span>
                            <span className={styles.LockOrders}>
                                <IconApp code="t54" color="#9D9D9D" size={9} />     
                                <div data-testid="wallet_lock_orders"> {toLocaleCryptoRounding(balance?.lock_orders ?? 0, decimalPrec, decimalPrec) ?? '-'}</div>
                            </span>
                        </div>
                        <div className={styles.DashedLine}></div>
                    </>}
                </div>

                <div className={styles.EurGekkoinPrice}>
                    <span className={styles.IsEqualEuro}>
                        {(!isEUR && rates && rates[currency]) && currency + " = " + getCurrencyRounding(rates[currency]) + "€"}
                    </span>
                    {(!isEUR && !isOnAboutPage) &&
                        <NavLink to={`/wallet?currency=${currency}&tab=about`}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#DCDCD9"/>
                                <circle cx="3.5" cy="7.5" r="1.5" fill="white"/>
                                <circle cx="7.5" cy="7.5" r="1.5" fill="white"/>
                                <circle cx="11.5" cy="7.5" r="1.5" fill="white"/>
                            </svg>

                        </NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default WalletHeaderMobile;
