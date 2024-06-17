import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {debounce} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {AccountRights} from '@/shared/config/mask-account-rights';
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
import {Modal} from "@/shared/ui/modal/Modal";
import { reponseOfUpdatingTokensNetworks } from '../../../model/helper';
import useError from '@/shared/model/hooks/useError';
import Commissions from "@/widgets/wallet/transfer/withdraw/ui/components/commissions";

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
    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear] = useError();

    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
    const delayRes = useCallback(debounce((amount) => { //TODO 1012 refactoring
        setRefresh(true, amount)
        reponseOfUpdatingTokensNetworks(amount, currency.$const).then(res => {
            res?.error              
                ? localErrorHunter(res.error)
                : localErrorClear()
        })     
    }, 2000), []);

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
                                                   header={<span className='text-gray-600 font-medium ml-[10px] mb-[5px]'>{t("amount")}:</span>}
                                                   currency={currency}>
                        <InputCurrency.DisplayBalance currency={currency}>
                            <InputCurrency
                                placeholder={t("exchange.enter_amount")}
                                value={inputCurr.value.string}
                                currency={currency.$const}
                                onChange={setInputCurr}
                            />
                        </InputCurrency.DisplayBalance>
                    </InputCurrency.PercentSelector>
                </InputCurrency.Validator>
            </div>
        </div>
        {localErrorInfoBox &&
            <div className='py-5'>
                {localErrorInfoBox}    
            </div>
        }
        <div className='w-full flex justify-center'>
            <Commissions
                isLoading={loading}
                youWillPay={inputCurr.value.number}
                youWillGet={inputCurr.value.number - withdraw_fee}
                fee={withdraw_fee}
                youWillPayCoin={currency.$const}
                youWillGetCoin={"EURG"}
                feeCoin={currency.$const}
            />
        </div>
        <Modal
            isModalOpen={isModalOpen}
            onCancel={handleCancel}
            title={t("withdraw_confirmation")}
        >
            <WithdrawConfirmBroker amount={inputCurr.value.number} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full mt-4">
            <div className="flex justify-center col">
                <Button
                    size='lg'
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full">
                    {t("transfer")}
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
                        header={<span className={`${styles.TitleColText} ml-[10px]`}>{t("amount")}:</span>}
                        onSelect={val => {
                            const amount = new Decimal(val);
                            setInputCurr(amount.mul(100).floor().div(100).toString())
                        }}
                    >
                        <InputCurrency.DisplayBalance currency={currency}>
                            <InputCurrency
                                transfers
                                placeholder={t('enter_amount')}
                                value={inputCurr.value.string}
                                currency={currency.$const}
                                onChange={setInputCurr}
                            />
                        </InputCurrency.DisplayBalance>
                    </InputCurrency.PercentSelector>
                </InputCurrency.Validator>
            </div>
            {localErrorInfoBox && <div className='py-5'>
                {localErrorInfoBox}    
            </div>}
            <div className={styles.EURCost}>
                <div className="col">
                    <span className={styles.EURCostValue}>
                        1 EUR = 1 EURG*
                    </span>
                </div>

                <div className={styles.EURCostInfo}>
                    <span className={styles.EURCostInfoText}><b className={styles.EURCostInfoTextUppercase}>*{t("note")}</b>:  {t("exchange_fee")} <b className={styles.EURCostInfoTextUppercase}>1,5%</b>
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
        <div className='w-full flex justify-center'>
            <Commissions
                isLoading={loading}
                youWillPay={inputCurr.value.number}
                youWillGet={inputCurr.value.number - withdraw_fee}
                fee={withdraw_fee}
                youWillPayCoin={currency.$const}
                youWillGetCoin={"EURG"}
                feeCoin={currency.$const}
            />
        </div>
        <Modal
            isModalOpen={isModalOpen}
            onCancel={()=>{
                handleCancel()
            }}
            title={t("confirm_transaction")}
        >
            <WithdrawConfirmBroker
                handleCancel={()=>{handleCancel()}}
                amount={inputCurr.value.number}
            />
        </Modal>
        
        <div className={styles.Button}>
            <div className={styles.ButtonContainerCenter}>
                <Button
                    size="lg"
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full"
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
