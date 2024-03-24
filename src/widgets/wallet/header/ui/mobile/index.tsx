import {useContext, useEffect, useState} from "react";
import styles from "./style.module.scss";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {useTranslation} from 'react-i18next';
import {NavLink, useMatch, useParams} from "react-router-dom";
import {getCurrencyRounding, toLocaleFiatRounding} from "@/shared/lib/number-format-helper";
import ETokensConst from "@/shared/config/coins/constants";
import {apiGetRates} from "@/shared/(orval)api/gek";
import {toLocaleCryptoRounding} from "@/shared/lib/number-format-helper";


const WalletHeaderMobile = () => {
    const {t} = useTranslation();
    const {
        name,
        balance,
        decimalPrec
    } = useContext(CtxWalletData);

    const {currency, tab} = useParams()
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
    }, [currency]);
    if (isOnProgramsPage || isOnNoFeeProgramPage || isOnCashbackProgramPage) {
        return <></>
    }

    return (
        <>
            <div className={styles.HeaderWalletMobile}>
                <div className={styles.WalletInfoContainer}>
                    <div className={styles.WalletInfoHeader}>
                        <div className={styles.WalletInfoHeaderIconAndName}>
                            <div className="grid auto-cols-max">
                                <IconCoin code={currency} />
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
                            <span className={styles.WalletInfoMainText}>{t("free").capitalize()}:</span>
                            <span>
                                {isEUR
                                    ? toLocaleFiatRounding(balance?.free_balance)
                                    : toLocaleCryptoRounding(balance?.free_balance ?? 0, decimalPrec, decimalPrec)}
                            </span>
                        </div>
                        <div className={styles.DashedLine}></div>

                        <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextIncome}>
                            <span className={styles.WalletInfoMainText}>{t("income").capitalize()}:</span>
                            <span>
                                <div>+{isEUR
                                    ? toLocaleFiatRounding(balance?.lock_in_balance)
                                    : toLocaleCryptoRounding(balance?.lock_in_balance ?? 0, decimalPrec, decimalPrec)}</div>
                            </span>
                        </div>
                        <div className={styles.DashedLine}></div>

                        <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextOutcome}>
                            <span className={styles.WalletInfoMainText}>{t("outcome").capitalize()}:</span>
                            <span>
                                <div>-{isEUR
                                    ? toLocaleFiatRounding(balance?.lock_out_balance)
                                    : toLocaleCryptoRounding(balance?.lock_out_balance ?? 0, decimalPrec, decimalPrec)}</div>
                            </span>
                        </div>
                        <div className={styles.DashedLine}></div>

                        <div className={styles.WalletInfoMainText + " " + styles.WalletInfoMainTextOrders}>
                            <span className={styles.WalletInfoMainText}>{t("orders").capitalize()}:</span>
                            <span className={styles.LockOrders}>
                                <svg className="mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                                    <path opacity="0.99" fillRule="evenodd" clipRule="evenodd" d="M4.08358 0C4.29453 0 4.50545 0 4.7164 0C5.82764 0.15846 6.589 0.703382 7.00046 1.63477C7.05556 1.7779 7.09511 1.92438 7.11912 2.07422C7.14099 2.63635 7.15746 3.19885 7.16856 3.76172C7.59169 3.86536 7.85866 4.1056 7.96946 4.48242C8.00189 5.71247 8.00848 6.94294 7.98924 8.17383C7.89615 8.61098 7.60941 8.88638 7.129 9C5.30966 9 3.49032 9 1.67098 9C1.19057 8.88638 0.903828 8.61098 0.810743 8.17383C0.791492 6.94294 0.798085 5.71247 0.830519 4.48242C0.941328 4.1056 1.2083 3.86536 1.63143 3.76172C1.64252 3.19885 1.65899 2.63635 1.68086 2.07422C1.89169 1.09 2.52781 0.430817 3.5892 0.0966797C3.75486 0.056639 3.91964 0.0244124 4.08358 0ZM4.18246 1.14258C4.82894 1.09447 5.32661 1.31126 5.67551 1.79297C5.76648 1.94179 5.8258 2.09999 5.85349 2.26758C5.86337 2.75973 5.86668 3.25192 5.86338 3.74414C4.88779 3.74414 3.91219 3.74414 2.93661 3.74414C2.9333 3.25192 2.93661 2.75973 2.94649 2.26758C3.03685 1.78766 3.33018 1.44489 3.8265 1.23926C3.94563 1.20097 4.06428 1.16875 4.18246 1.14258ZM4.24179 4.88672C4.94791 4.87579 5.35002 5.18048 5.44809 5.80078C5.43931 6.01548 5.36349 6.20884 5.22067 6.38086C5.10926 6.49183 4.9873 6.58851 4.85483 6.6709C4.91492 6.99797 4.96766 7.32611 5.01303 7.65527C5.01932 7.77862 4.95339 7.84893 4.81528 7.86621C4.53842 7.87794 4.26156 7.87794 3.98471 7.86621C3.80198 7.82575 3.73935 7.72321 3.79684 7.55859C3.84262 7.26207 3.89206 6.96618 3.94515 6.6709C3.78571 6.57025 3.64399 6.45013 3.51998 6.31055C3.23083 5.8105 3.333 5.38571 3.8265 5.03613C3.95874 4.96682 4.09717 4.91702 4.24179 4.88672Z" fill="#9D9D9D" />
                                </svg>
                                <div> {isEUR
                                    ? toLocaleFiatRounding(balance?.lock_orders)
                                    : toLocaleCryptoRounding(balance?.lock_orders ?? 0, decimalPrec, decimalPrec)}</div>
                            </span>
                        </div>
                        <div className={styles.DashedLine}></div>

                    </div>
                </div>
                <div className={styles.EurGekkoinPrice}>
                    <span className={styles.IsEqualEuro}>
                        {(!isEUR && rates && rates[currency]) && currency + " = " + getCurrencyRounding(rates[currency]) + "€"}
                    </span>
                    {(!isEUR && !isOnAboutPage) &&
                        <NavLink to={`/wallet/${currency}/about`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#D9D9D9" />
                                <circle cx="3.5" cy="7.5" r="1.5" fill="white" />
                                <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
                                <circle cx="11.5" cy="7.5" r="1.5" fill="white" />
                            </svg>
                        </NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default WalletHeaderMobile;