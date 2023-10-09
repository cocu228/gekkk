import {useCallback, useContext, useState, memo, useRef} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateWithdraw, ICreateWithdrawParams} from "@/shared/api";
import Decimal from "decimal.js";
import {actionResSuccess, getRandomInt32, isNull, uncoverResponse} from "@/shared/lib/helpers";
import Input from "@/shared/ui/input/Input";
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import Timer from "@/shared/model/hooks/useTimer";
import InfoBox from "@/widgets/info-box";
import {IWithdrawFormCryptoState} from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto";
import {IUseInputState} from "@/shared/ui/input-currency/model/useInputState";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {useForm} from "antd/es/form/Form";


const initStageConfirm = {
    status: null,
    txId: null,
    fee: null,
    autoInnerTransfer: false
}

type TProps = IWithdrawFormCryptoState & {
    amount: IUseInputState["value"]["number"],
    handleCancel: () => void
}

const WithdrawConfirmCrypto = memo(({
    address,
    amount,
    recipient,
    description,
    handleCancel,
                                    }: TProps) => {

    const {
        networkIdSelect,
        networksForSelector,
        networksDefault
    } = useContext(CtxWalletNetworks)

    const {label} = networksForSelector.find(it => it.value === networkIdSelect)
    const [form] = useForm();
    const {
        percent_fee = 0,
        withdraw_fee = 0,
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const {$const} = useContext(CtxWalletData)
    const {setRefresh} = useContext(CtxRootData)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [stageReq, setStageReq] = useState(initStageConfirm)

    const fragmentReqParams = useRef<Omit<ICreateWithdrawParams, "client_nonce" | "auto_inner_transfer">>({
        currency: $const,
        token_network: networkIdSelect,
        amount: amount,
        fee: percent_fee || withdraw_fee,
        address: isNull(address) ? "" : address,
        partner_info: recipient,
        tag: isNull(description) ? "" : description,
    })

    const onReSendCode = useCallback(async () => {
        await onConfirm(true)
    }, [])

    const {onInput} = useMask(MASK_CODE)
    const onConfirm = async (reSendCode = false) => {

        setLoading(!reSendCode)

        const response = await apiCreateWithdraw(
            {
                ...fragmentReqParams.current,
                auto_inner_transfer: stageReq.autoInnerTransfer,
                client_nonce: getRandomInt32()
            },
            reSendCode ? null : input !== "" ? formatAsNumber(input) : null,
            reSendCode ? null : stageReq.txId
        )

        actionResSuccess(response)

            .success(() => {

                const result = uncoverResponse(response)

                if (result.confirmationStatusCode === 0 || reSendCode) {
                    setStageReq(prev => ({
                        ...prev,
                        status: result.confirmationStatusCode,
                        txId: result.txId,
                        fee: result.fee
                    }))
                }
                if (result.confirmationStatusCode === 4) {
                    handleCancel()
                    setRefresh()
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                }
            })
            .reject((err) => {
                if (err.code === 10035) {
                    setStageReq(prev => ({
                        ...prev,
                        autoInnerTransfer: true,
                        // status: result.confirmationStatusCode,
                        // txId: result.txId,
                        // fee: result.fee
                    }))
                } else {
                    localErrorHunter(err)
                    form.resetFields();
                }
            })

        setLoading(false)
    }

    return <>
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
                <span className="text-gray-400">Address</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{address}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Recipient's name</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{recipient}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{amount} {$const}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Fee</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{new Decimal(withdraw_fee).toString()} {$const}</span>
            </div>
        </div>
        {description && <>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Description</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{description}</span>
                </div>
            </div>
        </>}
        <Form form={form} onFinish={(e) => onConfirm()}>
            <span>Transfer confirm</span>
            {!isNull(stageReq.status) && <>
                <FormItem name="code" label="Code" preserve rules={[{required: true, ...codeMessage}]}>
                <Input type="text"
                       onInput={onInput}
                       placeholder="Enter SMS code"
                       onChange={({target}) => setInput(target.value)}
                       autoComplete="off"
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
                    {localErrorInfoBox ? localErrorInfoBox : stageReq.autoInnerTransfer &&
                        <InfoBox>The address is within our system. The transfer will be made via the internal network,
                            and not through the blockchain. Are you sure you want to continue?</InfoBox>}
                </div>
            </div>
        </Form>
        {/*{is_operable === false && <>*/}
        {/*    <div className="info-box-danger">*/}
        {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
        {/*            network for this transaction.</p>*/}
        {/*    </div>*/}
        {/*</>}*/}
    </>
})

export default WithdrawConfirmCrypto
