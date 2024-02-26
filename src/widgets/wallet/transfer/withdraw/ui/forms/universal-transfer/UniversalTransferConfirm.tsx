import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, uncoverResponse} from "@/shared/lib/helpers";
import {useForm} from "antd/es/form/Form";
import {CtxModalTrxInfo} from "../../../model/context";
import {CtnTrxInfo} from "../../../model/entitys";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {CreateWithdrawOut} from "@/shared/(orval)api/gek/model";

const initStageConfirm = {
    txId: null,
    code: null,
    status: null,
    recipient: null
}

const UniversalTransferConfirm = ({
    amount,
    comment,
    requisite,
    handleCancel
}) => {
    const {
        networkTypeSelect,
        networksForSelector,
    } = useContext(CtxWalletNetworks);
    
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    
    const [form] = useForm();
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const setContent = useContext(CtxModalTrxInfo);
    const [stage, setStage] = useState(initStageConfirm);
    const [loading, setLoading] = useState<boolean>(false);
    const [localErrorHunter, ,localErrorInfoBox,] = useError();

    const details = useRef({
        tag: comment,
        amount: amount,
        currency: $const,
        recipient: requisite
    });

    useEffect(() => {
        (async () => {
            // TODO: wallet not found error
            const response = await apiInternalTransfer({
                ...details.current,
                client_nonce: getRandomInt32(),
            });
            
            actionResSuccess(response)
                .success(() => {
                    const {
                        txId,
                        message,
                        create_result,
                        confirmationStatusCode
                    }: CreateWithdrawOut = uncoverResponse(response);
                    
                    if (confirmationStatusCode === 0
                        || confirmationStatusCode === 1
                        || confirmationStatusCode === 2) {
                        setStage(prev => ({
                            ...prev,
                            txId: txId,
                            code: message,
                            recipient: create_result,
                            status: confirmationStatusCode
                        }))
                    }
                    else {
                        localErrorHunter({message: "Something went wrong.", code: 1})
                    }
                })
                .reject((err) => {
                    localErrorHunter(err);
                })
            setLoading(false);
        })()
    }, [])
    
    const onConfirm = async () => {
        setLoading(true);
        
        const response = await apiInternalTransfer({
            ...details.current,
            client_nonce: getRandomInt32(),
        }, {
            confirmationCode: stage.code,
            confirmationTimetick: stage.txId
        });
        
        actionResSuccess(response)
            .success(() => {
                const result: CreateWithdrawOut = uncoverResponse(response);
                
                if (result.confirmationStatusCode === 0
                    || result.confirmationStatusCode === 1
                    || result.confirmationStatusCode === 2) {
                    setStage(prev => ({
                        ...prev,
                        status: result.confirmationStatusCode,
                        txId: result.txId,
                    }))
                }
                if (result.confirmationStatusCode === 4) {
                    handleCancel()
                    setContent(<CtnTrxInfo/>)
                    setRefresh()
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                }
            })
            .reject((err) => {
                localErrorHunter(err);
                form.resetFields();
            })

        setLoading(false);
    }
    
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
            {comment && <>
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

            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's name</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {stage.recipient ? (
                        <span>{stage.recipient ?? '-'}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            
            <Form form={form} onFinish={(e) => onConfirm()}>
                <div className="row mt-4 mb-5">
                    <div className="col relative">
                        {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                            <Button htmlType={"submit"} disabled={!stage.recipient}
                                    className="w-full"
                                    size={"xl"}>Confirm</Button>}
                    </div>
                    
                    <div className="col flex justify-center mt-4">
                        {localErrorInfoBox}
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default UniversalTransferConfirm;
