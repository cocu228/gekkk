import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import transferDescription from "@/widgets/wallet/transfer/withdraw/model/transfer-description";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
import {validateBalance} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";

const WithdrawFormSepa = () => {

    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null,
        amount: null,
    })
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Beneficiary name</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={"Enter the beneficiary name"}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Account number / IBAN</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               placeholder={"Enter account number"}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Transfer description</span>
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
                                placeholder={"Please select a description of the transaction..."}
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
                        <span>Comment</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea value={inputs.comment}
                                  placeholder={"Enter the comment"}
                                  name={"comment"}
                                  onChange={onInput}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Amount</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputs.amount}
                                                 validators={[validateBalance(currency, navigate)]}>
                            <InputCurrency
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    amount: v
                                }))}
                                value={inputs.amount}
                                currency={currency.$const}/>
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
            <WithdrawConfirmSepa {...inputs} handleCancel={handleCancel}/>
        </Modal>
        <div className="row mb-8 w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '')}
                >
                    Withdraw
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepa;
