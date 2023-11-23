import React, {useContext, useEffect, useMemo, useState} from "react";
import Select from "@/shared/ui/select/Select";
import {typeQuickExchangeForSelect} from "@/widgets/wallet/quick-exchange/model/entitys";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
// import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Button from "@/shared/ui/button/Button";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import Decimal from "decimal.js";
import rate from "@/widgets/crypto-deposits/Rate";
import {getCurrentRate} from "@/widgets/wallet/quick-exchange/model/helpers";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import QuickExchangeConfirm from "@/widgets/wallet/quick-exchange/ui/QuickExchangeConfirm";
import {isNull} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import {IOperationInfo} from "@/widgets/wallet/quick-exchange/model/types";
import {validateBalance} from "@/shared/config/validators";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const QuickExchange = () => {
    const {ratesEUR, currencies} = useContext(CtxCurrencies)
    const {t} = useTranslation();

    if (isNull(ratesEUR) || currencies.get("EUR").availableBalance === null) return <Loader/>


    const commissionCoefficient = 10

    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate()

    const [state, setState] = useState({
        typeOperation: "EURToCrypto",
        currency: {
            EUR: currencies.get("EUR"),
            Crypto: currencies.get("BTC")
        }
    });

    const currentRate = useMemo(() =>
        getCurrentRate(ratesEUR, state.currency.Crypto.$const, commissionCoefficient), [state.currency.Crypto.$const])

    const ratioOneEUR = new Decimal(1).div(currentRate).toString()
    const onChangeForSelect = (value: string) => {
        stateInputEUR.setInputCurr("");
        stateInputCrypto.setInputCurr("");
        setState(prev => ({...prev, typeOperation: value}));
    }


    const stateInputEUR = useInputState()
    const stateInputCrypto = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    useEffect(() => {
        if (state.typeOperation === "EURToCrypto" && !new Decimal(currentRate).isZero()) {
            const EUR = stateInputEUR.inputCurr.value.number
            const finalCrypto = new Decimal(EUR).div(currentRate).toString();
            stateInputCrypto.setInputCurr(finalCrypto)
        }

    }, [stateInputEUR.inputCurr.value.number]);

    useEffect(() => {

        if (state.typeOperation !== "EURToCrypto" && !new Decimal(currentRate).isZero()) {
            const Crypto = stateInputCrypto.inputCurr.value.number
            const finalCrypto = new Decimal(Crypto).times(currentRate).toString();
            stateInputEUR.setInputCurr(finalCrypto)
        }

    }, [stateInputCrypto.inputCurr.value.number]);

    const onSelectConverted = ($const: string) => {

        stateInputEUR.setInputCurr("");
        stateInputCrypto.setInputCurr("");

        setState(prev => ({
            ...prev, currency: {
                ...prev.currency,
                Crypto: currencies.get($const)
            }
        }))
    };


    const InputEUR =
        <InputCurrency.DisplayBalance currency={state.currency.EUR}>
        <InputCurrency onChange={stateInputEUR.setInputCurr}
                       readOnly={state.typeOperation !== "EURToCrypto"}
                       value={stateInputEUR.inputCurr.value.string}
                       currency={state.currency.EUR.$const}/>
        </InputCurrency.DisplayBalance>

    const InputCrypto = <InputCurrency.CurrencySelector
        onSelect={onSelectConverted}>
        <InputCurrency.DisplayBalance currency={state.currency.Crypto}>
            <InputCurrency
                readOnly={state.typeOperation === "EURToCrypto"}
                onChange={stateInputCrypto.setInputCurr}
                value={stateInputCrypto.inputCurr.value.string}
                currency={state.currency.Crypto.$const}/>
        </InputCurrency.DisplayBalance>
    </InputCurrency.CurrencySelector>

    const operationInfo: IOperationInfo = {
        pay: state.typeOperation === "EURToCrypto" ? `${stateInputEUR.inputCurr.value.number} ${state.currency.EUR.$const}` :
            `${stateInputCrypto.inputCurr.value.number} ${state.currency.Crypto.$const}`,
        get: state.typeOperation !== "EURToCrypto" ? `${stateInputEUR.inputCurr.value.number} ${state.currency.EUR.$const}` :
            `${stateInputCrypto.inputCurr.value.number} ${state.currency.Crypto.$const}`,
        rate: currentRate.toString(),
        currency: state.currency.Crypto.$const
    }

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
                    header={<span className="font-medium">Pay from</span>}
                    currency={state.typeOperation === "EURToCrypto" ?
                        state.currency.EUR :
                        state.currency.Crypto}
                    onSelect={state.typeOperation === "EURToCrypto" ?
                        stateInputEUR.setInputCurr :
                        stateInputCrypto.setInputCurr}
                >
                    <InputCurrency.Validator
                        value={state.typeOperation === "EURToCrypto" ? stateInputEUR.inputCurr.value.number :
                            stateInputCrypto.inputCurr.value.number
                        }
                        onError={setInputCurrValid}
                        validators={[
                            validateBalance(state.typeOperation === "EURToCrypto" ?
                                    state.currency.EUR : state.currency.Crypto,
                                navigate, t)
                        ]}>
                        {state.typeOperation === "EURToCrypto" ? InputEUR : InputCrypto}
                    </InputCurrency.Validator>
                </InputCurrency.PercentSelector>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="font-medium">Receive to</span>
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
                            <div className="col">
                                <span>{state.typeOperation === "EURToCrypto" ? 1 : currentRate.toString()} {state.currency.EUR.$const}</span>
                            </div>
                            <div className="col mx-2"><span> = </span></div>
                            <div className="col">
                                <span>{state.typeOperation === "EURToCrypto" ? ratioOneEUR : 1} {state.currency.Crypto.$const}</span>
                            </div>
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
                <b>Testing value: {ratesEUR[state.currency.Crypto.$const]} EUR without commission 10%</b>
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
                <Modal width={450}
                       title="Exchange confirmation"
                       destroyOnClose
                       onCancel={handleCancel}
                       open={isModalOpen}>
                    <QuickExchangeConfirm handleCancel={handleCancel} {...operationInfo}/>
                </Modal>
                <Button
                    size={"xl"}
                    onClick={showModal}
                    disabled={!stateInputEUR.inputCurr.value.number || inputCurrValid.value}
                    className="w-full">
                    Exchange
                </Button>
            </div>
        </div>
    </>
}
