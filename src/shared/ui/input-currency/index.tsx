import React from "react";
import InputItemCurrency from "@/shared/ui/input-currency/InputItemCurrency";
import {TypeInputCurrency} from "@/shared/ui/input-currency/model/types";
import InputCurrencyOptions from "@/shared/ui/input-currency/InputCurrencyOptions"

type IParams = TypeInputCurrency & {
    header?: string | JSX.Element
}

const InputCurrency = ({onChange, header, value, disabled = false, currency, showWill = false}: IParams) => {

    return (
        <InputCurrencyOptions value={value} showWill={showWill} header={header} availableBalance={currency.availableBalance}>
            <InputItemCurrency currency={currency} onChange={onChange} value={value} disabled={disabled}/>
        </InputCurrencyOptions>
    )
}

export default InputCurrency;
