import {Input} from 'antd';
import {useContext, useState} from "react";
import {isNull} from "@/shared/lib/helpers";
import Modal from "@/shared/ui/modal/Modal";
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency";
import {getNetworkForChose} from "@/widgets/wallet/model/helper";
import WithdrawConfirm from "@/widgets/wallet/withdraw/WithdrawConfirm";
import {CtxWalletNetworks, CtxCurrencyData} from "@/widgets/wallet/model/context";

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
    const {asset, wallet} = useContext(CtxCurrencyData)

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const onAmount = (n) => setInputs(prev => ({...prev, amount: n}))

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
                        
                        <InputCurrency
                            header={(
                                <span className="text-gray-600">Amount</span>
                            )}
                            onChange={onAmount}
                            value={inputs.amount}
                            disabled={!networkIdSelect}
                            currency={{
                                const: asset.code,
                                availableBalance: !wallet ? 0 : wallet.availableBalance.toNumber(),
                                minAmount: min_withdraw
                            }}
                        />
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

                    <Button size={"xl"} onClick={showModal} disabled={!inputs.amount || !inputs.address || !inputs.receiver}
                            className='mt-5 mb-2 w-[75%] self-center'>
                        Withdraw
                    </Button>

                    <Modal width={450} title="Transfer confirmation" onCancel={handleCancel}
                           open={isModalOpen}>
                        <WithdrawConfirm {...inputs} handleCancel={handleCancel} withdraw_fee={withdraw_fee}/>
                    </Modal>


                    {!isNull(withdraw_fee) && <div className='text-center'>
                        Fee is <b>{withdraw_fee}</b> per transaction
                    </div>}
                </div>
            </div>
    )
};

export default WithdrawForm;
