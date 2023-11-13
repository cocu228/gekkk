import {NavigateFunction} from "react-router-dom";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import Decimal from "decimal.js";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";
import { useTranslation } from 'react-i18next';

export type IValidatorCreator = (value: number) => IValidationResult;

interface IValidationResult {
    validated: boolean;
    errorMessage: string | JSX.Element;
}

export function validateBalance(currency: ICtxCurrency, navigate: NavigateFunction): IValidatorCreator {
    const {t} = useTranslation();
    const balance = currency.availableBalance === null ? 0 : currency.availableBalance


    return (value) => ({
        validated: new Decimal(value).lte(balance),
        errorMessage: <span className="text-fs12">
            {t("no_have_enough_funds")} <span className="text-blue-400 hover:cursor-pointer hover:underline"
                                                      onClick={() => navigate(`/wallet/${currency.$const}/top_up`)}
            >{t("top_up")}</span> {t("your_currency_account", {currency: currency.$const})}
        </span>
    })
}

export function validateMaximumAmount(max: number, value: number, $const: string): IValidatorCreator {
    const {t} = useTranslation();
    const maxDecimal = new Decimal(max)

    return () => ({
        validated: maxDecimal.isZero() || maxDecimal.greaterThan(value),
        errorMessage: `${t("maximum_amount")} ${max} ${$const}`
    })
}

export function validateMinimumAmount(min: number, value: number, $const: string): IValidatorCreator {
    const {t} = useTranslation();
    const minDecimal = new Decimal(min)

    return () => {
        return ({
            validated: minDecimal.lte(value),
            errorMessage: `${t("minimum_amount")} ${minDecimal.toString()} ${$const}`
        })
    }
}
