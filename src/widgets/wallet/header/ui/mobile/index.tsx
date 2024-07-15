import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from "react-router-dom";

import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { getCurrencyRounding, toLocaleFiatRounding, toLocaleCryptoRounding } from "@/shared/lib/number-format-helper";
import ETokensConst from "@/shared/config/coins/constants";
import { apiGetRates } from "@/shared/(orval)api/gek";
import { CtxRootData } from "@/processes/RootContext";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

const WalletHeaderMobile = () => {
  const { t } = useTranslation();
  const { name, balance, decimalPrec } = useContext(CtxWalletData);
  // const { setIsCopied } = useCopyStore();
  const [params] = useSearchParams();
  const currency = params.get("currency");
  const { account } = useContext(CtxRootData);
  const tab = params.get("tab");
  const isOnAboutPage = tab === "about";
  const isEUR: boolean = currency === "EUR";

  const [rates, setRates] = useState<Record<ETokensConst, number>>();

  // const IBAN = account?.number;

  console.log("ACC", account);

  useEffect(() => {
    (async () => {
      const { data } = await apiGetRates({
        to: "EUR"
      });

      const rates: Record<string, number> = data.result;

      setRates(rates);
    })();
  }, [account]);

  /*  const ibanCopy = () => {
    navigator.clipboard.writeText(IBAN);
    setIsCopied(true);
  };*/

  return (
    <div className={`${styles.HeaderWalletMobileWrap} ${isOnAboutPage ? "" : "bg-white"}`}>
      <div className={styles.HeaderWalletMobile}>
        <div className={styles.WalletInfoHeader}>
          <div className={styles.WalletInfoHeaderIconAndName}>
            <div className='grid auto-cols-max'>
              <IconCoin width={49} code={currency} />
            </div>
            <div className={styles.WalletNameContainer}>
              <span className={styles.WalletName}>
                {name} {t("wallet")}
              </span>
            </div>
          </div>
          <div className={styles.WalletShortName}>{currency}</div>
        </div>

        <div className={styles.WalletInfoMain}>
          <div className={`${styles.WalletInfoMainText} ${styles.WalletInfoMainTextFree}`}>
            <span data-testid='wallet_free_balance' className={styles.WalletInfoMainText}>
              {(isEUR ? t("available") : t("free")).capitalize()}:
            </span>
            <span>
              {isEUR
                ? toLocaleFiatRounding(balance?.free_balance)
                : toLocaleCryptoRounding(balance?.free_balance ?? 0, decimalPrec, decimalPrec) ?? "-"}
            </span>
          </div>
          <div className={styles.DashedLine} />

          <div
            className={`${styles.WalletInfoMainText} ${
              isEUR ? styles.WalletInfoMainTextIncomeEUR : styles.WalletInfoMainTextIncome
            }`}
          >
            <span className={styles.WalletInfoMainText}>{(isEUR ? t("block") : t("income")).capitalize()}:</span>
            <span>
              <div
                style={{ fontFamily: "Azeret Mono" }}
                className={`${isEUR ? "text-[#B9B9B5]" : "text-[#45AD77]"}`}
                data-testid='wallet_lock_in_balance'
              >
                {isEUR
                  ? `${toLocaleFiatRounding(balance?.lock_in_balance) ?? "-"}`
                  : `+${toLocaleCryptoRounding(balance?.lock_in_balance ?? 0, decimalPrec, decimalPrec) ?? "-"}`}
              </div>
            </span>
          </div>
          <div className={styles.DashedLine} />

          <div className={`${styles.WalletInfoMainText} ${styles.WalletInfoMainTextOutcome}`}>
            <span className={styles.WalletInfoMainText}>{(isEUR ? t("planned") : t("outcome")).capitalize()}:</span>
            <span>
              <div
                style={{ fontFamily: "Azeret Mono" }}
                className={`${isEUR ? "text-[#B9B9B5]" : "text-[#972235]"}`}
                data-testid='wallet_lock_out_balance'
              >
                {isEUR
                  ? `${toLocaleFiatRounding(balance?.lock_out_balance) ?? "-"}`
                  : `-${toLocaleCryptoRounding(balance?.lock_out_balance ?? 0, decimalPrec, decimalPrec) ?? "-"}`}
              </div>
            </span>
          </div>
          <div className={styles.DashedLine} />

          {isEUR ? null : (
            <>
              <div className={`${styles.WalletInfoMainText} ${styles.WalletInfoMainTextOrders}`}>
                <span className={styles.WalletInfoMainText}>{t("orders").capitalize()}:</span>
                <span className={styles.LockOrders}>
                  <IconApp code='t54' color='#9D9D9D' size={9} />
                  <div data-testid='wallet_lock_orders'>
                    {" "}
                    {toLocaleCryptoRounding(balance?.lock_orders ?? 0, decimalPrec, decimalPrec) ?? "-"}
                  </div>
                </span>
              </div>
              <div className={styles.DashedLine} />
            </>
          )}
        </div>

        <div className={styles.EurGekkoinPrice}>
          {isEUR && !!balance?.bank_account_status && (
            <div className='flex group gap-[4px] items-center'>
              <span className='text-[#B9B9B5] text-[12px] font-bold flex items-center gap-[5px]'>Account status:</span>
              <p className={`text-[12px] font-normal ${balance.bank_account_status === 'ACTIVE' ? "text-[#B9B9B5]" : "text-[#8F123A]"}`}>{balance.bank_account_status}</p>
            </div>
          )}
          {/*{isEUR && (
            <div onClick={ibanCopy} className='flex group gap-[4px] items-center'>
              <span className='text-[#B9B9B5] text-[12px] group-hover:text-[#2BAB72] font-bold flex items-center gap-[5px]'>
                <IconApp color='#B9B9B5' code='t31' size={8} className='min-w-[8px] group-hover:stroke-[#2BAB72]' />
                IBAN:
              </span>
              <p className='text-[#B9B9B5] group-hover:text-[#2BAB72] text-[12px] font-normal'>{IBAN}</p>
            </div>
          )}*/}
          <span className={styles.IsEqualEuro}>
            {!isEUR && rates && rates[currency] && `${currency} = ${getCurrencyRounding(rates[currency])}€`}
          </span>
          {!isEUR && !isOnAboutPage && (
            <NavLink to={`/wallet?currency=${currency}&tab=about`}>
              <IconApp code='t32' size={15} color='#DCDCD9' />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletHeaderMobile;
