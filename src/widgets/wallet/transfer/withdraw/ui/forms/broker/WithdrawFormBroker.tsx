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
import styles from "../styles.module.scss"
import {Modal} from "@/shared/ui/modal/Modal";
import { reponseOfUpdatingTokensNetworks } from '../../../model/helper';
import useError from '@/shared/model/hooks/useError';
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { UasConfirmCtx } from '@/processes/errors-provider-context';
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";

const WithdrawFormBroker = () => {
    const {t} = useTranslation();
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
            await getUasToken()
            setLoading(false)
            showModal()
        } else {
            setLoading(false)
            showModal() 
        }
    }

    return (
        <div className="wrapper">
            {/* Amount Start */}
            <div className="w-full md:mb-[15px] mb-[20px]">
                <AmountInput
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
            {/* Amount End */}

            {/* Transfer Error Start */}
            {localErrorInfoBox ? <div className="w-full md:mb-[15px] mb-[20px]">{localErrorInfoBox}</div> : null}
            {/* Transfer Error Start */}

            {/* Information Start */}
            <div className="w-full md:mb-[10px] mb-[15px]">
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
            {/* Information End */}

            {/* Commissions Start */}
            <div className='w-full flex justify-center md:mb-[15px] mb-[20px]'>
                <Commissions
                    isLoading={loading}
                    youWillPay={inputCurr.value.number}
                    youWillGet={inputCurr.value.number - withdraw_fee}
                    fee={withdraw_fee}
                    youWillGetCoin={"EURG"}
                />
            </div>
            {/* Commissions End */}

            {/* Transfer Button Start */}
            <div className="w-full flex justify-center md:mb-[15px] mb-[20px]">
                <Button
                    size="lg"
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={handleConfirm}
                    className="w-full"
                >
                    {t("transfer")}
                </Button>
            </div>
            {/* Transfer Button End */}

            {/* Transaction Information Start */}
            <div className="w-full md:flex hidden justify-center">
                <span className={"text-[var(--gek-mid-grey)] md:text-fs12 text-fs14"}>
                    {t("fee_is_prec")}
                    <span className={"font-bold"}>{percent_fee}%</span>
                    {t("per_transaction")}
                </span>
            </div>
            {/* Transaction Information End */}

            {/* Confirm Start */}
            <Modal
              isModalOpen={isModalOpen}
              onCancel={handleCancel}
              title={t("confirm_transaction")}
            >
                <WithdrawConfirmBroker
                  handleCancel={()=>{handleCancel()}}
                  amount={inputCurr.value.number}
                />
            </Modal>
            {/* Confirm End */}
        </div>
    )
};

export default WithdrawFormBroker;
