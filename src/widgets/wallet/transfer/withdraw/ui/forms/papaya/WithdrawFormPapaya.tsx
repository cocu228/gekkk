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
import Decimal from "decimal.js";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import {useTranslation} from "react-i18next";
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import styles from "../styles.module.scss";
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";


const WithdrawFormPapaya = () => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const [loading, setLoading] = useState(false);
    const {inputCurr, setInputCurr} = useInputState();
    const {isModalOpen, showModal, handleCancel} = UseModal();
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();
    const {
        setRefresh,
        tokenNetworks,
        localErrorClear,
        networkTypeSelect,
        localErrorInfoBox
    } = useContext(CtxWalletNetworks);

    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);

    const {
        min_withdraw = 0,
        withdraw_fee = 0,
        percent_fee = 0
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
    
    useEffect(() => {
        setLoading(true);
        delayRes(inputCurr.value.number);
        delayDisplay();
    }, [inputCurr.value.number]);

    return (
        <div className="wrapper flex flex-col md:gap-[10px] gap-[15px]">
            {/* Amount Start */}
            <div className="w-full">
                <AmountInput
                  placeholder={t("exchange.enter_amount")}
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
                  onChange={(val) => {
                    if (!!localErrorInfoBox) {
                        localErrorClear();
                    }

                    setInputCurr(val);
                  }}
                />
            </div>
            {/* Amount End */}

            {/* Information Start */}
            <div className="w-full">
                <div className={styles.EURCost}>
                    <div className="col">
                        <span className={styles.EURCostValue}>
                            1 EUR = 1 EURG*
                        </span>
                    </div>
    
                    <div className={styles.EURCostInfo}>
                        <span className={styles.EURCostInfoText}>
                            <b className={styles.EURCostInfoTextUppercase}>*{t("note")}</b>: {" "}
                            {t("withdraw_fee", {to: "Papaya IBAN"})}{" "}
                            <b className={styles.EURCostInfoTextUppercase}>1,5%</b>
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
            <div className='w-full flex justify-center'>
                <Commissions
                  isLoading={loading}
                  youWillPay={inputCurr.value.number}
                  youWillGet={inputCurr.value.number - withdraw_fee}
                  fee={withdraw_fee}
                  youWillGetCoin={"EUR"}
                />
            </div>
            {/* Commissions End */}

            {localErrorInfoBox}

            {/* Transfer Button Start */}
            <div className="w-full flex justify-center">
                <Button
                  size="lg"
                  className="w-full md:text-fs14 text-fs16"
                  onClick={showModal}
                  disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                >
                    {t("transfer")}
                </Button>
            </div>
            {/* Transfer Button End */}

            {/* Transaction Information Start */}
            {md && (percent_fee > 0 || withdraw_fee > 0) && (
                <div className="w-full md:flex hidden justify-center">
                    <span className="text-[var(--gek-mid-grey)] md:text-fs12 text-fs14">
                        {t("fee_is_prec")}&nbsp;
                        <span className={"font-semibold"}>
                            {withdraw_fee === 0 ? `${percent_fee}%` : withdraw_fee}
                        </span>&nbsp;
                        {t("per_transaction")}
                    </span>
                </div>
            )}
            {/* Transaction Information End */}

            {/* Confirm Start */}
            <Modal
              placeBottom={window.innerWidth<768}
              isModalOpen={isModalOpen}
              onCancel={handleCancel}
              title={t("confirm_transaction")}
            >
                <WithdrawConfirmCrypto
                  description={""}
                  address={account.number}
                  recipient={account.name}
                  handleCancel={handleCancel}
                  amount={new Decimal(inputCurr.value.number).minus(withdraw_fee).toNumber()}
                />
            </Modal>
            {/* Confirm End */}
        </div>
    );
}

export default WithdrawFormPapaya;
