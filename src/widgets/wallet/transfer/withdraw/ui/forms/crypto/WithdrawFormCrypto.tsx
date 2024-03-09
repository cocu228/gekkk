import {useCallback, useContext, useEffect, useState} from "react";
import Input from "@/shared/ui/input/Input";
import {Input as InputAntd} from "antd";
import Modal from "@/shared/ui/modal/Modal";
import {Modal as ModalAnt} from "antd"
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from '@/shared/config/validators';
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {getFinalFee, isDisabledBtnWithdraw} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import Decimal from "decimal.js";
// import {calculateAmount} from "@/shared/lib/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { debounce } from "@/shared/lib";

const {TextArea} = InputAntd;


export interface IWithdrawFormCryptoState {
    address: null | string,
    recipient: null | string,
    description: null | string,
}
const WithdrawFormCrypto = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {md} = useBreakpoints()
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {networkTypeSelect, tokenNetworks, setRefresh} = useContext(CtxWalletNetworks);
    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
        address: null,
        recipient: null,
        description: null,
    })

    const {
        min_withdraw = 0,
        max_withdraw = 0,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

    const finalFee = finalFeeEntity.value.number;

    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }


    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);
    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
    
            setLoading(true)
            delayRes(inputCurr.value.number)
            delayDisplay()
    
        }, [inputCurr.value.number]);
    
    return !md ? Array.isArray(tokenNetworks) && tokenNetworks.length > 0 && (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("address")}</span>
                    <Input value={inputs.address} onChange={onInput}
                           disabled={!networkTypeSelect}
                           placeholder={t("enter_withdrawal_address")}
                           name={"address"}/>
                </div>
                    <div className='flex flex-col gap-2'>
                        <InputCurrency.Validator
                            value={new Decimal(inputCurr.value.number).plus(finalFee).toNumber()}
                            description={getWithdrawDesc(min_withdraw, currency.$const)}
                            onError={setInputCurrValid}
                            validators={[
                                validateBalance(currency, navigate, t),
                                validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                                validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t),
                            ]}
                        >
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>{t("amount")}</span>}
                                onSelect={setInputCurr}
                            >
                                <InputCurrency.DisplayBalance currency={currency}>
                                    <InputCurrency
                                        name={"amount"}
                                        value={inputCurr.value.string}
                                        currency={currency.$const}
                                        onChange={setInputCurr}
                                    />
                                </InputCurrency.DisplayBalance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("recipient")}</span>
                            <Input value={inputs.recipient} onChange={onInput}
                                   disabled={!networkTypeSelect}
                                   name={"recipient"}
                                   placeholder={t("enter_recepients_name")}/>

                    <span className="text-green text-fs12">{t("EW_law")}</span>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("desc_optional")}</span>
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkTypeSelect}
                              rows={2}/>
                </div>
                <div className="row w-full mt-4">
                    <div className="col">
                        <Modal width={450}
                               title={t("transfer_confirmation")}
                               destroyOnClose
                               onCancel={handleCancel}
                               open={isModalOpen}>

                            <WithdrawConfirmCrypto {...inputs}
                                                   amount={inputCurr.value.number}
                                                   handleCancel={handleCancel}
                            />
                        </Modal>
                        <Button size={"xl"} onClick={showModal}

                                disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value}
                                className='w-full self-center'>
                            {t("withdraw")}
                        </Button>

                    </div>
                </div>
                </div>
            </div>
    )
    :
    Array.isArray(tokenNetworks) && tokenNetworks.length > 0 && (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    <InputCurrency.Validator
                        value={new Decimal(inputCurr.value.number).plus(finalFee).toNumber()}
                        description={getWithdrawDesc(min_withdraw, currency.$const)}
                        onError={setInputCurrValid}
                        validators={[
                            validateBalance(currency, navigate, t),
                            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                            validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t),
                        ]}
                    >
                        <InputCurrency.PercentSelector
                            currency={currency}
                            header={<span className='text-[#1F3446] text-[12px] font-bold'>{t("amount")}</span>}
                            onSelect={setInputCurr}
                        >
                            <InputCurrency.DisplayBalance currency={currency}>
                                <InputCurrency
                                    name={"amount"}
                                    value={inputCurr.value.string}
                                    currency={currency.$const}
                                    onChange={setInputCurr}
                                />
                            </InputCurrency.DisplayBalance>
                        </InputCurrency.PercentSelector>
                    </InputCurrency.Validator>
                </div>
                <div className='flex flex-row items-center justify-between gap-2'>
                    <span className="mr-4 text-[#1F3446] text-[12px] font-bold">{t("address")}:</span>
                    <div className="basis-[100%]">
                        <Input value={inputs.address} onChange={onInput}
                            disabled={!networkTypeSelect}
                            placeholder={t("enter_withdrawal_address")}
                            name={"address"}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center  gap-2'>
                    <div className="w-full justify-between flex flex-row items-center">
                        <span className="mr-4 text-[#1F3446] text-[12px] font-bold">{t("recipient")}:</span>
                        <div className="basis-[100%]">
                            <Input value={inputs.recipient} onChange={onInput}
                                    disabled={!networkTypeSelect}
                                    name={"recipient"}
                                    placeholder={t("enter_recepients_name")}
                                    className="w-full"
                            />
                        </div>
                    </div>

                    <span className="text-[#B9B9B5] ml-5 text-fs12">*{t("EW_law")}</span>
                </div>

                <div className='flex flex-row items-center justify-between gap-2'>
                    <span className="text-[#1F3446] text-[12px] font-bold">{t("description")}:</span>
                    <Input name={"description"} value={inputs.description} onChange={onInput}
                        disabled={!networkTypeSelect}
                        placeholder={t("enter_description")}
                    />
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
                                <div className="row flex items-end">
                                    {loading ? t("loading")+"..." : <span
                                        className="w-full text-start">{new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} {currency.$const}</span>}
                                </div>
                                <div className="row flex items-end">
                                    {loading ? t("loading")+"..." : <span
                                        className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row w-full mt-4">
                    <div className="col">
                        <ModalAnt width={450}
                               title={t("confirm_transaction")}
                               destroyOnClose
                               onCancel={handleCancel}
                               open={isModalOpen}
                               footer={null}
                               className="h-[100%]"
                               centered
                        >

                            <WithdrawConfirmCrypto {...inputs}
                                                   amount={inputCurr.value.number}
                                                   handleCancel={handleCancel}

                            />
                        </ModalAnt>
                        <Button size={"xl"} onClick={showModal}

                                disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value}
                                className='w-full mb-[10px] self-center'>
                            {t("withdraw")}
                        </Button>
                        <div className='w-full flex justify-center'>
                            <span className='text-[#9D9D9D] text-[10px]'>
                                {t("fee_is_prec")} <span className='font-bold'>{withdraw_fee} {currency.$const} </span> {t("per_transaction")}
                            </span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
};

export default WithdrawFormCrypto;
