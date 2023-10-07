import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {transferDescription} from "@/widgets/wallet/transfer/withdraw/model/transfer-description";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import Decimal from "decimal.js";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";

const WithdrawFormSepa = () => {

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
                        <span className="font-medium">Beneficiary name</span>
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
                        <span className="font-medium">Account number / IBAN</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               placeholder={""}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Transfer description</span>
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
                                options={transferDescription}
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
                        <span className="font-medium">Comment (optional)</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea value={inputs.comment}
                                  placeholder={""}
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
                                                 validators={[validateBalance(currency, navigate),
                                                     validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>Amount</span>}
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
            <WithdrawConfirmSepa {...inputs} amount={inputCurr.value.number} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || inputCurrValid.value}
                >
                    Withdraw
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepa;
