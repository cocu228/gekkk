import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, isNull, uncoverResponse} from "@/shared/lib/helpers";
import {useForm} from "antd/es/form/Form";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import Timer from "@/shared/model/hooks/useTimer";
import Input from "@/shared/ui/input/Input";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import {formatAsNumber} from "@/shared/lib";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {codeMessage} from "@/shared/config/message";
import {CreateWithdrawOut} from "@/shared/(orval)api/gek/model";
import { CtxModalTrxInfo } from "../../../../model/context";
import { CtnTrxInfo } from "../../../../model/entitys";

const initStageConfirm = {
    txId: null,
    code: null,
    status: null,
    recipient: null
}

const UniversalTransferConfirmMobile = ({
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
    const {onInput} = useMask(MASK_CODE);
    const [input, setInput] = useState("");
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const setContent = useContext(CtxModalTrxInfo);
    const [stage, setStage] = useState(initStageConfirm);
    const [loading, setLoading] = useState<boolean>(false);
    const [stageReq, setStageReq] = useState(initStageConfirm);
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
                    if (err.code === 10084) {
                        localErrorHunter({message: "Wallet not found", code: err.code});
                        return;
                    }

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
                    <div className="p-4">
                        <div className="wrapper flex flex-row">
                            <div className="row mb-1">
                                {/* image */}
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span className="text-gray-400 text-[10px]">
                                        Please, check your transaction information carefully and confirm the operation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Type transaction</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{label}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{requisite}</span>
                </div>
            </div>
            <div className="w-full row">
                <div className="col">
                    <div className="w-full row flex gap-4 text-gray-400 justify-around font-medium mb-4 mt-6 text-sm">
                        <div className="col flex flex-col items-around gap-2">
                            <div className="row">
                                <span>You will pay</span>
                            </div>
                            <div className="row">
                            <span>
                            You will get
                            </span>
                            </div>
                            <div className="row">
                                <span>
                            Fee
                            </span>
                            </div>
                        </div>
                        <div className="col flex flex-col w-[max-content] gap-2">
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start">{amount} {$const}</span>
                            </div>
                            <div className="row flex items-end">
                                <span
                                    className="w-full text-start"
                                >
                                    {amount} {$const}
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

            <Form form={form} onFinish={(e) => onConfirm()}>
                {!isNull(stageReq.status) && <>
                    <span className="text-gray-400">Transfer confirmation</span>
                    
                    <FormItem name="code" label="Code" preserve rules={[{required: true, ...codeMessage}]}>
                        <Input type="text"
                           onInput={onInput}
                           autoComplete="off"
                           onChange={({target}) => setInput(target.value)}
                           placeholder={stageReq.status === 0
                            ? "Enter SMS code"
                            : stageReq.status === 1
                                ? "Enter code"
                                : "Enter PIN code"
                           }
                        />
                    </FormItem>
                    
                </>}

                <div className="row mt-4 mb-5">
                    <div className="col relative">
                        {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                            <div className="flex flex-row w-full gap-5">
                                <Button htmlType={"submit"} disabled={(input === "" && stageReq.status !== null)}
                                    className="w-full"
                                    size={"xl"}
                                >
                                    Confirm
                                </Button>

                                <Button
                                    className="w-full"
                                    onClick={handleCancel}
                                    size={"xl"}
                                    darkBlue
                                >
                                    Cancel
                                </Button>
                            </div>
                        }
                    </div>
                    
                    <div className="col flex justify-center mt-4">
                        {localErrorInfoBox}
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default UniversalTransferConfirmMobile;
