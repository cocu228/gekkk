import {Input} from 'antd';
import {useContext, useState} from "react";
import {isNull} from "@/shared/lib/helpers";
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {validateBalance} from '@/shared/config/validators';
import {getNetworkForChose} from "@/widgets/wallet/model/helpers";
import WithdrawConfirm from "@/widgets/wallet/withdraw/ui/WithdrawConfirm";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import {isDisabledBtnWithdraw} from "@/widgets/wallet/withdraw/model/helper";
import {CtxCurrencies} from "@/processes/CurrenciesContext";

const {TextArea} = Input;

const WithdrawForm = () => {

    const [inputs, setInputs] = useState({
        address: null,
        amount: null,
        receiver: null,
        description: null,
    })

    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const {currencies} = useContext(CtxCurrencies);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const {
        min_withdraw = null,
        max_withdraw = null,
        percent_fee = null,
        withdraw_fee = null,
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    console.log(networksDefault)

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
                            value={inputs.amount}
                            description={`Minimum withdraw amount is ${min_withdraw} ${currency.$const}`}
                            validators={[
                                validateBalance(currencies.get(currency.$const), navigate)
                                //validateMinimumAmount(min_withdraw),
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
                    <span className="text-gray-600">Receiver</span>
                    <Input value={inputs.receiver} onChange={onInput}
                           disabled={!networkIdSelect}
                           name={"receiver"}
                           placeholder={"Enter receiver name"}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className="text-gray-600">Description (optional)</span>
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkIdSelect}
                              rows={2}/>
                </div>

                <Button size={"xl"} onClick={showModal}
                        disabled={isDisabledBtnWithdraw(inputs)}
                        className='mt-5 mb-2 w-[75%] self-center'>
                    Withdraw
                </Button>

                <Modal width={450} title="Transfer confirmation"
                       onCancel={handleCancel}
                       open={isModalOpen}>

                    <WithdrawConfirm {...inputs}
                                     handleCancel={handleCancel}
                    />

                </Modal>


                {!isNull(withdraw_fee) && <div className='text-center'>
                        Fee is <b>{withdraw_fee} {currency.$const}</b> per transaction
                    </div>}
                {is_operable === false && <>
                    <div className="info-box-danger">
                        <p>Attention: transactions on this network may be delayed. We recommend that you use a different
                            network for this transaction.</p>
                    </div>
                </>}
                </div>
            </div>
    )
};

export default WithdrawForm;
