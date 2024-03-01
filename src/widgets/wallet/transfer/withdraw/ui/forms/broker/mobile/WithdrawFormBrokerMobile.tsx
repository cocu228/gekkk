import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Modal} from "antd";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {debounce} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {AccountRights} from '@/shared/config/account-rights';
import {validateBalance, validateMinimumAmount} from '@/shared/config/validators';
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawConfirmBroker";
import Decimal from "decimal.js";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import WithdrawConfirmBrokerMobile from './WithdrawConfirmBrokerMobile';
// import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";


const WithdrawFormBrokerMobile = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const [isErr, setIsErr] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {networkTypeSelect, tokenNetworks, setNetworkType, setRefresh} = useContext(CtxWalletNetworks);

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    const [loading, setLoading] = useState(false);
    const {isModalOpen, showModal, handleCancel} = UseModal();

    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);
    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);

    const {
        network_type = 0,
        min_withdraw = 0,
        withdraw_fee = 0,
        percent_fee = 0
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    useEffect(() => {

        setLoading(true)
        delayRes(inputCurr.value.number)
        delayDisplay()

    }, [inputCurr.value.number]);

    return (<div className="wrapper">
        <div className="row mb-4">
            <div className="col">
                <InputCurrency.Validator
                    value={inputCurr.value.number}
                    onError={setInputCurrValid}
                    description={getWithdrawDesc(min_withdraw, currency.$const)}
                    validators={[
                        validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                        validateBalance(currency, navigate, t)]}>
                    <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                   header={<span className='text-gray-600 font-medium'>{t("amount")}</span>}
                                                   currency={currency}>
                        <InputCurrency.DisplayBalance currency={currency}>
                            <InputCurrency
                                value={inputCurr.value.string}
                                currency={currency.$const}
                                onChange={setInputCurr}
                            />
                        </InputCurrency.DisplayBalance>
                    </InputCurrency.PercentSelector>
                </InputCurrency.Validator>
            </div>
        </div>
        <div className="row mb-4 p-2 flex flex-col gap-2 md:gap-1  bg-[#DADADA] rounded-lg rounded-tr-none">
                <div className="col text-xl text-[#3A5E66] text-[14px] font-bold">
                    <span>1 EUR = 1 EURG*</span>
                </div>

                <div className="col text-[#3A5E66] text-[10px] text-xs">
                    <span><b>*{t("note")}</b>: {t("exchange_fee")} <b className='text-[#3A5E66]'>{percent_fee}%</b>
                        {account.rights[AccountRights.IsJuridical] ? null :
                            <span className="font-normal"> {t("if_you")} <span
                                className='text-[#45AD77] hover:cursor-pointer hover:underline'
                                onClick={() => navigate('/wallet/GKE/no_fee_program')}
                            >
                                {t("freeze_GKE_tokens")}    
                            </span> {t("fee_is")} <b>0%</b>.
                        </span>}
                    </span>
                </div>
            </div>


        
        <div className="row">
            <div className="col">
                <div className="row flex gap-4 text-gray-400 font-medium mb-14 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>{t("you_will_pay")}</span>
                        </div>
                        <div className="row">
                            <span>{t("you_will_get")}</span>
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
                                className="w-full text-start">{new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} EURG</span>}
                        </div>
                        <div className="row flex items-end">
                            {loading ? t("loading")+"..." : <span
                                className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            width={450}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            title={t("withdraw_confirmation")}>
            <WithdrawConfirmBrokerMobile setErr={setIsErr} setSuccess={setIsSuccess} amount={inputCurr.value.number} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full mt-4 mb-[10px]">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full">
                    Transfer
                </Button>
            </div>
        </div>
        <div className='w-full flex justify-center'>
            <span className='text-[#9D9D9D] text-[10px]'>
                {t("fee_is_perc")} <span className='font-bold'>{percent_fee}%</span> {t("per_transaction")}
            </span>
        </div>
        <Modal
            width={418}
            open={isErr}
            closeIcon={<div></div>}
            onCancel={()=>{
                handleCancel()
                setIsErr(false)
            }}
            footer={
                <div className='w-full mt-[30px]'>
                    <Button
                        className='w-full'
                        onClick={()=>{
                            setIsErr(false)
                        }}
                        size='xl'
                        red
                    >
                        Cancel
                    </Button>
                </div>
            }
        >
            <div className='w-full flex flex-col gap-[30px] items-center'>
                <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1190_22983)">
                        <path d="M54 0C24.2252 0 0 24.2252 0 54C0 83.7748 24.2252 108 54 108C83.7748 108 108 83.7748 108 54C108 24.2252 83.7748 0 54 0ZM54 8.30769C79.2845 8.30769 99.6923 28.7155 99.6923 54C99.6923 79.2845 79.2845 99.6923 54 99.6923C28.7155 99.6923 8.30769 79.2845 8.30769 54C8.30769 28.7155 28.7155 8.30769 54 8.30769ZM54 29.0769C51.7059 29.0769 49.8462 30.9367 49.8462 33.2308V58.1538C49.8462 60.448 51.7059 62.3077 54 62.3077C56.2941 62.3077 58.1538 60.448 58.1538 58.1538V33.2308C58.1538 30.9367 56.2941 29.0769 54 29.0769ZM54 70.6154C51.7059 70.6154 49.8462 72.4751 49.8462 74.7692C49.8462 77.0633 51.7059 78.9231 54 78.9231C56.2941 78.9231 58.1538 77.0633 58.1538 74.7692C58.1538 72.4751 56.2941 70.6154 54 70.6154Z" fill="#8F123A"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1190_22983">
                            <rect width="108" height="108" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className='flex flex-col items-center gap-[30px]'>
                    <span>
                        Transfer error
                    </span>
                    <span>
                        Your transaction was not completed due to an unexpected error. Please try again later or contact our support team
                    </span>
                </div>
            </div>
        </Modal>
        <Modal
            width={418}
            open={isSuccess}
            closeIcon={<div></div>}
            onCancel={()=>{
                handleCancel()
                setIsSuccess(false)
            }}
            footer={
                <div className='w-full mt-[30px]'>
                    <Button
                        className='w-full'
                        onClick={()=>{
                            setIsSuccess(false)
                        }}
                        size='xl'
                    >
                        Cancel
                    </Button>
                </div>
            }
        >
            <div className='w-full flex flex-col gap-[30px] items-center'>
                <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M54 0C24.3 0 0 24.3 0 54C0 83.7 24.3 108 54 108C83.7 108 108 83.7 108 54C108 24.3 83.7 0 54 0ZM54 99.9C28.62 99.9 8.1 79.38 8.1 54C8.1 28.62 28.62 8.1 54 8.1C79.38 8.1 99.9 28.62 99.9 54C99.9 79.38 79.38 99.9 54 99.9ZM82.08 38.88C82.08 39.96 81.54 41.04 81 41.58L50.76 71.82C50.22 72.36 49.14 72.9 48.06 72.9C46.98 72.9 45.9 72.36 45.36 71.82L28.08 54.54C27 53.5846 26.1692 52.5877 26.1692 51.5077C26.1692 49.3477 27.6231 47.3538 30.3231 47.3538C31.5692 47.5615 32.4 48.6 32.94 49.14L47.52 63.72L75.06 36.18C75.6 35.64 76.68 35.1 77.76 35.1C79.92 34.56 82.08 36.72 82.08 38.88Z" fill="#45AD77"/>
                </svg>
                <div className='flex flex-col items-center gap-[30px]'>
                    <span>
                        Success!
                    </span>
                    <span>
                        Your transaction request has been successfully added to the queue. The transaction may take a few minutes to complete. If it’s not, please, contact
                        our support team
                    </span>
                </div>
            </div>
        </Modal>
    </div>)
};

export default WithdrawFormBrokerMobile;
