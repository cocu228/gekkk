import {useContext, useState} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateWithdraw} from "@/shared/api/client/create-withdraw";
import Decimal from "decimal.js";
import {actionResSuccess, calculateAmount, isNull} from "@/shared/lib/helpers";
import Input from "@/shared/ui/input/Input";
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";
import {CtxCurrencyData} from "@/app/CurrenciesContext";

const WithdrawConfirm = ({
                             address,
                             amount,
                             receiver,
                             description,
                             handleCancel,
                             percent_fee,
                             withdraw_fee
                         }) => {

    const {networkIdSelect, networksForSelector} = useContext(CtxWalletNetworks)
    const {label} = networksForSelector.find(it => it.value === networkIdSelect)
    const {currency} = useContext(CtxWalletData)
    const {setRefresh} = useContext(CtxCurrencyData)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {onInput} = useMask(MASK_CODE);
    const onConfirm = async () => {

        setLoading(true)

        const sum = !!percent_fee ? calculateAmount(amount, percent_fee, "withPercentage") : new Decimal(amount).plus(withdraw_fee).toNumber()
        const fee = new Decimal(calculateAmount(amount, percent_fee, "onlyPercentage")).plus(withdraw_fee).toNumber()

        const response = await apiCreateWithdraw(currency, networkIdSelect, sum,
            fee, isNull(address) ? "" : address, receiver, description)

        actionResSuccess(response)
            .success(() => {
                handleCancel()
                setRefresh()
            })
            .reject(() => setError(response.data.error?.message))

        setLoading(false)
    }

    return loading ? <Loader/> : <>
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
                <span className="text-gray-400">Fee</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{percent_fee}</span>
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
                <div className="col flex justify-center">
                    {error ? <p className="text-red-800 text-fs12">{error}</p> : null}
                </div>
            </div>
        </Form>
    </>
}

export default WithdrawConfirm