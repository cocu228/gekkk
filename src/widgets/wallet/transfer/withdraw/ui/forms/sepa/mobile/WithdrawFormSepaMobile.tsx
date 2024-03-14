import {useContext, useEffect, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import WithdrawConfirmSepa from "./WithdrawConfirmSepaMobile";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {getInitialProps, useTranslation} from "react-i18next";

const WithdrawFormSepaMobile = () => {
    const [transferDescriptionsTranslated, setTransferDescriptionsTranslated] = useState(null);
    const {initialLanguage} = getInitialProps();

    useEffect(()=>{
        setTransferDescriptionsTranslated(
            transferDescriptions.map(el=>{
            return {
                    "value" : el.value,
                    "label" : t(`${el.value}`)
                }
            })
        )
    },[initialLanguage])
    const {t} = useTranslation();
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();
    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null
    })
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const {
        min_withdraw = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputCurr.value.number}
                                                 description={getWithdrawDesc(min_withdraw, currency.$const)}
                                                 onError={setInputCurrValid}
                                                 validators={[validateBalance(currency, navigate, t),
                                                     validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-[#1F3446] text-[12px] font-semibold'>{t("amount")}</span>}
                                onSelect={setInputCurr}
                            >
                                <InputCurrency.DisplayBalance currency={currency}>
                                    <InputCurrency
                                        onChange={setInputCurr}
                                        value={inputCurr.value.string}
                                        currency={currency.$const}
                                    />
                                </InputCurrency.DisplayBalance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("IBAN")}:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col w-full basis-[100%]">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col mb-8 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("recipient")}:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
            <div className='ml-5'>
                <span className='text-[10px]'>
                *As required by EU law, you must provide the name of the recipient of the funds
                </span>
            </div>
        </div>
        
        <div className="row mb-8 w-full">
            <div className="flex flex-row items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("description")}:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                name={"transferDescription"}
                                options={transferDescriptionsTranslated}
                                placeholder={t("transfer_details.name")}
                                value={inputs.transferDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="row flex gap-4 text-gray-400 font-medium mb-4 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>{t("you_will_pay")}</span>
                        </div>
                        <div className="row">
                        <span>
                            {t("you_will_get")}
                        </span>
                        </div>
                        <div className="row">
                        <span>
                            {t("fee")}
                        </span>
                        </div>
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{inputCurr.value.number} {currency.$const}</span>
                        </div>
                        {/* <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} EUR</span>}
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <Modal 
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={t("transfer_confirmation")}
        >
            <WithdrawConfirmSepa {...inputs} amount={inputCurr.value.number}/>
        </Modal>
        <div className="flex flex-col w-full">
            <div className="col mb-[10px]">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || inputCurrValid.value}
                >
                    {t("withdraw")}
                </Button>
            </div>
            <div className='w-full flex justify-center'>
                <span className='text-[#9D9D9D] text-[10px]'>
                    {t("fee_is_prec")} <span className='font-bold'>? {currency.$const} </span> {t("per_transaction")}
                </span>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepaMobile;
