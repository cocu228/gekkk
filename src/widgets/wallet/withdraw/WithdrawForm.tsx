import Button from '@/shared/ui/button/Button';
import {Input} from 'antd';
import {useContext, useState} from "react";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {getNetworkForChose} from "@/widgets/wallet/model/helper";
import {isNull} from "@/shared/lib/helpers";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import WithdrawConfirm from "@/widgets/wallet/withdraw/WithdrawConfirm";

const {TextArea} = Input;


const WithdrawForm = () => {

    const [inputs, setInputs] = useState({
        address: null,
        amount: null,
        receiver: null,
        description: null,

    })

    const {isModalOpen, showModal, handleCancel} = useModal()

    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency)

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    return (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    Address
                    <Input value={inputs.address} onChange={onInput}
                           disabled={!networkIdSelect}
                           placeholder={"Enter the withdrawal address"}
                           name={"address"}/>
                </div>

                <div className='flex flex-col gap-2'>
                    Amount
                    <Input value={inputs.amount} onChange={onInput}
                           disabled={!networkIdSelect}
                           name={"amount"}
                           placeholder={"Enter amount"}
                           inputMode='decimal'
                           suffix={<div className='mx-1 text-gray-400 text-base align-middle'>{currency.name}</div>}/>
                    {!isNull(min_withdraw) &&
                        <span
                            className="text-green text-fs12">The minimum amount to withdraw is {min_withdraw} {currency.const}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    Receiver
                    <Input value={inputs.receiver} onChange={onInput}
                           disabled={!networkIdSelect}
                           name={"receiver"}
                           placeholder={"Enter receiver name"}/>
                </div>

                <div className='flex flex-col gap-2'>
                    Description (optional)
                    <TextArea name={"description"} value={inputs.description} onChange={onInput}
                              disabled={!networkIdSelect}
                              rows={2}/>
                </div>

                <Button size={"xl"} onClick={showModal} disabled={!inputs.amount || !inputs.address || !inputs.receiver}
                        className='mt-5 mb-2 w-[75%] self-center'>
                    Withdraw
                </Button>

                <Modal width={450} title="Transfer confirmation" onCancel={handleCancel}
                       open={isModalOpen}>
                    <WithdrawConfirm {...inputs} withdraw_fee={withdraw_fee}/>
                </Modal>


                {!isNull(withdraw_fee) && <div className='text-center'>
                    Fee is <b>{withdraw_fee}</b> per transaction
                </div>}
            </div>
        </div>
    );
};

export default WithdrawForm;
