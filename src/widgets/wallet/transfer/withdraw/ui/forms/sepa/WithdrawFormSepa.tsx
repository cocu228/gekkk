import Decimal from "decimal.js";
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
import { Select } from '@/shared/ui/oldVersions/Select';
import Commissions from "@/widgets/wallet/transfer/components/commissions";

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
        transferDescription: null
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
                                    placeholder={t("exchange.enter_amount")}
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
                                onChange={onInput}
                                name={"beneficiaryName"}
                                value={inputs.beneficiaryName}
                                placeholder={t("enter_recipient_name")}
                                caption={!inputs.beneficiaryName && t("EW_law")}
                            />
                        </div>
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
                                onChange={onInput}
                                value={inputs.accountNumber}
                                name={"accountNumber"} allowDigits
                                placeholder={t("enter_account_number_or_IBAN")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row w-full">
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
                                placeholder={`-${t("enter_description")}-`}
                                value={inputs.transferDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center w-full'>
                <Commissions
                    youWillPay={inputCurr.value.number}
                    youWillGet={new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()}
                    fee={withdraw_fee}
                />
            </div>
            
            <Modal
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
