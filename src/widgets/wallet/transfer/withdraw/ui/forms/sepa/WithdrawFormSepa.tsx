import {useContext, useEffect, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import Select from "@/shared/ui/select/Select";
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
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

const WithdrawFormSepa = () => {
    const {t} = useTranslation();
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
                    "value" : el.value,
                    "label" : t(`${el.value}`)
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
                                    header={<span className={styles.TitleColText}>{t("amount")}:</span>}
                                >
                                <InputCurrency
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
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.TitleColText}>{t("beneficiary_name")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input value={inputs.beneficiaryName}
                                   onChange={onInput}
                                   placeholder={t("enter_beneficiary_name")}
                                   name={"beneficiaryName"}/>
                        </div>
                    </div>
                                                    
                    <div className='text-gray-400'>
                        <span className='md:text-[#F8A73E] text-[10px]'>
                            {!inputs.beneficiaryName && "*" + t("EW_law")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.TitleColText}>{t("IBAN")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input value={inputs.accountNumber} onChange={onInput}
                                   name={"accountNumber"} allowDigits
                                   placeholder={t("enter_account_number_or_IBAN")}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.TitleColText}>{t("transfer_desc")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Select className="w-full"
                                    onChange={(v: unknown) => setInputs(() => ({
                                        ...inputs,
                                        transferDescription: v
                                    }))}
                                    name={"transferDescription"}
                                    options={transferDescriptionsTranslated}
                                    placeholder={t("transfer_details.name")}
                                    value={inputs.transferDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5 w-full">
                <div className="col">
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.TitleColText}>{t("comment")}:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col flex items-center">
                            <TextArea
                                allowDigits
                                allowSymbols
                                value={inputs.comment}
                                name={"comment"}
                                placeholder={t("comment")}
                                onChange={onInput}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal
                width={450}
                destroyOnClose
                open={isModalOpen}
                onCancel={handleCancel}
                closable={false}
                title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
            >
                <WithdrawConfirmSepa
                    {...inputs}
                    handleCancel={handleCancel}
                    amount={inputCurr.value.number}
                />
            </Modal>

            <div className={styles.ButtonContainerCenter}>
                <Button
                    size={"xl"}
                    variant='greenTransfer'
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
