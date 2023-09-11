import {useContext, useState} from 'react';
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {Switch} from "antd";

const WithdrawFormSwift = () => {

    const {isModalOpen, showModal, handleCancel} = useModal();
    const currency = useContext(CtxWalletData);

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null,
        country: null,
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
                        <span>Country</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={"Enter the country"}
                               name={"country"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Address</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={"Enter the country"}
                               name={"address"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>SWIFT/BIC</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={"Enter the SWIFT/BIC code"}
                               name={"swift"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Beneficiary bank</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={"Enter the Beneficiary bank"}
                               name={"beneficiaryBank"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2 flex justify-between">
                    <div className="col">
                        <span>Intermediary bank</span>
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
                        <span>Fee type</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                value={"select Fee..."}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Urgency</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                value={"select Urgency..."}
                        />
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
                                value={"Transfer details"}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Comment (optional)</span>
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
                        <InputCurrency.Validator value={inputs.amount} validators={[]}>

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
        <Modal width={450} title="Transfer confirmation"
               onCancel={handleCancel}
               open={isModalOpen}>

            <WithdrawConfirmSepa {...inputs}
                                 handleCancel={handleCancel}
            />

        </Modal>
        <div className="row mb-8 w-full">
            <div className="col">
                <Button onClick={showModal} disabled={!inputs.amount} size={"xl"} className="w-full">Withdraw</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormSwift;
