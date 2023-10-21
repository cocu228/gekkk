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
            EUR: currencies.get("EUR"),
            Crypto: currencies.get("BTC")
        }
    });

    const onChangeForSelect = (value: string) => {
        stateInputEUR.setInputCurr("");
        stateInputCrypto.setInputCurr("");
        setState(prev => ({...prev, typeOperation: value}));
    }

    const stateInputEUR = useInputState()
    const stateInputCrypto = useInputState()
    // const {inputCurrValid, setInputCurrValid} = useInputValidateState()


    const onSelectConverted = ($const: string) => {
        setState(prev => ({
            ...prev, currency: {
                ...prev.currency,
                Crypto: currencies.get($const)
            }
        }))
    };

    const InputEUR =
        <InputCurrency onChange={stateInputEUR.setInputCurr}
                       value={stateInputEUR.inputCurr.value.string}
                       currency={state.currency.EUR.$const}/>

    const InputCrypto = <InputCurrency.CurrencySelector
        onSelect={onSelectConverted}>
        <InputCurrency
            onChange={stateInputCrypto.setInputCurr}
            value={stateInputCrypto.inputCurr.value.string}
            currency={state.currency.Crypto.$const}/>
    </InputCurrency.CurrencySelector>

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
                    currency={state.typeOperation === "EURToCrypto" ?
                        state.currency.EUR :
                        state.currency.Crypto}
                    onSelect={state.typeOperation === "EURToCrypto" ?
                        stateInputEUR.setInputCurr :
                        stateInputCrypto.setInputCurr}
                >
                    {state.typeOperation === "EURToCrypto" ? InputEUR : InputCrypto}
                </InputCurrency.PercentSelector>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                {state.typeOperation === "CryptoToEUR" ? InputEUR : InputCrypto}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="wrapper">
                    <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
                        <div className={`col text-xl flex font-bold ${state.typeOperation === "EURToCrypto" ? "" :
                            "flex-row-reverse justify-end"}`}>
                            <div className="col"><span>1 {state.currency.EUR.$const}</span></div>
                            <div className="col mx-2"><span> = </span></div>
                            <div className="col"><span>1 {state.currency.Crypto.$const}</span></div>
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
                    <div
                        className={`col flex flex-col w-[max-content] gap-2 ${state.typeOperation === "EURToCrypto" ? "" : "flex-col-reverse"}`}>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{stateInputEUR.inputCurr.value.number} {state.currency.EUR.$const}</span>
                        </div>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{stateInputCrypto.inputCurr.value.number} {state.currency.Crypto.$const}</span>
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
                    disabled={!stateInputEUR.inputCurr.value.number}
                    className="w-full">
                    Exchange
                </Button>
            </div>
        </div>
    </>
}
