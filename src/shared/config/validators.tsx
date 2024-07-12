import { NavigateFunction } from "react-router-dom";
import { TFunction } from "i18next";

import { ICtxCurrency } from "@/processes/CurrenciesContext";

export type IValidatorCreator = (value: number) => IValidationResult;

interface IValidationResult {
  validated: boolean;
  errorMessage: string | JSX.Element;
}

export function validateBalance(currency: ICtxCurrency, navigate: NavigateFunction, t: TFunction): IValidatorCreator {
  const balance = !currency?.balance?.free_balance ? 0 : currency.balance?.free_balance;

  return value => ({
    validated: value <= balance,
    errorMessage: (
      <span>
        {t("no_have_enough_funds")}{" "}
        <span
          className='font-bold underline hover:cursor-pointer hover:underline'
          onClick={() => navigate(`/wallet?currency=${currency.$const}&tab=top_up`)}
        >
          {t("top_up")}
        </span>{" "}
        {t("your_currency_account", { currency: currency.$const })}
      </span>
    )
  });
}

export function validateMaximumAmount(max: number, value: number, $const: string, t: TFunction): IValidatorCreator {
  return () => ({
    validated: max === 0 || max > value,
    errorMessage: `${t("maximum_amount")} ${max} ${$const}`
  });
}

export function validateMinimumAmount(min: number, value: number, $const: string, t: TFunction): IValidatorCreator {
  return () => ({
    validated: min <= value,
    errorMessage: `${t("minimum_amount")} ${min} ${$const}`
  });
}
