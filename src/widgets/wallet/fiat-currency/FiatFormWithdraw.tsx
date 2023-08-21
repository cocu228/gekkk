import {useContext, useState} from 'react';
import {CtxWalletData} from "@/widgets/wallet/model/context";
import Select from "@/shared/ui/select/Select";
import {CtxRootData} from "@/processes/RootContext";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import Button from "@/shared/ui/button/Button";
import Modal from "@/shared/ui/modal/Modal";
import WithdrawConfirm from "@/widgets/wallet/withdraw/ui/WithdrawConfirm";
import FiatWithdrawConfirm from "@/widgets/wallet/fiat-currency/FiatWithdrawConfirm";
import useModal from "@/shared/model/hooks/useModal";

const FiatFormWithdraw = () => {

    const {isModalOpen, showModal, handleCancel} = useModal();
    const currency = useContext(CtxWalletData);
    // const organizations = storeOrganizations(state => state.organizations);
    const {account} = useContext(CtxRootData);

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
    // console.log(account)

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            Select a top up method
            <div className="col">
                <Select className="w-full mt-2"
                        value={"Bank transfer"}
                />
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
                        <InputCurrency onChange={(v: unknown) => setInputs(() => ({
                            ...inputs,
                            amount: v
                        }))} currency={currency.$const}/>
                    </div>
                </div>
            </div>
        </div>
        <Modal width={450} title="Transfer confirmation"
               onCancel={handleCancel}
               open={isModalOpen}>

            <FiatWithdrawConfirm {...inputs}
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

export default FiatFormWithdraw;
