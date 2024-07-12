import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { evenOrOdd, getRoundingValue, scrollToTop } from "@/shared/lib/helpers";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { getCurrencyRounding } from "@/shared/lib/number-format-helper";
import constants from "@/shared/config/coins/constants";
import Button from "@/shared/ui/button/Button";

import { getAlignment } from "../model/helpers";
import { AssetTableKeys } from "../model/types";
import styles from "./style.module.scss";

interface AssetsTableRowProps {
  currency: ICtxCurrency;
  blockedCurrencies: string[];
  index: number;
  onSelect: (currency: string) => void;
  columnKeys: AssetTableKeys[];
  rates: Record<constants, number>;
  isModal?: boolean;
  border?: boolean;
}

export const AssetsTableRow: FC<AssetsTableRowProps> = ({
  currency,
  blockedCurrencies,
  index,
  onSelect,
  columnKeys,
  rates,
  border = false,
  isModal = true
}) => {
  const { lg, md } = useContext(BreakpointsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={`                          
                                    ${styles.Item}
                                    ${border && styles.ExchangeStyles}
                                    ${blockedCurrencies?.includes(currency.$const) ? styles.ItemBlocked : ""}
                                    ${!evenOrOdd(index) && !isModal && styles.ItemEven}
                                    ${!isModal && styles.ItemTable}
                                    
                                    ${md && styles.MobileItem}
                                    `}
      onClick={() => onSelect(currency.$const)}
      // customTemplateColumns={
      //   !(
      //     md && !!columnKeys.find((c) => c === AssetTableKeys.PRICE)
      //   )
      //     ? null
      //     : "1fr 0.58fr 0.6fr"
      // }
    >
      {columnKeys.map(key => (
        <div key={key} className={`flex ${styles.TableRow} ${getAlignment(columnKeys, key)}`}>
          {key === AssetTableKeys.NAME && (
            <div className={styles.RowItemInfoGroup}>
              <IconCoin height={md ? 40 : 29} className={styles.RowItemIcon} code={currency.$const} />
              {!md ? (
                <span className='font-medium'>{!lg || columnKeys.length === 2 ? currency.name : currency.$const}</span>
              ) : (
                <div className={styles.RowTextGroup}>
                  <span className='block font-semibold'>{currency.$const}</span>
                  <span className={`${styles.InnerName}`}>{currency.name}</span>
                </div>
              )}
            </div>
          )}
          {key === AssetTableKeys.CURRENCY && <span>{currency.$const}</span>}

          {key === AssetTableKeys.PRICE && (
            <span className={styles.PriceBlock}>
              {!rates || rates[currency.$const] === 0 ? "—" : `${getCurrencyRounding(rates[currency.$const])} €`}
            </span>
          )}

          {key === AssetTableKeys.BALANCE && (
            <div className={styles.RowBalanceWrap}>
              <span className={styles.RowBalanceTitle}>{t("free_balance")}:</span>
              <span className={styles.RowBalanceSubtitle}>
                {currency.balance?.free_balance
                  ? `${getRoundingValue(currency.balance.free_balance, currency.roundPrec)} ${currency.$const}`
                  : "—"}
              </span>
            </div>
          )}

          {key === AssetTableKeys.ACTIONS && (
            <>
              <span className={`${styles.PriceBlock} ${styles.PriceBlockMobile}`}>
                {!rates || rates[currency.$const] === 0 ? "—" : `${getCurrencyRounding(rates[currency.$const])} €`}
              </span>
              <Button
                color='blue'
                className={styles.RowBuyBtn}
                onClick={e => {
                  scrollToTop();
                  e.stopPropagation();
                  navigate(`/exchange?to=${currency.$const}`);
                }}
              >
                {t("crypto_assets.buy")}
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
