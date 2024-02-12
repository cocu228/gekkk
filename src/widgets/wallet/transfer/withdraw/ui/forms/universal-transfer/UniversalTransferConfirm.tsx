import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission} from "@/shared/api";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {getRandomInt32} from "@/shared/lib/helpers";

const UniversalTransferConfirm = ({
    amount,
    comment,
    requisite,
    handleCancel
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const {$const} = useContext(CtxWalletData);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    
    const details = useRef({
        tag: comment,
        amount: amount,
        currency: $const,
        recipient: requisite,
        client_nonce: getRandomInt32()
    });
    
    const onConfirm = async () => {
        setLoading(true);
        
        // await apiPaymentContact(
        //     details.current,
        //     false
        // ).then(handleCancel);
    }
    
    useEffect(() => {
        apiInternalTransfer(details.current);
        
        // apiPaymentContact(details.current, true).then(({data}) => {
        //     setState(prev => ({
        //         ...prev,
        //         total: data as IResCommission
        //     }));
        // });
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
                    <span className="text-gray-400">Recipient's requisite</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{requisite}</span>
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
                        >Confirm</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default UniversalTransferConfirm;
