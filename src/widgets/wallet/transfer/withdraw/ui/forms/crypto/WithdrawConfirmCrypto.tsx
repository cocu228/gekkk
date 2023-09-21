import {useContext, useState} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateWithdraw} from "@/shared/api";
import Decimal from "decimal.js";
import {actionResSuccess, getRandomNumberWithLength, isNull} from "@/shared/lib/helpers";
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
import {formatAsNumber} from "@/shared/lib/formatting-helper";

const WithdrawConfirmCrypto = ({
                             address,
                             amount,
                             recipient,
                             description,
                             handleCancel,
                         }) => {

    const {
        networkIdSelect,
        networksForSelector,
        networksDefault
    } = useContext(CtxWalletNetworks)

    const {label} = networksForSelector.find(it => it.value === networkIdSelect)
    const {
        percent_fee = null,
        withdraw_fee = null,
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const {$const} = useContext(CtxWalletData)
    const {setRefresh} = useContext(CtxRootData)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [stageConfirm, setStageConfirm] = useState(1)


    const {onInput} = useMask(MASK_CODE)
    const onConfirm = async () => {

        setLoading(true)
        const clientNonce = getRandomNumberWithLength(8)

        // const fee = new Decimal(calculateAmount(amount, percent_fee, "onlyPercentage")).plus(withdraw_fee).toNumber()

        const response = await apiCreateWithdraw(
            $const,
            networkIdSelect,
            new Decimal(amount).toNumber(),
            percent_fee || withdraw_fee,
            isNull(address) ? "" : address,
            recipient,
            description,
            clientNonce,
            input === "" ? undefined : formatAsNumber(input)
        )

        actionResSuccess(response)
            .success(() => {
                if (stageConfirm === 1) {
                    setStageConfirm(2)
                } else {
                    handleCancel()
                    setRefresh()
                }
            })
            .reject(localErrorHunter)

        setLoading(false)
    }

    return loading ? <Loader/> : <>
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
                <span>{withdraw_fee} {$const}</span>
            </div>
        </div>
        {!description ? null : <>
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
        <Form onFinish={onConfirm}>
            <span>Transfer confirm</span>
            {stageConfirm === 2 && <FormItem className={"mb-4"} name="code" label="Code" preserve
                       rules={[{required: true, ...codeMessage}]}>
                <Input type="text"
                       onInput={onInput}
                       placeholder="Enter your PIN"
                       onChange={({target}) => setInput(target.value)}
                       autoComplete="off"
                />
            </FormItem>}
            <div className="row mb-5">
                <div className="col">
                    <Button htmlType={"submit"} disabled={(input === "" && stageConfirm === 2)} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
                <div className="col flex justify-center mt-4">
                    {localErrorInfoBox}
                </div>
            </div>
        </Form>
        {is_operable === false && <>
            <div className="info-box-danger">
                <p>Attention: transactions on this network may be delayed. We recommend that you use a different
                    network for this transaction.</p>
            </div>
        </>}
    </>
}

export default WithdrawConfirmCrypto
