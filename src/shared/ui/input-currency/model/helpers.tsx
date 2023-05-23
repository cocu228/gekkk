export const inputCurrencyValidation = (
    balanceAmount: number,
    value: number,
    minAmount: number = 0
) => {
    switch (true) {
        case value > balanceAmount:
            return <span className="text-red-main md:text-xs">
                Insufficient funds on the account: {balanceAmount}
            </span>
        case value < minAmount:
            return <span className="text-red-main md:text-xs">
                The minimum amount is {minAmount}
            </span>
        default:
            return <span className="text-green md:text-xs">
                {!(minAmount >= 0) ? null : `The minimum amount is ${minAmount}`}
            </span>
    }
}
