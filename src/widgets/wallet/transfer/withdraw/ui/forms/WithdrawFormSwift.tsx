import {useContext, useEffect, useState} from 'react';
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
// import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
// import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {Switch} from "antd";
import {transferDescriptions, swiftUrgency, swiftCommission} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
// import Decimal from "decimal.js";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useNavigate} from "react-router-dom";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {getInitialProps, useTranslation} from "react-i18next";
import styles from "../forms/styles.module.scss"
import TextArea from '@/shared/ui/input/text-area/TextArea';

const WithdrawFormSwift = () => {

    const {t} = useTranslation();

    const [transferDescriptionsTranslated, setTransferDescriptionsTranslated] = useState(null);
    const {initialLanguage} = getInitialProps();

    const {isModalOpen, showModal, handleCancel} = useModal();
    const currency = useContext(CtxWalletData);
    const navigate = useNavigate();


    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        transferUrgency: null,
        transferFee : null,
        comment: null,
        country: null
    })

    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);

    const {
        min_withdraw = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const translatedSwiftComission = swiftCommission.map(el => {
        return {
            ...el,
            label: t(el.t).toUpperCase()
        }
    })
    const translatedSwiftUrgency = swiftUrgency.map(el => {
        return {
            ...el,
            label: t(el.t).toUpperCase()
        }
    })

    useEffect(()=>{
        setTransferDescriptionsTranslated(
            transferDescriptions.map(el=>{
            return {
                    "value" : el.value,
                    "label" : t(`${el.value}`)
                }
            })
        )
    },[initialLanguage])
    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("IBAN")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               placeholder={""}
                               allowDigits
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("beneficiary_name")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("country")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"country"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("address")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"address"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">SWIFT/BIC</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"swift"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("beneficiary_bank")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryBank"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2 flex justify-between">
                    <div className="col">
                        <span className="font-medium">{t("intermediary_bank")}</span>
                    </div>
                    <div className="col">
                        <Switch className={"bg-gray-500"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("fee_type")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferFee: v
                                }))}
                                name={"transferFee"}
                                options={translatedSwiftComission}
                                placeholder={"Transfer fee"}
                                value={inputs.transferFee}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("urgency")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferUrgency: v
                                }))}
                                name={"transferUrgency"}
                                options={translatedSwiftUrgency}
                                placeholder={"Transfer urgency"}
                                value={inputs.transferUrgency}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("transfer_desc")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                listHeight={250}
                                name={"transferDescription"}
                                options={transferDescriptionsTranslated}
                                placeholder={t("transfer_details.name")}
                                value={inputs.transferDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("comment_optional")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea
                            allowDigits
                            allowSymbols
                            value={inputs.comment}
                            placeholder={""}
                            name={"comment"}
                            onChange={onInput}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
                    <div className="col">
                        <InputCurrency.Validator value={inputCurr.value.number}
                                                 onError={setInputCurrValid}
                                                 description={getWithdrawDesc(min_withdraw, currency.$const)}
                                                 validators={[validateBalance(currency, navigate, t),
                                                     validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>{t("amount")}:</span>}
                                onSelect={setInputCurr}
                            >
                            <InputCurrency
                                onChange={setInputCurr}
                                value={inputCurr.value.string}
                                currency={currency.$const}/>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>
        </div>
        <Modal width={450} title={<span className={styles.MainModalTitle}>{t("confirm_transaction")}</span>}
               onCancel={handleCancel}
               open={isModalOpen}>
            <WithdrawConfirmSepa handleCancel={handleCancel} {...inputs} amount={inputCurr.value.number}/>
        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button onClick={showModal} disabled={inputCurrValid.value} size={"xl"}
                        className="w-full">{t("withdraw_title")}</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormSwift;
