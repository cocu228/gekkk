import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import {useState} from "react";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import {calculateAmount} from "@/shared/lib/helpers";

const NoUsagesWithdrawConfirmBank = ({amount, handleCancel, withdraw_fee}) => {
    const [loading, setLoading] = useState(false)

    const [, , localErrorInfoBox] = useError()
    const onConfirm = async () => {

        setLoading(true)

        //const response = await apiCreateWithdraw(
        //    wallet.currency,
        //    networkIdSelect,
        //    new Decimal(amount).toNumber(),
        //    1.5,
        //    bankData.client.address.country + " " + bankData.client.address.city + " " + bankData.client.address.street + " " + bankData.client.address.streetNumber + " " + bankData.client.address.apartmentNumber,
        //    bankData.clientName
        //)

        //actionResSuccess(response)
        //    .success(() => {
        //        handleCancel()
        //    })
        //    .reject(localErrorHunter)

        setLoading(false)
    }

    return loading ? <Loader/> : <>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">You will pay from Gekkoin account</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{amount}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">You will get to Gekkard account</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{calculateAmount(amount, 1.5, "afterPercentage")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Fee</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>1.5%</span>
            </div>
        </div>
        <Form onFinish={onConfirm}>
            <div className="row">
                <div className="col">
                    <Button htmlType={"submit"} disabled={loading} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
            </div>
            {localErrorInfoBox &&
                <div className="row mt-4">{localErrorInfoBox}</div>}
        </Form>
    </>
}

export default NoUsagesWithdrawConfirmBank;
