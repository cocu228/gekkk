import {ICtxCurrencyData} from "@/processes/RootContext";

export type IValidatorCreator = (value: string) => IValidationResult;

interface IValidationResult {
    validated: boolean,
    errorMessage: string
}

export function ValidateBalance(currency: ICtxCurrencyData): IValidatorCreator {
    return (value) => ({
        validated: +value < +currency.availableBalance,
        errorMessage: `You don't have enough funds`
    })
}

export function MaximumAmount(max: number): IValidatorCreator {
    return (value) => ({
        validated: +value >= max,
        errorMessage: `The maximum amount is ${max}`
    })
}

export function MinimumAmount(min: number): IValidatorCreator {
    return (value) => ({
        validated: +value >= min,
        errorMessage: `The minimum amount is ${min}`
    })
}
