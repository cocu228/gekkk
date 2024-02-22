import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {useCallback, useContext, useRef, useState} from "react";
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
    status: null,
    txId: null,
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
    const [loading, setLoading] = useState<boolean>(false);
    const [stageReq, setStageReq] = useState(initStageConfirm);
    const [localErrorHunter, ,localErrorInfoBox,] = useError();
    
    const setContent = useContext(CtxModalTrxInfo);

    const details = useRef({
        tag: comment,
        amount: amount,
        currency: $const,
        recipient: requisite
    });

    const onReSendCode = useCallback(async () => {
        await onConfirm(true)
    }, []);
    
    const onConfirm = async (reSendCode = false) => {
        setLoading(!reSendCode);
        
        const response = await apiInternalTransfer({
            ...details.current,
            client_nonce: getRandomInt32(),
        }, {
            confirmationTimetick: reSendCode ? null : stageReq.txId,
            confirmationCode: reSendCode ? null : input !== "" ? formatAsNumber(input) : null
        });
        
        actionResSuccess(response)
            .success(() => {
                const result: CreateWithdrawOut = uncoverResponse(response);
                
                if (reSendCode
                    || result.confirmationStatusCode === 0
                    || result.confirmationStatusCode === 1
                    || result.confirmationStatusCode === 2) {
                    setStageReq(prev => ({
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
                    
                    <Timer onAction={onReSendCode}/>
                </>}

                <div className="row mt-4 mb-5">
                    <div className="col relative">
                        {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                            <Button htmlType={"submit"} disabled={(input === "" && stageReq.status !== null)}
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

export default UniversalTransferConfirmMobile;
