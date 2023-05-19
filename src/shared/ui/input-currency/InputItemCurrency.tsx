import React, {useContext, useEffect} from "react";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import {Input as InputAnt} from "antd";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxInputCurrencyOptions} from "@/shared/ui/input-currency/model/context";
import {TypeInputCurrency} from "@/shared/ui/input-currency/model/types";
import {inputCurrencyValidation} from "@/shared/ui/input-currency/model/helpers";

export default ({onChange, value, disabled = false, currency}: TypeInputCurrency) => {

    const n = useContext(CtxInputCurrencyOptions)

    useEffect(() => {
        if (n) {
            onChange(n)
        }
    }, [n])

    return <FormItem className="relative"
                     extra={inputCurrencyValidation(currency.availableBalance, value, currency.minAmount)}>
        <InputAnt
            onChange={({target}) => onChange(formatAsNumberAndDot(target.value))}
            disabled={disabled}
            value={value}
            placeholder={"Enter amount"}
            suffix={
                <>
                    <IconCoin width={34} height={34} code={currency.const}/>
                    <span className="text-sm font-medium">{currency.const}</span>
                </>
            }
        />
        <p className="text-xs text-gray-400 absolute top-11 left-3 z-10">Balance: {currency.availableBalance} {currency.const}</p>
    </FormItem>
}
