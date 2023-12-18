import {useCallback, useContext, useMemo, useState} from "react";
import Input from "@/shared/ui/input/Input";
import {Input as InputAntd} from "antd";
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from '@/shared/config/validators';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {getFinalFee, isDisabledBtnWithdraw} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import Decimal from "decimal.js";
// import {calculateAmount} from "@/shared/lib/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";

const {TextArea} = InputAntd;


export interface IWithdrawFormCryptoState {
    address: null | string,
    recipient: null | string,
    description: null | string,
}
const WithdrawFormCrypto = () => {
    const {t} = useTranslation();

    const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
        address: null,
        recipient: null,
        description: null,
    })

    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const {
        min_withdraw = 0,
        max_withdraw = 0,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);
    //
    // const finalFee = finalFeeEntity.type.percent ?
    //     calculateAmount(inputCurr.value.number, new Decimal(finalFeeEntity.value.percent), "onlyPercentage") :
    //     finalFeeEntity.type.number ? finalFeeEntity.value.number : 0;

    const finalFee = finalFeeEntity.value.number;

    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    return Array.isArray(networksDefault) && networksDefault.length > 0 && (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("address")}</span>
                    <Input value={inputs.address} onChange={onInput}
                           disabled={!networkIdSelect}
                           placeholder={t("enter_withdrawal_addr")}
                           name={"address"}/>
                </div>
                    <div className='flex flex-col gap-2'>
                        <InputCurrency.Validator
                            value={new Decimal(inputCurr.value.number).plus(finalFee).toNumber()}
                            description={getWithdrawDesc(min_withdraw, currency.$const)}
                            onError={setInputCurrValid}
                            validators={[
                                validateBalance(currency, navigate, t),
                                validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
                                validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t),
                            ]}
                        >
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>{t("amount")}</span>}
                                onSelect={setInputCurr}
                            >
                                <InputCurrency.DisplayBalance currency={currency}>
                                    <InputCurrency
                                        name={"amount"}
                                        value={inputCurr.value.string}
                                        currency={currency.$const}
                                        onChange={setInputCurr}
                                    />
                                </InputCurrency.DisplayBalance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("recipient")}</span>
                            <Input value={inputs.recipient} onChange={onInput}
                                   disabled={!networkIdSelect}
                                   name={"recipient"}
                                   placeholder={t("enter_recipient")}/>

                    <span className="text-green text-fs12">{t("EW_law")}</span>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">{t("desc_optional")}</span>
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkIdSelect}
                              rows={2}/>
                </div>
                <div className="row w-full mt-4">
                    <div className="col">
                        <Modal width={450}
                               title={t("transfer_confirmation")}
                               destroyOnClose
                               onCancel={handleCancel}
                               open={isModalOpen}>

                            <WithdrawConfirmCrypto {...inputs}
                                                   amount={inputCurr.value.number}
                                                   handleCancel={handleCancel}
                            />
                        </Modal>
                        <Button size={"xl"} onClick={showModal}

                                disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value}
                                className='w-full self-center'>
                            {t("withdraw")}
                        </Button>

                    </div>
                </div>
                </div>
            </div>
    )
};

export default WithdrawFormCrypto;
