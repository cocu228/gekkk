import {useContext, useState} from "react";
import {CtxWalletNetworks, CtxCurrencyData} from "@/widgets/wallet/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateWithdraw} from "@/shared/api/client/create-withdraw";
import Decimal from "decimal.js";
import {actionResSuccess, isNull} from "@/shared/lib/helpers";
import Input from "@/shared/ui/input/Input";
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";

const WithdrawConfirm = ({
                             address,
                             amount,
                             receiver,
                             description,
                             handleCancel,
                             withdraw_fee
                         }) => {

    const {networkIdSelect, networksForSelector} = useContext(CtxWalletNetworks)
    const {label} = networksForSelector.find(it => it.value === networkIdSelect)
    const {asset} = useContext(CtxCurrencyData)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const {onInput} = useMask(MASK_CODE);
    const onConfirm = async () => {

        setLoading(true)

        const response = await apiCreateWithdraw(asset.code, networkIdSelect, new Decimal(amount).toNumber(),
            withdraw_fee, isNull(address) ? "" : address, receiver, description)

        actionResSuccess(response)
            .success(() => setSuccess("Done"))
            .reject(() => setSuccess("Error"))

        setLoading(false)

        console.log(response)
    }

    return loading ? <Loader/> : success !== "" ? <p>{success}</p> : <>
        <div className="row mb-10">
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
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Network</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{label}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Address</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{address}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Receiver</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{receiver}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{amount}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Description</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{description}</span>
            </div>
        </div>
        <Form onFinish={onConfirm}>
            <span>Transfer confirm</span>
            <FormItem className={"mb-2"} name="code" label="Code" preserve
                      rules={[{required: true, ...codeMessage}]}>
                <Input type="text"
                       onInput={onInput}
                       placeholder="Phone code"
                       onChange={({target}) => setInput(target.value)}
                       autoComplete="off"
                />
            </FormItem>
            <div className="row mb-8">
                <div className="col">
                    <Button htmlType={"submit"} disabled={input === ""} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
            </div>
        </Form>
    </>
}

export default WithdrawConfirm