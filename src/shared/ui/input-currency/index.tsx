import React from "react";
import InputItemCurrency from "@/shared/ui/input-currency/InputItemCurrency";
import {TypeInputCurrency} from "@/shared/ui/input-currency/model/types";
import InputCurrencyOptions from "@/shared/ui/input-currency/InputCurrencyOptions"

// TODO: Сделать правки в соответствии с новым контекстом CtxCurrencyData
const InputCurrency = ({
    value,
    header,
    currency,
    onChange,
    disabled = false,
    showWill = false
}: TypeInputCurrency) => {

    return (
        <InputCurrencyOptions
            value={value}
            currency={currency.const}
            showWill={showWill}
            header={header}
            disabled={disabled}
            availableBalance={currency.availableBalance}
        >
            <InputItemCurrency
                currency={currency}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </InputCurrencyOptions>
    )
}

export default InputCurrency;
