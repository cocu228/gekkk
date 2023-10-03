import {useContext, useState} from "react";
import Input from "@/shared/ui/input/Input";
import {Input as InputAntd} from "antd";
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {validateBalance, validateMinimumAmount} from '@/shared/config/validators';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {isDisabledBtnWithdraw} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import Decimal from "decimal.js";
import {calculateAmount} from "@/shared/lib/helpers";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";

const {TextArea} = InputAntd;


type TGetFinalFee = {
    type: {
        number: boolean | null,
        percent: boolean | null
    },
    value: {
        number: number,
        percent: number
    }
}
const getFinalFee = (curFee: number | null, perFee: number | null): TGetFinalFee => {

    let result = {
        type: {
            number: null,
            percent: null
        },
        value: {
            number: 0,
            percent: 0
        }
    }


    if (curFee === null || perFee === null) return result

    const decCurFee = new Decimal(curFee)
    const decPerFee = new Decimal(perFee)

    result.type.percent = !decPerFee.isZero()
    result.type.number = !decCurFee.isZero()
    result.value.percent = decPerFee.toNumber()
    result.value.number = decCurFee.toNumber()

    return result


}

const WithdrawFormCrypto = () => {

    const [inputs, setInputs] = useState({
        address: null,
        amount: null,
        recipient: null,
        description: null,
    })

    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const {currencies} = useContext(CtxCurrencies);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const [error, setError] = useState(false)

    const {
        min_withdraw = null,
        // max_withdraw = null,
        percent_fee = null,
        withdraw_fee = null,
        // is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

    console.log(finalFeeEntity)
    console.log(toNumberInputCurrency(inputs.amount))
    const finalFee = finalFeeEntity.type.percent ?
        calculateAmount(inputs.amount, new Decimal(finalFeeEntity.value.percent), "onlyPercentage") :
        finalFeeEntity.value.number;


    console.log(finalFee)
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }


    return Array.isArray(networksDefault) && networksDefault.length > 0 && (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600">Address</span>
                    <Input value={inputs.address} onChange={onInput}
                           disabled={!networkIdSelect}
                           placeholder={"Enter the withdrawal address"}
                           name={"address"}/>
                </div>
                    <div className='flex flex-col gap-2'>
                        <InputCurrency.Validator
                            value={new Decimal(toNumberInputCurrency(inputs.amount)).plus(finalFee).toString()}
                            description={`Minimum withdraw amount is ${min_withdraw} ${currency.$const}`}
                            onError={(v) => setError(v)}
                            validators={[
                                validateBalance(currencies.get(currency.$const), navigate),
                                validateMinimumAmount(min_withdraw, inputs.amount),
                                //validateMaximumAmount(max_withdraw)
                            ]}
                        >
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600'>Input</span>}
                                onSelect={(v) => setInputs(() => ({
                                    ...inputs,
                                    amount: v
                                }))}
                            >
                                <InputCurrency.DisplayBalance currency={currency}>
                                    <InputCurrency
                                        name={"amount"}
                                        value={inputs.amount}
                                        className={error ? "!border-red-800" : ""}
                                        currency={currency.$const}
                                        onChange={(v) => setInputs(() => ({
                                            ...inputs,
                                            amount: v
                                        }))}
                                    />
                                </InputCurrency.DisplayBalance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600">Recipient</span>
                        <InputCurrency.Validator
                                value={null}
                                validators={[]}
                                description={'As required by EU law, you must provide the name of the recipient of the funds'}
                        >
                            <Input value={inputs.recipient} onChange={onInput}
                                   disabled={!networkIdSelect}
                                   name={"recipient"}
                                   placeholder={"Enter recipient name"}/>
                        </InputCurrency.Validator>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600">Description (optional)</span>
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkIdSelect}
                              rows={2}/>
                </div>

                <Button size={"xl"} onClick={showModal}
                        disabled={isDisabledBtnWithdraw(inputs) || error}
                        className='mt-5 mb-2 w-[75%] self-center'>
                    Withdraw
                </Button>

                <Modal width={450} title="Transfer confirmation"
                       onCancel={handleCancel}
                       open={isModalOpen}>

                    <WithdrawConfirmCrypto {...inputs}
                                           handleCancel={handleCancel}
                    />

                </Modal>
                </div>
            </div>
    )
};

export default WithdrawFormCrypto;
