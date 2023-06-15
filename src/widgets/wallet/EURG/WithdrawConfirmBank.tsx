import React, {useContext, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";
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
import useError from "@/shared/model/hooks/useError";
import {storeBankData} from "@/shared/store/bank-data/bank-data";

const WithdrawConfirmBank = ({amount, handleCancel, withdraw_fee}) => {


    const {networkIdSelect, networksForSelector, networksDefault} = useContext(CtxWalletNetworks)
    // const {label} = networksForSelector.find(it => it.value === networkIdSelect)
    // const {percent_fee} = networksDefault.find(it => it.id === networkIdSelect)
    const bankData = storeBankData(state => state.bankData);
    const wallet = useContext(CtxWalletData)
    const [loading, setLoading] = useState(false)
    // const [localErrorHunter, localErrorSpan, localErrorInfoBox] = useError()

    const [localErrorHunter, localErrorSpan, localErrorInfoBox] = useError()
    const onConfirm = async () => {

        setLoading(true)

        const response = await apiCreateWithdraw(
            wallet.currency,
            networkIdSelect,
            new Decimal(amount).toNumber(),
            calculateAmount(amount, 1.5, "onlyPercentage"),
            bankData.client.address.country + " " + bankData.client.address.city + " " + bankData.client.address.street + " " + bankData.client.address.streetNumber + " " + bankData.client.address.apartmentNumber,
            bankData.clientName
        )

        actionResSuccess(response)
            .success(() => {
                handleCancel()
            })
            .reject(localErrorHunter)

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
                <span>{calculateAmount(amount, 1.5, "withPercentage")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">You will get to Gekkard account</span>
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
                <span>1.5%</span>
            </div>
        </div>

        {/*<div className="row mb-4">*/}
        {/*    <div className="col">*/}
        {/*        <span className="text-gray-400">Address</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="row mb-6">*/}
        {/*    <div className="col">*/}
        {/*        <span>{address}</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="row mb-4">*/}
        {/*    <div className="col">*/}
        {/*        <span className="text-gray-400">Receiver</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="row mb-6">*/}
        {/*    <div className="col">*/}
        {/*        <span>{receiver}</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="row mb-4">*/}
        {/*    <div className="col">*/}
        {/*        <span className="text-gray-400">Description</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="row mb-6">*/}
        {/*    <div className="col">*/}
        {/*        <span>{description}</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <Form onFinish={onConfirm}>
            {/*<span>Transfer confirm</span>*/}
            <div className="row">
                <div className="col">
                    <Button htmlType={"submit"} disabled={loading} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
            </div>
            {localErrorInfoBox && <div className="row mt-4">{localErrorInfoBox}</div>}
        </Form>
    </>
}

export default WithdrawConfirmBank;
