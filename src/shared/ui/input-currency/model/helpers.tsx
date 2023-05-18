import React from "react";

export const inputCurrencyValidation = (amount, value, minAmount = 0) => {
    switch (true) {
        case value > amount:
            return <span
                className="text-red-main md:text-xs">Insufficient funds on the account: {amount}</span>
        case value < minAmount:
            return <span
                className="text-red-main md:text-xs">The minimum deposit amount is {minAmount}</span>
        default:
            return <span
                className="text-green md:text-xs">The minimum deposit amount is {minAmount}</span>

    }
}