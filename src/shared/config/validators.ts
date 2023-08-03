export interface IValidationResult {
    validated: boolean,
    errorMessage: string
}

export function LowerThan(val: number): (value: string) => IValidationResult {
    return (value) => ({
        validated: +value < val,
        errorMessage: `Value must be lower than ${val}`
    })
}

export function GreatherThan(val: number): (value: string) => IValidationResult {
    return (value) => ({
        validated: +value > val,
        errorMessage: `Value must be greather than ${val}`
    })
}

export function Between(low: number, top: number): (value: string) => IValidationResult {
    return (value) => ({
        validated: +value > low && +value < top,
        errorMessage: `Value must be between ${low} and ${top}`
    })
}
