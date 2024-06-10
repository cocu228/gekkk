import {useContext, useEffect, useState} from 'react';
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import WithdrawConfirmSepa from "./WithdrawConfirmSepa";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {getInitialProps, useTranslation} from "react-i18next";
import styles from "../styles.module.scss"
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import {Modal} from "@/shared/ui/modal/Modal";
import { Select } from '@/shared/ui/Select';

const WithdrawFormSepa = () => {
    const {t} = useTranslation();
    const {md} = useBreakpoints()
    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const {initialLanguage} = getInitialProps();
    const {inputCurr, setInputCurr} = useInputState();
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();
    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);
    const {min_withdraw = 0, withdraw_fee = 0} = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
    const [transferDescriptionsTranslated, setTransferDescriptionsTranslated] = useState(null);

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null
    });

    useEffect(()=>{
        setTransferDescriptionsTranslated(
            transferDescriptions.map(el=>{
            return {
                    value : el.value,
                    label : t(el.value.toLocaleLowerCase())
                }
            })
        );
    },[initialLanguage]);
    
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}));
    }

    return (
        <div className="wrapper">
            <div className="row md:mb-[10px] mb-[15px] w-full">
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
                                    onSelect={setInputCurr}
                                    header={<span className={`${styles.TitleColText} ml-[7px]`}>{t("amount")}:</span>}
                                >
                                <InputCurrency
                                    transfers={md}
                                    onChange={setInputCurr}
                                    value={inputCurr.value.string}
                                    currency={currency.$const}/>
                                </InputCurrency.PercentSelector>
                            </InputCurrency.Validator>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row md:mb-[8px] mb-[15px] w-full">
                <div className="col">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[7px]`}>{t("recipient")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                wrapperClassName={styles.InputWrap}
                                tranfers={md}
                                bordered={!md}
                                value={inputs.beneficiaryName}
                                onChange={onInput}
                                placeholder={"-enter recepient name-"}
                                name={"beneficiaryName"}
                            />
                        </div>
                    </div>
                                                    
                    <div className='text-gray-400 ml-[7px]'>
                        <span className='text-[var(--gek-orange)] text-[10px]'>
                            {!inputs.beneficiaryName && "*" + t("EW_law")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row md:mb-[10px] mb-[15px] w-full">
                <div className="col">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[7px]`}>IBAN:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input 
                                tranfers={md}
                                bordered={!md}
                                value={inputs.accountNumber} 
                                onChange={onInput}
                                name={"accountNumber"} allowDigits
                                placeholder={"-enter account number or IBAN-"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row md:mb-[7px] mb-[15px] w-full">
                <div className="flex flex-col">
                    <span className={`${styles.TitleColText} ml-[7px] relative top-[3px]`}>{t("description")}:</span>
                    <div className="row">
                        <div className="col">
                            <Select
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                listHeight={170}
                                options={transferDescriptionsTranslated}
                                placeholder={'-enter description-'}
                                value={inputs.transferDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.PayInfo} flex w-full justify-center`}>
            <div className={`${styles.PayInfoCol} w-full max-w-[160px]`}>
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
                        <span className={styles.PayInfoValueFlexText}>{inputCurr.value.number - withdraw_fee}</span>
                    </div>
                    <div className={styles.PayInfoValueFlex}>
                        <span className={styles.PayInfoValueFlexTextFee}>{withdraw_fee}</span>
                    </div>
                </div>
                
                <div className={styles.PayInfoCol}>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        {currency.$const}
                    </span>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        {currency.$const}
                    </span>
                    <span className={styles.PayInfoValueFlexTextFee}>
                        {currency.$const}
                    </span>
                </div>
            </div>
        </div>
            
            <Modal
                zIndex
                destroyOnClose
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
                title={t("confirm_transaction")}
            >
                <WithdrawConfirmSepa
                    {...inputs}
                    handleCancel={handleCancel}
                    amount={inputCurr.value.number}
                />
            </Modal>

            <div className={styles.ButtonContainerCenter}>
                <Button
                    size="lg"
                    onClick={showModal}
                    className={styles.Button}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || inputCurrValid.value}
                >
                    <span className={styles.ButtonLabel}>{t("transfer")}</span>
                </Button>
                <div className={styles.BottomFeeInfo}>
                    <span className={styles.BottomFeeInfoText}>
                        {t("fee_is_prec")} <span className={styles.BottomFeeInfoTextBold}>{withdraw_fee} EURG</span> {t("per_transaction")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default WithdrawFormSepa;
