import React, {useContext, useState} from "react";
import Select from "@/shared/ui/select/Select";
import {typeQuickExchangeForSelect} from "@/widgets/wallet/quick-exchange/model/entitys";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
// import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Button from "@/shared/ui/button/Button";

export const QuickExchange = () => {

    const {currencies} = useContext(CtxCurrencies)

    const [state, setState] = useState({
        typeOperation: "EURToCrypto",
        currency: {
            converted: currencies.get("EUR"),
            receive: currencies.get("BTC")
        }
    });

    const onChangeForSelect = (value: string) => setState(prev => ({...prev, typeOperation: value}))

    const converted = useInputState()
    const receive = useInputState()
    // const {inputCurrValid, setInputCurrValid} = useInputValidateState()


    const onSelectConverted = ($const: string) => {
        setState(prev => ({
            ...prev, currency: {
                ...prev.currency,
                converted: currencies.get($const)
            }
        }))
    };

    const onSelectReceive = ($const: string) => {
        setState(prev => ({
            ...prev, currency: {
                ...prev.currency,
                receive: currencies.get($const)
            }
        }))
    };

    return <>
        <div className="row mb-2">
            <div className="col">
                <span className="font-medium">Select a type of quick exchange</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <Select className="w-full"
                        onChange={onChangeForSelect}
                        name={"typeQuickExchange"}
                        options={typeQuickExchangeForSelect}
                        placeholder={"Type of quick exchange"}
                        value={state.typeOperation}
                />
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <InputCurrency.PercentSelector
                    currency={state.currency.receive}
                    header={<span className='text-gray-600 font-medium'>Pay from</span>}
                    onSelect={receive.setInputCurr}
                >
                    <InputCurrency.CurrencySelector onSelect={onSelectReceive}>
                        <InputCurrency onChange={receive.setInputCurr}
                                       value={receive.inputCurr.value.string}
                                       currency={state.currency.receive.$const}/>
                    </InputCurrency.CurrencySelector>
                </InputCurrency.PercentSelector>
            </div>
        </div>
        <div className="row mb-10">
            <div className="col">
                <InputCurrency.CurrencySelector
                    onSelect={onSelectConverted}>
                    <InputCurrency
                        onChange={converted.setInputCurr}
                        value={converted.inputCurr.value.string}
                        currency={state.currency.converted.$const}/>
                </InputCurrency.CurrencySelector>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="wrapper">
                    <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
                        <div className="col text-xl font-bold">
                            <span>1 {state.currency.receive.$const} = 1 {state.currency.converted.$const}*</span>
                        </div>

                        <div className="col text-xs">
                            <span
                                className="font-normal"> The final exchange rate may differ from the value shown.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="row flex gap-4 text-gray-400 font-medium mb-14 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>You will pay</span>
                        </div>
                        <div className="row">
                        <span>
                          You will get
                        </span>
                        </div>
                        {/*<div className="row">*/}
                        {/*    <span>*/}
                        {/*  Fee*/}
                        {/*</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{converted.inputCurr.value.number} {state.currency.converted.$const}</span>
                        </div>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{receive.inputCurr.value.number} {state.currency.receive.$const}</span>
                        </div>
                        {/*<div className="row flex items-end">*/}
                        {/*    {loading ? "Loading..." : <span*/}
                        {/*        className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!receive.inputCurr.value.number}
                    className="w-full">
                    Exchange
                </Button>
            </div>
        </div>
    </>
}
