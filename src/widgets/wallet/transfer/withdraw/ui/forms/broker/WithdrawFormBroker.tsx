import React, {useCallback, useContext, useEffect, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {Modal as ModalAnt} from "antd"
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
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import styles from "../styles.module.scss"
// import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

const WithdrawFormBroker = () => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const [loading, setLoading] = useState(false);
    const {inputCurr, setInputCurr} = useInputState();
    const {isModalOpen, showModal, handleCancel} = UseModal();
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();
    const {networkTypeSelect, tokenNetworks, setRefresh} = useContext(CtxWalletNetworks);

    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);

    const {
        percent_fee = 0,
        min_withdraw = 0,
        withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

    useEffect(() => {
        setLoading(true);
        delayRes(inputCurr.value.number);
        delayDisplay();
    }, [inputCurr.value.number]);

    return !md ? (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>

            <div className="col text-xs">
                <span><b>*{t("note")}</b>:  {t("exchange_fee")} <b>1,5%</b>
                    {account.rights[AccountRights.IsJuridical] ? null :
                        <span className="font-normal"> {t("if_you")} <span
                            className='text-blue-400 hover:cursor-pointer hover:underline'
                            onClick={() => navigate('/wallet?currency=GKE&tab=no_fee_program')}
                        >
                            {t("freeze_GKE_tokens")}   
                        </span> {t("fee_is")} <b>0%</b>.
                    </span>}
                </span>
            </div>
        </div>

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
                                                   header={<span className='text-gray-600 font-medium'>{t("amount")}:</span>}
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
            onCancel={handleCancel}
            title={t("withdraw_confirmation")}
            padding
        >
            <WithdrawConfirmBroker amount={inputCurr.value.number} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full mt-4">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full">
                    Buy EURG
                </Button>
            </div>
        </div>
    </div>) : (<div className="wrapper">
        <div className={styles.Title}>
            <div className={styles.TitleCol}>
                <InputCurrency.Validator
                    value={inputCurr.value.number}
                    onError={setInputCurrValid}
                    description={getWithdrawDesc(min_withdraw, currency.$const)}
                    validators={[
                        validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                        validateBalance(currency, navigate, t)]}>
                    <InputCurrency.PercentSelector
                        currency={currency}
                        header={<span className={styles.TitleColText}>{t("amount")}:</span>}
                        onSelect={val => {
                            const amount = new Decimal(val);
                            setInputCurr(amount.mul(100).floor().div(100).toString())
                        }}
                    >
                        <InputCurrency.DisplayBalance currency={currency}>
                            <InputCurrency
                                transfers
                                value={inputCurr.value.string}
                                currency={currency.$const}
                                onChange={setInputCurr}
                            />
                        </InputCurrency.DisplayBalance>
                    </InputCurrency.PercentSelector>
                </InputCurrency.Validator>
            </div>
            <div className={styles.EURCost}>
                <div className="col">
                    <span className={styles.EURCostValue}>
                        1 EUR = 1 EURG*
                    </span>
                </div>

                <div className={styles.EURCostInfo}>
                    <span className={styles.EURCostInfoText}><b className={styles.EURCostInfoTextUppercase}>*{t("note")}</b>:  {t("exchange_fee")} <b className={styles.EURCostInfoTextUppercase}>{percent_fee}%</b>
                        {account.rights[AccountRights.IsJuridical] ? null :
                            <span> {t("if_you")} <span
                                className={styles.EURCostInfoTextLink}
                                onClick={() => navigate('/wallet?currency=GKE&tab=no_fee_program')}
                            >
                                {t("freeze_GKE_tokens")}   
                            </span> {t("fee_is")} <b>0%</b>.
                        </span>}
                    </span>
                </div>
            </div>
        </div>
        <div className={styles.PayInfo}>
            <div className={styles.PayInfoCol}>
                <div className="row">
                    <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
                </div>
                <div className="row">
                <span className={styles.PayInfoText}>
                    {t("you_will_get")}:
                </span>
                </div>
                <div className="row">
                    <span className={styles.PayInfoTextFee}>
                        {t("fee")}:
                    </span>
                </div>
            </div>
            <div className={styles.PayInfoColValue}>

                <div className={styles.PayInfoCol}>
                    <div className={styles.PayInfoValueFlex}>
                        <span
                            className={styles.PayInfoValueFlexText}>{inputCurr.value.number + withdraw_fee}</span>
                    </div>
                    <div className={styles.PayInfoValueFlex}>
                        {loading ? t("loading")+"..." : <span
                            className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>}
                    </div>
                    <div className={styles.PayInfoValueFlex}>
                        {loading ? t("loading")+"..." : <span
                            className={styles.PayInfoValueFlexTextFee}>{withdraw_fee}</span>}
                    </div>
                </div>
                
                <div className={styles.PayInfoCol}>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        {currency.$const}
                    </span>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        EURG
                    </span>
                    <span className={styles.PayInfoValueFlexTextFee}>
                        {currency.$const}
                    </span>
                </div>
            </div>
        </div>
        
        <ModalAnt
            width={327}
            open={isModalOpen}
            onCancel={()=>{
                handleCancel()
            }}
            closable={false}
            title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
            footer={null}
        >
            <WithdrawConfirmBroker
                handleCancel={()=>{handleCancel()}}
                amount={inputCurr.value.number}
            />
        </ModalAnt>
        
        {/* <StatusModalError open={isErr} setIsErr={setIsErr}/> TODO
        <StatusModalSuccess open={isSuccess} setIsSuccess={setIsSuccess}/> */}
        <div className={styles.Button}>
            <div className={styles.ButtonContainerCenter}>
                <Button
                    size={"xl"}
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full"
                    variant='greenTransfer'
                >
                    {t("transfer")}
                </Button>
            </div>
        </div>
        <div className={styles.BottomFeeInfo}>
            <span className={styles.BottomFeeInfoText}>
                {t("fee_is_prec")} <span className={styles.BottomFeeInfoTextBold}>{percent_fee}%</span> {t("per_transaction")}
            </span>
        </div>
    </div>)
};

export default WithdrawFormBroker;
