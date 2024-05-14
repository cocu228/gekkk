import {useCallback, useContext, useEffect, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/!button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {debounce} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {AccountRights} from '@/shared/config/account-rights';
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
import ModalTitle from '@/shared/ui/modal/modal-title/ModalTitle';

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
    const {networkTypeSelect, tokenNetworks, setRefresh} = useContext(CtxWalletNetworks);

    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);
    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);

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
        <div className="wrapper">
            <div className="row mb-4">
                <div className="col">
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
                                    transfers={md}
                                    value={inputCurr.value.string}
                                    currency={currency.$const}
                                    onChange={setInputCurr}
                                />
                            </InputCurrency.DisplayBalance>
                        </InputCurrency.PercentSelector>
                    </InputCurrency.Validator>
                </div>
            </div>

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
                                className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>
                        </div>
                        <div className={styles.PayInfoValueFlex}>
                            {loading ? t("loading")+"..." : <span
                                className={styles.PayInfoValueFlexText}>{inputCurr.value.number - withdraw_fee}</span>}
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
                            EUR
                        </span>
                        <span className={styles.PayInfoValueFlexTextFee}>
                            {currency.$const}
                        </span>
                    </div>
                </div>
            </div>

            <Modal
                width={450}
                open={isModalOpen}
                onCancel={handleCancel}
                padding
                closable={false}
                title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
            >
                <WithdrawConfirmCrypto
                    description={""}
                    address={account.number}
                    recipient={account.name}
                    handleCancel={handleCancel}
                    amount={new Decimal(inputCurr.value.number).minus(withdraw_fee).toNumber()}
                />
            </Modal>

            <div className={styles.Button}>
                <div className={styles.ButtonContainerCenter}>
                    <Button
                        size="lg"
                        color='green'
                        className={'w-full'}
                        onClick={showModal}
                        disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    >
                        {t("buy")} EUR
                    </Button>
                </div>
            </div>

            {md && (percent_fee > 0 || withdraw_fee > 0) && (
                <div className={styles.BottomFeeInfo + ' my-2'}>
                    <span className={styles.BottomFeeInfoText}>
                        {t("fee_is_prec")} <span className={styles.BottomFeeInfoTextBold}>
                            {withdraw_fee === 0
                                ? `${percent_fee}%`
                                : withdraw_fee
                            }</span> {t("per_transaction")}
                    </span>
                </div>
            )}
        </div>
    );
}

export default WithdrawFormPapaya;
