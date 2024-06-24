import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {debounce} from "@/shared/lib/helpers";
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
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import BrokerAmountContainer from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/ui/containers/broker-amount-container";
import { apiGetUas } from '@/shared/(orval)api';
import { UasConfirmCtx } from '@/processes/errors-provider-context';

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
    const {uasToken, getUasToken} = useContext(UasConfirmCtx)

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

    const handleConfirm = async () => {
        if(!uasToken) {
            setLoading(true)
            getUasToken()
        } else {
            setLoading(false)
            showModal() 
        }
    }

    useEffect(() => {
        if(uasToken) {
            showModal()
            setLoading(false)
        }
    }, [uasToken])

    return (
        <div className="wrapper">
            <div className={styles.Title}>
                <div className={styles.TitleCol}>
                    <BrokerAmountContainer
                        transfers
                        placeholder={t('enter_amount')}
                        textClassname={`${styles.TitleColText} ml-[7px]`}
                        value={inputCurr.value.number}
                        inputValue={inputCurr.value.string}
                        currency={currency}
                        description={getWithdrawDesc(min_withdraw, currency.$const)}
                        validators={[
                            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                            validateBalance(currency, navigate, t)
                        ]}
                        onError={setInputCurrValid}
                        onSelect={val => {
                            const amount = new Decimal(val);
                            setInputCurr(amount.mul(100).floor().div(100).toString())
                        }}
                        onChange={setInputCurr}
                    />
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
            <div className='w-full mt-[5px] flex justify-center'>
                <Commissions
                    isLoading={loading}
                    youWillPay={inputCurr.value.number}
                    youWillGet={new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()}
                    fee={withdraw_fee}
                    youWillGetCoin={"EURG"}
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
                        onClick={handleConfirm}
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
        </div>
    )
};

export default WithdrawFormBroker;
