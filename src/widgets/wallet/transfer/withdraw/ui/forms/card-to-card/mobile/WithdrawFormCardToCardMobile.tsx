import {Select} from "antd";
import Loader from "@/shared/ui/loader";
import {Modal} from "antd";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useContext, useEffect, useState} from 'react';
import {MASK_BANK_CARD_NUMBER} from "@/shared/config/mask";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import Decimal from "decimal.js";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import WithdrawConfirmCardToCardMobile from "./WithdrawConfirmCardToCardMobile";

const {Option} = Select;

const WithdrawFormCardToCardMobile = () => {
    const currency = useContext(CtxWalletData);
    const cards = storeActiveCards(state => state.activeCards);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {onInput: onCardNumberInput} = useMask(MASK_BANK_CARD_NUMBER);
    const navigate = useNavigate();
    const {t} = useTranslation();

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

    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);
    
    const onInputDefault = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}));
    }

    const {
        min_withdraw = 0,
        // max_withdraw = null,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}



    const isValidated = () => Object.keys(inputs).every(i => {
        if (!inputs[i]) return false;
        if (i === 'cardNumber') return inputs[i].length === 19;
        
        return inputs[i].length > 0;
    });
    
    useEffect(() => {
        setInputs(() => ({
            ...inputs,
            selectedCard: cards?.find(c => ['ACTIVE', 'PLASTIC_IN_WAY'].includes(c.cardStatus))
                ? cards[0].cardId
                : null
        }));
    }, [cards]);
    
    return !cards ? <Loader className={'relative'}/> : (
        <div className="wrapper">
            <div className="row mb-8 w-full">
                <div className="col">
                    <InputCurrency.Validator value={inputCurr.value.number}
                                             description={getWithdrawDesc(min_withdraw, currency.$const)}
                                             onError={setInputCurrValid}
                                             validators={[validateBalance(currency, navigate, t),
                                                 validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
                                <InputCurrency.PercentSelector
                                    currency={currency}
                                    header={<span className='text-[#1F3446] text-[12px] font-semibold'>{t("amount")}</span>}
                                    onSelect={setInputCurr}
                                >
                                    <InputCurrency.DisplayBalance currency={currency}>
                                        <InputCurrency
                                            onChange={setInputCurr}
                                            value={inputCurr.value.string}
                                            currency={currency.$const}
                                        />
                                    </InputCurrency.DisplayBalance>
                                </InputCurrency.PercentSelector>
                            </InputCurrency.Validator>
                </div>
            </div>
            <div className="row mb-8 w-full">
                <div className="flex flex-row justify-between items-center">
                    <div className="row min-w-[80px] mb-2 mr-5">
                        <div className="col w-full">
                            <span className="w-full text-[#1F3446] text-[12px] font-semibold">{t("from_card")}:</span>
                        </div>
                    </div>
                    <div className="flex justify-end basis-[100%]">
                        <div className="col basis-[100%]">
                            <SearchSelect
                                className=""
                                value={inputs.selectedCard}
                                notFoundContent={<div className='my-3'>
                                    No active cards
                                </div>}
                                placeholder={<span className='font-normal text-gray-400'>
                                    Choose source card
                                </span>}
                                prefixIcon={inputs.selectedCard ? <IconCoin code={'EUR'}/> : null}
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
                <div className="flex justify-between flex-row items-center">
                    <div className="row min-w-[80px] mb-2 mr-5">
                        <div className="col">
                            <span className="text-[#1F3446] text-[12px] font-semibold">{t("to_card")}:</span>
                        </div>
                    </div>
                    <div className="row basis-[100%]">
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
                <div className="flex flex-row justify-between items-center">
                    <div className="row min-w-[80px] mb-2 mr-5">
                        <div className="col">
                            <span className="text-[#1F3446] text-[12px] font-semibold">{t("cardholder")}:</span>
                        </div>
                    </div>
                    <div className="row basis-[100%]">
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
                <div className="flex flex-row items-center">
                    <div className="row min-w-[80px] mb-2 mr-5">
                        <div className="col">
                            <span className="text-[#1F3446] text-[12px] font-semibold">{t("description")}:</span>
                        </div>
                    </div>
                    <div className="row w-full">
                        <div className="col flex items-center">
                            <TextArea value={inputs.comment}
                                      name={"comment"}
                                      onChange={onInputDefault}
                                      placeholder={""}
                                      style={{
                                        height:56
                                      }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row flex gap-4 text-gray-400 font-medium mb-4 mt-6 text-sm">
                        <div className="col flex flex-col w-[max-content] gap-2">
                            <div className="row">
                                <span>{t("you_will_pay")}</span>
                            </div>
                            <div className="row">
                            <span>
                            {t("you_will_get")}
                            </span>
                            </div>
                            <div className="row">
                                <span>
                            {t("fee")}
                            </span>
                            </div>
                        </div>
                        <div className="col flex flex-col w-[max-content] gap-2">
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start">{inputCurr.value.number} {currency.$const}</span>
                            </div>
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start"
                                >
                                    {new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} EUR
                                </span>
                            </div>
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start"
                                >
                                    {new Decimal(withdraw_fee).toString()} {currency.$const}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal width={450} title={t("transfer_confirmation")}
                   onCancel={handleCancel}
                   open={isModalOpen}
                   footer={null}
            >
                <WithdrawConfirmCardToCardMobile {...inputs} amount={inputCurr.value.number} handleCancel={handleCancel}/>
            </Modal>
            
            <div className="row w-full mb-[10px]">
                <div className="col">
                    <Button
                        size={"xl"}
                        className="w-full"
                        onClick={showModal}
                        disabled={!isValidated || inputCurrValid.value}
                    >Transfer</Button>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <span className='text-[#9D9D9D] text-[10px]'>
                    {t("fee_is_prec")} <span className='font-bold'>{withdraw_fee} {currency.$const} </span> after 5 transaction per month
                </span>
            </div>
        </div>
    )
};

export default WithdrawFormCardToCardMobile;
