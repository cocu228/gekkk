import s from "./styles.module.scss";
import { FC, useContext, useState } from "react";
import CurrencySelector from "@/shared/ui/input-currency/ui/currency-selector/CurrencySelector";
import { CtxExchangeData } from "@/widgets/exchange/model/context";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import Input from "@/shared/ui/input/Input";
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

interface SelectTokenProps {
  roomType: string;
  excludedCurrencies: any;
  allowedFlags: any;
  onSelect: any;
  currency: any;
  valueChange?: any;
  isValidator?: boolean;
}

export const SelectToken: FC<SelectTokenProps> = ({
  roomType,
  excludedCurrencies,
  allowedFlags,
  onSelect,
  currency,
  isValidator,
  valueChange,
}) => {
  const { from } = useContext(CtxExchangeData);

  const { currencies } = useContext(CtxCurrencies);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const minAmount = currencies.get(from.currency)
    ? new Decimal(currencies.get(from.currency)?.minOrder).toNumber()
    : 0;

  return (
    <>
      <div className={s.select_wrap}>
        <div className={s.selected_body}>
          <CurrencySelector
            balanceFilter
            onSelect={onSelect}
            disabled={roomType !== "default"}
            excludedCurrencies={excludedCurrencies}
            allowedFlags={allowedFlags}
            className={s.custom_selector}
          >
            {!currency ? (
              <span className={s.select_preTitle}>{t("select_token")}</span>
            ) : (
              <span className={s.selected_token}>
                <IconCoin width={34} height={34} code={currency} />
                {currency}
              </span>
            )}
          </CurrencySelector>
          <DownArr className="min-w-[7px] h-[12px]" />
        </div>

        <div className={s.input_body}>
          <input
            onChange={(event) => {
              const value: string = event.target.value;
              valueChange(value);
            }}
            className={s.input}
            type="number"
            placeholder="-enter amount-"
          />
        </div>
      </div>
      {isValidator && (
        <InputCurrency.Validator
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
