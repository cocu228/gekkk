import Decimal from "decimal.js";

export const inputCurrencyValidation = (
    balanceAmount: Decimal,
    value: string | number,
    minAmount: Decimal,
    validateBalance: boolean
) => {
    switch (true) {
        case isNaN(+value):
            return <span className="text-red-main md:text-xs">
                Amount must contains only numbers!
            </span>

        case validateBalance && balanceAmount.lessThan(+value):
            return <span className="text-red-main md:text-xs">
                Insufficient funds on the account: {balanceAmount.toString()}
            </span>

        case minAmount.lessThanOrEqualTo(0):
            return null;

        case minAmount.greaterThan(+value):
            return <span className="text-red-main md:text-xs">
                The minimum amount is {minAmount.toString()}
            </span>

        default:
            return <span className="text-green md:text-xs">
                The minimum amount is {minAmount.toString()}
            </span>
    }
}
