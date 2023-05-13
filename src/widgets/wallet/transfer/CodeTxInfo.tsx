import React, {useContext, useEffect, useState} from "react";
import {apiCodeTxInfo, IResCodeTxInfo} from "@/widgets/wallet/transfer/api/code-tx-info";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Loader from "@/shared/ui/loader";

const WithdrawConfirm = ({code}) => {
    const [des, setDes] = useState<IResCodeTxInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await apiCodeTxInfo(code)

            if (response.data.result) setDes(response.data.result)

            setLoading(false)

        })()

    }, [])

    return !loading ? <>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Code</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{des.code}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Currency</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{des.currency}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">typeTx</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{des.typeTx}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{des.amount}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">dateTxUTC</span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <span>{formatForCustomer(des.dateTxUTC)}</span>
            </div>
        </div>
    </> : <Loader/>
}

export default WithdrawConfirm