import {Select} from "antd";
import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useContext, useEffect, useState} from 'react';
import {MASK_BANK_CARD_NUMBER} from "@/shared/config/mask";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import Decimal from "decimal.js";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";

const {Option} = Select;

const WithdrawFormCardToCard = () => {
    const currency = useContext(CtxWalletData);
    const cards = storeBankCards(state => state.bankCards);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {onInput: onCardNumberInput} = useMask(MASK_BANK_CARD_NUMBER);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState<{
        comment: string;
        cardNumber: string;
        selectedCard: string;
        cardholderName: string;
    }>({
        comment: '',
        cardNumber: null,
        selectedCard: null,
        cardholderName: null
    });


    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);
    
    const onInputDefault = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}));
    }

    const {
        min_withdraw = 0,
        // max_withdraw = null,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}



    const isValidated = () => Object.keys(inputs).every(i => {
        if (!inputs[i]) return false;
        if (i === 'cardNumber') return inputs[i].length === 19;
        
        return inputs[i].length > 0;
    });
    
    useEffect(() => {
        setInputs(() => ({
            ...inputs,
            selectedCard: cards ? cards[0].cardId : null
        }));
    }, [cards]);
    
    return !cards ? <Loader className={'relative'}/> : (
        <div className="wrapper">
            <div className="row mb-8 w-full">
                <div className="col">
                    <div className="row mb-2">
                        <div className="col">
                            <span className="font-medium">From card</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <SearchSelect
                                value={inputs.selectedCard}
                                placeholder={<span className='font-normal text-gray-400'>
                                    Choose source card
                                </span>}
                                prefixIcon={<IconCoin code={'EUR'}/>}
                                onChange={(val: string) => {
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
                            <span className="font-medium">Card number</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                type={'text'}
                                onInput={onCardNumberInput}
                                onChange={({target}) => {
                                    setInputs(() => ({
                                        ...inputs,
                                        cardNumber: target.value.replaceAll(' ', '')
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
                            <span className="font-medium">Cardholder name</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input value={inputs.cardholderName}
                                   onChange={({target}) => {
                                       setInputs(() => ({
                                           ...inputs,
                                           cardholderName: target.value.toUpperCase()
                                       }));
                                   }}
                                   placeholder={""}
                                   name={"cardholderName"}/>
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
                                      name={"comment"}
                                      onChange={onInputDefault}
                                      placeholder={""}
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
                    <InputCurrency.Validator value={inputCurr.value.number}
                                             description={getWithdrawDesc(min_withdraw, currency.$const)}
                                             onError={setInputCurrValid}
                                             validators={[validateBalance(currency, navigate), validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const),]}>
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
            
            <Modal width={450} title="Transfer confirmation"
                   onCancel={handleCancel}
                   open={isModalOpen}
            >
                <WithdrawConfirmCardToCard {...inputs} amount={inputCurr.value.number} handleCancel={handleCancel}/>
            </Modal>
            
            <div className="row w-full">
                <div className="col">
                    <Button
                        size={"xl"}
                        className="w-full"
                        onClick={showModal}
                        disabled={!isValidated || inputCurrValid.value}
                    >Withdraw</Button>
                </div>
            </div>
        </div>
    )
};

export default WithdrawFormCardToCard;
