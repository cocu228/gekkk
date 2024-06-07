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
import TextArea from '@/shared/ui/input/text-area/TextArea';
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
    const {min_withdraw = 0} = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
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
            <div className="row mb-5 w-full">
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
                                    header={<span className={`${styles.TitleColText} ml-[10px]`}>{t("amount")}:</span>}
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

            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[10px]`}>{t("beneficiary_name")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                tranfers={md}
                                bordered={!md}
                                value={inputs.beneficiaryName}
                                onChange={onInput}
                                placeholder={t("enter_beneficiary_name")}
                                name={"beneficiaryName"}
                            />
                        </div>
                    </div>
                                                    
                    <div className='text-gray-400'>
                        <span className='text-[var(--gek-orange)] text-[10px]'>
                            {!inputs.beneficiaryName && "*" + t("EW_law")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[10px]`}>{t("IBAN")}:</span>
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
                                placeholder={t("enter_account_number_or_IBAN")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[10px]`}>{t("transfer_desc")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Select
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                listHeight={250}
                                options={transferDescriptionsTranslated}
                                placeholder={t("transfer_details.name")}
                                value={inputs.transferDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col w-full">
                    <div className="row mb-[3px]">
                        <div className="col">
                            <span className={`${styles.TitleColText} ml-[10px]`}>{t("comment")}:</span>
                        </div>
                    </div>
                    <div className="row w-full">
                        <div className="col w-full flex items-center">
                            {md?
                                <Input
                                    tranfers={md}
                                    bordered={!md}
                                    allowDigits
                                    allowSymbols
                                    value={inputs.comment}
                                    name={"comment"}
                                    placeholder={t("comment")}
                                    onChange={onInput}
                                />
                            :
                                <TextArea
                                    allowDigits
                                    allowSymbols
                                    value={inputs.comment}
                                    name={"comment"}
                                    placeholder={t("comment")}
                                    onChange={onInput}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal
                placeBottom={window.innerWidth < 768}
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
            </div>
        </div>
    );
}

export default WithdrawFormSepa;
