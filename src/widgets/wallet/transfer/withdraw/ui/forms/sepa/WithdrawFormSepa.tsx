import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import WithdrawConfirmSepa from "./WithdrawConfirmSepa";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {useTranslation} from "react-i18next";

const WithdrawFormSepa = () => {
    const {t} = useTranslation();
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null
    })
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const {
        min_withdraw = 0,
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    return (<div className="wrapper">
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
                        <span className="font-medium">{t("IBAN")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               name={"accountNumber"}/>
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
                                name={"transferDescription"}
                                options={transferDescriptions}
                                placeholder={"Transfer details"}
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
                        <span className="font-medium">{t("сomment")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea value={inputs.comment}
                                  name={"comment"}
                                  onChange={onInput}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
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
                                header={<span className='text-gray-600 font-medium'>{t("amount")}</span>}
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
            </div>
        </div>
        <Modal 
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title="Transfer confirmation"
        >
            <WithdrawConfirmSepa {...inputs} amount={inputCurr.value.number}/>
        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || inputCurrValid.value}
                >
                    {t("withdraw")}
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepa;
