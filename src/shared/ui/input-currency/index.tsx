import {Input as InputAnt, InputProps} from "antd";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import React, {useContext, useEffect, useState} from "react";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";

const CtxInputCurrencyOptions = React.createContext(null)

type TypeInputCurrency = {
    onChange: (v: string) => void,
    value: number | null,
    disabled?: boolean,
    showWill?: boolean,
    currency: {
        const: string,
        availableBalance?: number,
        minAmount?: number
    }
}


const InputCurrency = ({onChange, value, disabled = false, currency, showWill = false}: TypeInputCurrency) => {

    return (
        <InputCurrencyOptions value={value} showWill={showWill} availableBalance={currency.availableBalance}>
            <Input currency={currency} onChange={onChange} value={value} disabled={disabled}/>
        </InputCurrencyOptions>
    )
}

const Input = ({onChange, value, disabled = false, currency}: TypeInputCurrency) => {

    const n = useContext(CtxInputCurrencyOptions)

    useEffect(() => {
        if (n) {
            onChange(n)
        }
    }, [n])

    return <FormItem className="relative"
                     extra={currency.minAmount !== undefined && <span
                         className="text-green md:text-xs">The minimum deposit amount is {currency.minAmount} {currency.const}</span>}>
        <InputAnt
            onChange={({target}) => onChange(formatAsNumberAndDot(target.value))}
            disabled={disabled}
            value={value}
            className="mb-1"
            suffix={
                <>
                    <IconCoin code={currency.const}/>
                    <span className="text-sm font-medium">{currency.const}</span>
                </>
            }
        />
        <p className="text-xs text-gray-400 absolute top-11 left-3 z-10">Balance: {currency.availableBalance} {currency.const}</p>
    </FormItem>
}

const InputCurrencyOptions = ({children, availableBalance, showWill, value}) => {

    const [state, setState] = useState(null)
    const [will, setWill] = useState(false)


    const onBtnClick = (percent) => {

        return setState((percent / 100) * availableBalance)
    }
    const onBtnWill = (v) => {

        return setWill(v === "give")
    }

    return <CtxInputCurrencyOptions.Provider value={state}>
        <div className="row">
            <div className="col">
                <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                    <div className="row flex justify-between mb-2 md:mb-1 items-center">
                        {showWill && <div className="wrapper flex text-xs gap-1">
                            <p className="text-gray-400 font-medium md:text-sm sm:text-xs">
                                I want to
                            </p>
                            <PercentBtn active={will} onClick={() => onBtnWill("give")}>give</PercentBtn>
                            <PercentBtn active={!will} onClick={() => onBtnWill("receive")}>receive</PercentBtn>
                        </div>}

                        <div className="row flex gap-1 text-xs">
                            <PercentBtn onClick={() => onBtnClick(25)}>25%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(50)}>50%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(75)}>75%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(100)}>100%</PercentBtn>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
        {showWill && <div className="row flex gap-4 text-gray-400 font-medium mb-14">
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row">
                    <span>You will pay</span>
                </div>
                <div className="row">
                        <span>
                          You will get
                        </span>
                </div>
            </div>
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row flex items-end">
                    <span className="w-full text-end">{value}</span>
                </div>
                <div className="row flex items-end">
                    <span className="w-full text-end">{value}</span>
                </div>
            </div>
        </div>}
    </CtxInputCurrencyOptions.Provider>
}


export default InputCurrency