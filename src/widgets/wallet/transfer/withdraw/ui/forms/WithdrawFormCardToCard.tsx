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
import transferDescription from "@/widgets/wallet/transfer/withdraw/model/transfer-description";

const WithdrawFormCardToCard = () => {

    const {isModalOpen, showModal, handleCancel} = useModal();
    const currency = useContext(CtxWalletData);

    const [inputs, setInputs] = useState({
        cardNumber: null,
        cardholderName: null,
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
                        <span>Card number</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.cardNumber}
                               onChange={onInput}
                               placeholder={"Enter the card number"}
                               name={"cardNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Cardholder name</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.cardholderName} onChange={onInput}
                               placeholder={"Enter cardholder name"}
                               name={"cardholderName"}/>
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

            {/*<FiatWithdrawConfirm {...inputs}*/}
            {/*                     handleCancel={handleCancel}*/}
            {/*/>*/}

        </Modal>
        <div className="row mb-8 w-full">
            <div className="col">
                <Button onClick={showModal} disabled={!inputs.amount} size={"xl"} className="w-full">Withdraw</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormCardToCard;
