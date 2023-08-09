import {TypeInputCurrency} from "@/shared/ui/input-percents/model/types";
import InputItemCurrency from "@/shared/ui/input-currency/InputItemCurrency";
import InputPercentOptions from "@/shared/ui/input-percents/InputPercentOptions";

const InputCurrencyPercented = ({
    value,
    header,
    minValue,
    currency,
    allowedFlags,
    balanceFilter,
    disabled = false,
    showWill = false,
    excludedCurrencies,
    currencySelector = false,
    onChange,
    onCurrencyChange,
}: TypeInputCurrency) => {

    return (
        <InputPercentOptions
            value={value}
            header={header}
            showWill={showWill}
            disabled={disabled}
            currencyData={currency}
        >
            <InputItemCurrency
                value={value}
                balanceFilter={balanceFilter}
                disabled={disabled}
                excludedCurrencies={excludedCurrencies}
                allowedFlags={allowedFlags}
                minValue={minValue}
                currency={currency}
                currencySelector={currencySelector}
                onChange={onChange}
                onCurrencyChange={onCurrencyChange}
            />
        </InputPercentOptions>
    )
}

export default InputCurrencyPercented;
