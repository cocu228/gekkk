import {NavigateFunction} from "react-router-dom";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import Decimal from "decimal.js";

export type IValidatorCreator = (value: string) => IValidationResult;

interface IValidationResult {
    validated: boolean;
    errorMessage: string | JSX.Element;
}

export function validateBalance(currency: ICtxCurrency, navigate: NavigateFunction): IValidatorCreator {
    return (value) => ({
        validated: new Decimal(value).lte(new Decimal(currency.availableBalance)),
        errorMessage: <span className="text-fs12">
            You don't have enough funds. Please <span className="text-blue-400 hover:cursor-pointer hover:underline"
                                                      onClick={() => navigate(`/wallet/${currency.$const}/Top Up`)}
            >top up</span> your {currency.$const} account.
        </span>
    })
}

export function validateMaximumAmount(max: number): IValidatorCreator {
    return (value) => ({
        validated: +value <= max,
        errorMessage: `The maximum amount is ${max}`
    })
}

export function validateMinimumAmount(min: number): IValidatorCreator {
    return (value) => ({
        validated: +value >= min,
        errorMessage: `The minimum amount is ${min}`
    })
}
