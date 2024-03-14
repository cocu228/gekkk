import Form from "@/shared/ui/form/Form";
import {Modal} from "antd";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from 'react';
import UniversalTransferConfirmMobile from "./UniversalTransferConfirmMobile";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";

const UniversalTransferFormMobile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const {inputCurr, setInputCurr} = useInputState();
    const [isValid, setIsValid] = useState<boolean>(false);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();
    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);
    
    const [inputs, setInputs] = useState<{
        comment: string;
        requisite: string;
    }>({
        comment: '',
        requisite: null
    });

    const {
        min_withdraw = 0,
        max_withdraw = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
    
    useEffect(() => {
        const {
            requisite
        } = inputs;
        
        setIsValid(
            requisite?.length > 0
            && inputCurr.value.string?.length > 0);
    }, [inputs, inputCurr.value]);
    
    const onInputDefault = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}));
    }
    
    return (
        <div className="wrapper">
            
            <Form>
                <div className="row mb-8 w-full">
                    <div className="col">
                        <InputCurrency.Validator 
                            value={inputCurr.value.number}
                            description={getWithdrawDesc(min_withdraw, currency.$const)}
                            onError={setInputCurrValid}
                            validators={[
                                validateBalance(currency, navigate, t),
                                validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                                validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t)
                            ]}
                        >
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
                <div className="row mb-5 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <div className="row min-w-[80px] mb-2 mr-5">
                            <div className="col">
                                <span className="text-[#1F3446] text-[12px] font-semibold">{t("contact")}:</span>
                            </div>
                        </div>
                        <div className="row flex w-full">
                            <div className="col basis-[100%]">
                                <Input
                                    name={'requisite'}
                                    value={inputs.requisite}
                                    onInput={onInputDefault}
                                    placeholder={"Enter the user's phone number or IBAN"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                

            </Form>
            <span className="text-[#B9B9B5] text-[10px]">
                <span className="font-bold">*Fee-free</span> to Gekkard users by phone number or IBAN.
            </span>
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
                                    -
                                    {/* TODO: Зачем тут это? */}
                                </span>
                            </div>
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start"
                                >
                                    -
                                </span>
                            </div> 
                            
                           
                        </div>
                    </div>
                </div>
            </div>
            <Modal width={450}
                title={t("transfer_confirmation")}
                destroyOnClose
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <UniversalTransferConfirmMobile
                    {...inputs}
                    handleCancel={handleCancel}
                    amount={inputCurr.value.number}
                />
            </Modal>
            
            <div className="row w-full mb-[10px]">
                <div className="col">
                    <Button
                        size={"xl"}
                        className="w-full self-center"
                        onClick={showModal}
                        disabled={!isValid || inputCurrValid.value}
                    >Transfer</Button>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <span className='text-[#9D9D9D] text-[10px]'>
                    {t("fee_is_prec")} <span className='font-bold'>0 {currency.$const}</span> {t("per_transaction")}
                </span>
            </div>
        </div>
    )
};

export default UniversalTransferFormMobile;
