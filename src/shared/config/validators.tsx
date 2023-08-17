import {NavigateFunction, useNavigate} from "react-router-dom";
import {ICtxCurrencyData} from "@/processes/RootContext";

export type IValidatorCreator = (value: string) => IValidationResult;

interface IValidationResult {
    validated: boolean;
    errorMessage: string | JSX.Element;
}

export function validateBalance(currency: ICtxCurrencyData, navigate: NavigateFunction): IValidatorCreator {
    return (value) => ({
        validated: +value <= +currency.availableBalance,
        errorMessage: <>
            You don't have enough funds. <br/>
            Please <span
                className="text-blue-400 hover:cursor-pointer hover:underline"
                onClick={() => navigate(`/wallet/${currency.$const}/Top Up`)}
            >top up</span> your {currency.$const} account.
        </>
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
