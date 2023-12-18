import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import {MASK_PHONE} from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from 'react';
import WithdrawConfirmPhoneNumber from "./WithdrawConfirmPhoneNumber";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";

const WithdrawFormPhoneNumber = () => {
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {onInput: onPhoneNumberInput} = useMask(MASK_PHONE);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [inputs, setInputs] = useState<{
        comment: string;
        phoneNumber: string;
    }>({
        comment: '',
        phoneNumber: null
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
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const isValidated = () => Object.keys(inputs).every(i => {
        if (!inputs[i]) return false;
        if (i === 'phoneNumber') return inputs[i].length === 19;
        
        return inputs[i].length > 0;
    });
    
    return (
        <div className="wrapper">
            <div className="row mb-8 w-full">
                <div className="col">
                    <div className="row mb-2">
                        <div className="col">
                            <span className="font-medium">Phone number</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                type={'text'}
                                onInput={onPhoneNumberInput}
                                onChange={({target}) => {
                                    setInputs(() => ({
                                        ...inputs,
                                        phoneNumber: target.value.replaceAll('+', '')
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
                            <span className="font-medium">Comment</span>
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
                                             validators={[validateBalance(currency, navigate, t),
                                                 validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
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
                <WithdrawConfirmPhoneNumber {...inputs} amount={inputCurr.value.number} handleCancel={handleCancel}/>
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

export default WithdrawFormPhoneNumber;
