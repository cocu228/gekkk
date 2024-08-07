import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { getCurrencyRounding, toLocaleCryptoRounding, toLocaleFiatRounding } from "@/shared/lib/number-format-helper";
import { apiGetRates } from "@/shared/(orval)api/gek";
import ETokensConst from "@/shared/config/coins/constants";
import { CtxRootData } from "@/processes/RootContext";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { IS_GEKKARD_APP } from "@/shared/lib";

import styles from "./style.module.scss";

const WalletHeader = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const currency = params.get("currency");
  const { account } = useContext(CtxRootData);

  const { name, $const, balance, decimalPrec } = useContext(CtxWalletData);

  const isEURG: boolean = $const === ETokensConst.EURG;
  const isEUR: boolean = $const === ETokensConst.EUR;
  const isGKE: boolean = $const === ETokensConst.GKE;

  const [rates, setRates] = useState<Record<ETokensConst, number>>();

  useEffect(() => {
    (async () => {
      const { data } = await apiGetRates({
        to: "EUR"
      });

      const rates: Record<string, number> = data.result;

      setRates(rates);
    })();
  }, [account]);

  return (
    <>
      <div className={styles.HeaderWalletDesktop}>
        <div className={styles.IconCoin}>
          <div className='grid auto-cols-max'>
            <IconCoin width={50} height={50} code={$const} />
          </div>
          {!isEUR && rates && rates[currency] && (
            <span className={styles.IsEqualEuro}>
              {`${$const} = ${getCurrencyRounding(rates[currency])} €`}
            </span>
          )}
        </div>
        <div className={styles.IconInfo}>
          <div data-testid='wallet_short_name' className={styles.WalletShortName}>
            {$const}
          </div>
          <div className={styles.WalletNameContainer}>
            <span data-testid='wallet_name' className={styles.WalletName}>
              {name} {t("wallet")}
            </span>
          </div>
        </div>

        {isEUR && !!balance?.bank_account_status && (
          <div className='flex group gap-[4px] items-center'>
            <span className='text-[#B9B9B5] text-[12px] font-medium flex items-center gap-[5px]'>
              {t('account_status').capitalize()}:
            </span>
            <p className={`${balance.bank_account_status === 'ACTIVE'
              ? 'text-[var(--gek-mid-grey)]'
              : 'text-[var(--gek-red)]'} text-[12px] font-medium`}>
              {t(`bank_status.${balance.bank_account_status}`).capitalize()}
            </p>
          </div>
        )}

        <div className={styles.IconBalance}>
          <div className={styles.WalletInfoMain}>
            <div className={`${styles.WalletInfoMainText} ${styles.WalletInfoMainTextFree}`}>
              <span className={styles.WalletInfoMainText}>{(isEUR ? t("available") : t("free")).capitalize()}:</span>
              <span style={{ fontFamily: "Azeret Mono" }} className='font-bold' data-testid='wallet_free_balance'>
                {(isEUR
                  ? toLocaleFiatRounding(balance?.free_balance)
                  : toLocaleCryptoRounding(balance?.free_balance, decimalPrec, decimalPrec)) ?? "-"}
              </span>
            </div>
            <div className={styles.DashedLine} />

            <div
              className={`
                ${styles.WalletInfoMainText}
                ${isEUR ? styles.WalletInfoMainTextIncomeEUR : styles.WalletInfoMainTextIncome}
              `}
            >
              <span className={`${styles.WalletInfoMainText}`}>{(isEUR ? t("block") : t("income")).capitalize()}:</span>
              <span>
                <div
                  style={{ fontFamily: "Azeret Mono" }}
                  className={`${isEUR ? "text-[#B9B9B5]" : "text-[#45AD77]"}`}
                  data-testid='wallet_lock_in_balance'
                >
                  {isEUR
                    ? `${toLocaleFiatRounding(balance?.lock_in_balance) ?? "-"}`
                    : `+${toLocaleCryptoRounding(balance?.lock_in_balance, decimalPrec, decimalPrec) ?? "-"}`}
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
                    : `-${toLocaleCryptoRounding(balance?.lock_out_balance, decimalPrec, decimalPrec) ?? "-"}`}
                </div>
              </span>
            </div>
            <div className={styles.DashedLine} />

            {isEUR ? null : (
              <>
                <div className={`${styles.WalletInfoMainText} ${styles.WalletInfoMainTextOrders}`}>
                  <span className={styles.WalletInfoMainText}>{t("orders").capitalize()}:</span>
                  <span className={styles.LockOrders}>
                    <IconApp code='t54' color='#B9B9B5' size={9} />
                    <div style={{ fontFamily: "Azeret Mono" }} data-testid='wallet_lock_orders'>
                      {" "}
                      {toLocaleCryptoRounding(balance?.lock_orders ?? 0, decimalPrec, decimalPrec) ?? "-"}
                    </div>
                  </span>
                </div>
                <div className={styles.DashedLine} />
              </>
            )}
          </div>
        </div>
        {IS_GEKKARD_APP() && isEUR ? (
          <div className={styles.IconRate}>
            <span className={styles.RateText}>{t("card")}</span>
            <span className={styles.RatePercentText}>1% {t("cashback")}</span>
          </div>
        ) : isEURG ? (
          <div className={styles.IconRate}>
            <span className={styles.RateText}>{t("rate")}</span>
            <span className={styles.RatePercentText}>4% {t("partnership_program.per_annum")}</span>
          </div>
        ) : isGKE ? (
          <div className={styles.IconRate}>
            <span className={styles.RateText}>{t("rate")}</span>
            <span className={styles.RatePercentText}>5%(or 3%) {t("partnership_program.per_annum")}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default WalletHeader;
