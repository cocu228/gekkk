import {Input, Select} from "antd";
import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import CreditCardInput from "@/widgets/wallet/transfer/withdraw/model/InputCreditCard";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";

const {Option} = Select;

const WithdrawFormCardToCard = () => {
    const currency = useContext(CtxWalletData);
    const cards = storeBankCards(state => state.bankCards);
    const {isModalOpen, showModal, handleCancel} = useModal();
    
    const [inputs, setInputs] = useState({
        selectedCard: null,
        cardNumber: null,
        cardholderName: null,
        comment: null,
        amount: null,
    });
    
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }
    
    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>From card</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <SearchSelect
                            placeholder={<span className='font-normal text-gray-400'>
                                Enter card number
                            </span>}
                            prefixIcon={inputs.selectedCard && <IconCoin code={'EUR'}/>}
                            onChange={val => {
                                setInputs(() => ({
                                    ...inputs,
                                    selectedCard: val
                                }))
                            }}
                        >
                            {cards?.filter(c => c.cardStatus === "ACTIVE")
                                .map(c => (
                                    <Option
                                        value={c.cardId}
                                        label={formatCardNumber(c.displayPan)}
                                    >
                                        <div>{formatCardNumber(c.displayPan)}</div>
                                    </Option>
                                ))
                            }
                        </SearchSelect>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Card number</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CreditCardInput
                            onChange={val => {
                                setInputs(() => ({
                                    ...inputs,
                                    cardNumber: val
                                }));
                            }}
                        />
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
               open={isModalOpen}
        >
            <WithdrawConfirmCardToCard {...inputs} handleCancel={handleCancel}/>
        </Modal>
        
        <div className="row mb-8 w-full">
            <div className="col">
                <Button onClick={showModal} disabled={!inputs.amount} size={"xl"} className="w-full">Withdraw</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormCardToCard;
