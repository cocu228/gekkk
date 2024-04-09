import styles from "./styles.module.scss";
import { FC, useContext } from "react";
import CurrencySelector from "@/shared/ui/input-currency/ui/currency-selector/CurrencySelector";
import { CtxExchangeData } from "@/widgets/exchange/model/context";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import DownArr from "@/assets/downArr.svg?react";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { useTranslation } from "react-i18next";
import {
  validateBalance,
  validateMinimumAmount,
} from "@/shared/config/validators";
import { useNavigate } from "react-router-dom";
import Decimal from "decimal.js";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";

interface SelectTokenProps {
  roomType: string;
  excludedCurrencies: string[];
  allowedFlags: CurrencyFlags[];
  value: string;
  currency: string;
  onChange?: (value: string) => void;
  onSelect: (value: string) => void;
  onError?: (value: boolean) => void;
}

export const SelectToken: FC<SelectTokenProps> = ({
  value,
  currency,
  roomType,
  allowedFlags,
  excludedCurrencies,
  onChange,
  onSelect,
  onError = null,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { from } = useContext(CtxExchangeData);
  const { currencies } = useContext(CtxCurrencies);

  const minAmount = currencies.get(from.currency)
    ? new Decimal(currencies.get(from.currency)?.minOrder).toNumber()
    : 0;

  return (
    <>
      <div className={styles.SelectWrap}>
        <div className={`${styles.SelectedBody} ${currency && styles.CurrencyStyles}`}>
          <CurrencySelector
            balanceFilter
            onSelect={onSelect}
            disabled={roomType !== "default"}
            excludedCurrencies={excludedCurrencies}
            allowedFlags={allowedFlags}
          >
            {!currency ? (
              <>
                <span className={styles.SelectPreTitle}>
                  {t("exchange.select_token")}
                </span>
              </>
            ) : (
              <span className={styles.SelectedToken}>
                <IconCoin className={styles.Ico} code={currency} />
                {currency}
              </span>
            )}
          </CurrencySelector>
        </div>

        <div className={styles.InputBody}>
          <DownArr className={styles.Arr} />
          <input
            value={value}
            disabled={!currency}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const valueNew: string = event.target.value;
              onChange(valueNew);
            }}
            className={styles.Input}
            type="number"
            placeholder="-enter amount-"
          />
        </div>
      </div>
      {onError !== null && (
        <InputCurrency.Validator
          onError={onError}
          className="text-sm"
          value={+from.amount}
          description={
            !from.currency
              ? null
              : t("minimum_order_amount", {
                  amount:
                    currencies.get(from.currency)?.minOrder +
                    " " +
                    from.currency,
                })
          }
          validators={[
            validateBalance(currencies.get(from.currency), navigate, t),
            validateMinimumAmount(minAmount, +from.amount, from.currency, t),
          ]}
        ></InputCurrency.Validator>
      )}
    </>
  );
};
