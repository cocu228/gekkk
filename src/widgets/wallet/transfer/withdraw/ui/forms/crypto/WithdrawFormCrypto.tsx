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
import {getFinalFee, isDisabledBtnWithdraw} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import Decimal from "decimal.js";
import {calculateAmount} from "@/shared/lib/helpers";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";

const {TextArea} = InputAntd;

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


    const finalFee = finalFeeEntity.type.percent ?
        calculateAmount(inputs.amount, new Decimal(finalFeeEntity.value.percent), "onlyPercentage") :
        finalFeeEntity.value.number;



    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }


    return Array.isArray(networksDefault) && networksDefault.length > 0 && (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600 font-medium">Address</span>
                    <Input value={inputs.address} onChange={onInput}
                           disabled={!networkIdSelect}
                           placeholder={"Enter the withdrawal address"}
                           name={"address"}/>
                </div>
                    <div className='flex flex-col gap-2'>
                        <InputCurrency.Validator
                            value={new Decimal(toNumberInputCurrency(inputs.amount)).plus(finalFee).toString()}
                            // description={`Minimum withdraw amount is ${new Decimal(min_withdraw).toString()} ${currency.$const}`}
                            onError={(v) => setError(v)}
                            validators={[
                                validateBalance(currencies.get(currency.$const), navigate),
                                validateMinimumAmount(new Decimal(min_withdraw).toNumber(), inputs.amount),
                                //validateMaximumAmount(max_withdraw)
                            ]}
                        >
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>Input</span>}
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
                    <span className="text-gray-600 font-medium">Recipient</span>
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
                    <span className="text-gray-600 font-medium">Description (optional)</span>
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkIdSelect}
                              rows={2}/>
                </div>
                <div className="row w-full mt-4">
                    <div className="col">
                        <Modal width={450}
                               title="Transfer confirmation"
                               onCancel={handleCancel}
                               open={isModalOpen}>

                            <WithdrawConfirmCrypto {...inputs}
                                                   handleCancel={handleCancel}
                            />
                        </Modal>
                        <Button size={"xl"} onClick={showModal}

                                disabled={isDisabledBtnWithdraw(inputs) || error}
                                className='w-full self-center'>
                            Withdraw
                        </Button>

                    </div>
                </div>
                </div>
            </div>
    )
};

export default WithdrawFormCrypto;
