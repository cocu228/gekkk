import { FC, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Decimal } from "decimal.js";

import CurrencySelector from "@/shared/ui/input-currency/ui/currency-selector/CurrencySelector";
import { CtxExchangeData } from "@/widgets/exchange/model/context";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { validateBalance, validateMinimumAmount } from "@/shared/config/validators";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

import styles from "./styles.module.scss";

interface SelectTokenProps {
  roomType: string;
  excludedCurrencies: string[];
  allowedFlags: CurrencyFlags[];
  balanceFilter?: boolean;
  value: string;
  className?: string;
  isBalance: boolean;
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
  className,
  onSelect,
  onError = null,
  isBalance = false,
  balanceFilter = false
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { from } = useContext(CtxExchangeData);
  const { currencies } = useContext(CtxCurrencies);

  const minAmount = currencies.get(from.currency) ? new Decimal(currencies.get(from.currency)?.minOrder).toNumber() : 0;

  const balance = currency && isBalance && currencies.get(currency).balance?.free_balance.toFixed(2);

  useEffect(() => {
    console.log("select", currency, "list excluded", excludedCurrencies);
  }, [currency]);

  const { md } = useBreakpoints();

  return (
    <>
      <div className={`${styles.SelectWrap} ${className}`} style={{ paddingBottom: balance && "5px" }}>
        <div className={`${styles.SelectedBody} ${currency && styles.CurrencyStyles}`}>
          {isBalance && currency && <span className={styles.BalanceTitle}>Balance: {balance || 0}</span>}
          <CurrencySelector
            onSelect={onSelect}
            balanceFilter={balanceFilter}
            disabled={roomType !== "default"}
            excludedCurrencies={excludedCurrencies}
            allowedFlags={allowedFlags}
          >
            {!currency ? (
              <>
                <span className={styles.SelectPreTitle}>{t("exchange.select_token")}</span>
                <IconApp code='t08' size={12} color='#3A5E66' className={styles.PreArr} />
              </>
            ) : (
              <span className={styles.SelectedToken}>
                <div className='flex items-center gap-[5px]'>
                  <IconCoin className={styles.Ico} code={currency} />
                  {currency}
                </div>
                <div className='pl-[5px] pt-[6px]'>
                  <IconApp code='t08' size={12} color='#3A5E66' className={`rotate-[90deg] ${!md && "hidden"}`} />
                </div>
              </span>
            )}
          </CurrencySelector>
        </div>
        <IconApp
          code='t08'
          size={12}
          color='#3A5E66'
          className={`${styles.deskArrow} ${currency && styles.ActiveArrow}`}
        />
        <div className={styles.InputBody}>
          <input
            value={value}
            disabled={!currency}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const valueNew: string = event.target.value;
              onChange(valueNew);
            }}
            className={`${styles.Input} ${currency && styles.InputActive}`}
            placeholder={`-${t("exchange.enter_amount").toLowerCase()}-`}
          />
        </div>
      </div>
      {onError !== null && (
        <InputCurrency.Validator
          onError={onError}
          className={`${styles.SelectValidatorText} mt-[-5px]`}
          value={+from.amount}
          description={
            !from.currency
              ? null
              : t("minimum_order_amount", {
                  amount: `${currencies.get(from.currency)?.minOrder} ${from.currency}`
                })
          }
          validators={[
            validateBalance(currencies.get(from.currency), navigate, t),
            validateMinimumAmount(minAmount, +from.amount, from.currency, t)
          ]}
        />
      )}
    </>
  );
};
