import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission} from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";

interface IState {
    loading: boolean;
    total: IResCommission;
}

const WithdrawConfirmCardToCard = ({
    amount,
    comment,
    cardNumber,
    selectedCard,
    cardholderName,
    handleCancel
}) => {
    const [{
        total,
        loading
    }, setState] = useState<IState>({
        loading: false,
        total: undefined
    });

    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const cards = storeActiveCards(state => state.activeCards);
    const {networkIdSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);

    const details = useRef({
        account: account.account_id,
        beneficiaryName: cardholderName,
        cardNumber: cardNumber,
        fromCardId: selectedCard,
        purpose: comment,
        amount: {
            sum: {
                value: amount,
                currency: {
                    code: $const
                }
            }
        }
    });

    const onConfirm = async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        await apiPaymentContact(
            details.current,
            false
        ).then(handleCancel);
    }

    useEffect(() => {
        apiPaymentContact(details.current, true).then(({data}) => {
            setState(prev => ({
                ...prev,
                total: data as IResCommission
            }));
        });
    }, []);
    
    return <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
            <div className="row mb-5">
                <div className="col">
                    <div className="p-4 bg-gray-300">
                        <div className="wrapper flex flex-col">
                            <div className="row mb-1">
                                <div className="col">
                                    <span className="text-red-800">Please note</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span className="text-gray-400">
                                        You must only use a withdrawal address supported by the selected network. If the other platform does not support it, your assets may be lost.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Network</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{label}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Sender's Card Number</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{formatCardNumber(cards.find(c => c.cardId === selectedCard).displayPan)}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's Card Number</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{cardNumber}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's Name</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{cardholderName}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Amount</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{amount ?? '-'} {$const}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Fee</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.commission ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Total amount</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.total ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            {!comment ? null : <>
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">Comment</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span>{comment}</span>
                    </div>
                </div>
            </>}

            <Form onFinish={onConfirm}>
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                htmlType={"submit"}
                                className="w-full"
                                disabled={!total}
                        >Confirm</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmCardToCard;
