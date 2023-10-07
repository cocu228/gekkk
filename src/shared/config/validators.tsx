import {NavigateFunction} from "react-router-dom";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import Decimal from "decimal.js";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";

export type IValidatorCreator = (value: number) => IValidationResult;

interface IValidationResult {
    validated: boolean;
    errorMessage: string | JSX.Element;
}

export function validateBalance(currency: ICtxCurrency, navigate: NavigateFunction): IValidatorCreator {

    const balance = currency.availableBalance === null ? 0 : currency.availableBalance


    return (value) => ({
        validated: new Decimal(value).lte(balance),
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

export function validateMinimumAmount(min: number, value: number, $const: string): IValidatorCreator {

    const minDecimal = new Decimal(min)

    return () => {
        return ({
            validated: minDecimal.lte(value),
            errorMessage: `The minimum amount is ${minDecimal.toString()} ${$const}`
        })
    }
}
