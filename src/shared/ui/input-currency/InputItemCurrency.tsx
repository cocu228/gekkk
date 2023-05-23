import {useContext, useEffect} from "react";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import {Input as InputAnt} from "antd";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxInputCurrencyOptions} from "@/shared/ui/input-currency/model/context";
import {TypeInputCurrency} from "@/shared/ui/input-currency/model/types";
import {inputCurrencyValidation} from "@/shared/ui/input-currency/model/helpers";

export default ({onChange, value, disabled = false, currencyData, minValue}: TypeInputCurrency) => {

    const n = useContext(CtxInputCurrencyOptions)

    useEffect(() => {
        if (n) {
            onChange(n.toString())
        }
    }, [n])

    return <FormItem 
                className="relative"
                extra={inputCurrencyValidation(
                    !currencyData.availableBalance ? 0 : currencyData.availableBalance.toNumber(),
                    +value,
                    minValue
                )}
            >
        <InputAnt
            onChange={({target}) => onChange(target.value.toString())}
            disabled={disabled}
            value={value}
            placeholder={"Enter amount"}
            suffix={
                <>
                    <IconCoin width={34} height={34} code={currencyData.currency}/>
                    <span className="text-sm font-medium">{currencyData.currency}</span>
                </>
            }
        />
        <p className="text-xs text-gray-400 absolute top-11 left-3 z-10">
            Balance: {!currencyData.availableBalance ? 0 :
                currencyData.availableBalance.toString()
            } {currencyData.currency}
        </p>
    </FormItem>
}
