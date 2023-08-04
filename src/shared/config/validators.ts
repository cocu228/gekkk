export type IValidatorCreator = (value: string) => IValidationResult;

interface IValidationResult {
    validated: boolean,
    errorMessage: string
}

export function LowerThan(val: number): IValidatorCreator {
    return (value) => ({
        validated: +value < val,
        errorMessage: `Value must be lower than ${val}`
    })
}

export function GreatherThan(val: number): IValidatorCreator {
    return (value) => ({
        validated: +value > val,
        errorMessage: `Value must be greather than ${val}`
    })
}

export function Between(low: number, top: number): IValidatorCreator {
    return (value) => ({
        validated: +value > low && +value < top,
        errorMessage: `Value must be between ${low} and ${top}`
    })
}

export function MinimumAmount(min: number): IValidatorCreator {
    return (value) => ({
        validated: +value >= min,
        errorMessage: `The minimum amount is ${min}`
    })
}
