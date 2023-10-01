import {Select} from "antd";
import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {MASK_BANK_CARD_NUMBER} from "@/shared/config/mask";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";

const {Option} = Select;

const WithdrawFormCardToCard = () => {
    const currency = useContext(CtxWalletData);
    const cards = storeBankCards(state => state.bankCards);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {onInput: onCardNumberInput} = useMask(MASK_BANK_CARD_NUMBER);
    
    const [inputs, setInputs] = useState<{
        amount: string;
        comment: string;
        cardNumber: string;
        selectedCard: string;
        cardholderName: string;
    }>({
        amount: null,
        comment: '',
        cardNumber: null,
        selectedCard: null,
        cardholderName: null
    });
    
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}));
    }
    
    const isValidated = () => Object.keys(inputs).every(i => {
        if (i === 'comment') return true;
        if (!inputs[i]) return false;
        if (i === 'cardNumber') return inputs[i].length === 19;
        
        return inputs[i].length > 0;
    });
    
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
                                Choose source card
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
                        <Input
                            placeholder={"Enter recipient's card number"}
                            type={'text'}
                            onInput={onCardNumberInput}
                            onChange={({target}) => {
                                setInputs(() => ({
                                    ...inputs,
                                    cardNumber: target.value
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
                                  name={"comment"}
                                  onChange={onInput}
                                  placeholder={"Enter the comment"}
                                  style={{
                                      minHeight: 100
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
                        <span>Amount</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputs.amount} validators={[]}>
                            <InputCurrency
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    amount: v as string
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
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!isValidated}
                >Withdraw</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormCardToCard;
