import {TypeInputCurrency} from "@/shared/ui/input-currency/model/types";
import InputItemCurrency from "@/shared/ui/input-currency/InputItemCurrency";
import InputCurrencyOptions from "@/shared/ui/input-currency/InputCurrencyOptions";

const InputCurrency = ({
    value,
    header,
    currencyData,
    minValue,
    onChange,
    disabled = false,
    showWill = false
}: TypeInputCurrency) => {

    return (
        <InputCurrencyOptions
            value={value}
            header={header}
            currencyData={currencyData}
            showWill={showWill}
            disabled={disabled}
        >
            <InputItemCurrency
                value={value}
                currencyData={currencyData}
                onChange={onChange}
                disabled={disabled}
                minValue={minValue}
            />
        </InputCurrencyOptions>
    )
}

export default InputCurrency;
