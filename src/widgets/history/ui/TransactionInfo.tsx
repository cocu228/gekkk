import React, {useEffect, useState} from "react";
import {apiTransactionInfo, ITransactionInfo} from "@/shared/api/various/transaction-info";
import {asteriskText, isNull} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import {AxiosResponse} from "axios";
import $axios from "@/shared/lib/(cs)axios";

const TransactionInfo = ({id, handleCancel}) => {

    const [state, setState] = useState<ITransactionInfo | null>(null)

    useEffect(() => {
        (async () => {
            setState(null)

            const response: AxiosResponse = await apiTransactionInfo(id)

            if (response.data.result !== null) {
                setState(response.data.result)
            } else {
                handleCancel()
            }

        })()
    }, [id])

    return isNull(state) ? <Loader/> : <>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col">
                <span className="text-gray-400">Date:</span>
            </div>
            <div className="col">
                <span>{state.created}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Transaction type:</span>
            </div>
            <div className="col w-auto">
                <span>{state.txType}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col">
                <span className="text-gray-400">Address from:</span>
            </div>
            <div className="col">
                <span className="break-all">{asteriskText(state.addressFrom)}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400 whitespace-nowrap">Address to:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">{asteriskText(state.addressTo)}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Sender name:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">{state.groupId}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Token network:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">{state.tokenNetwork}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Amount:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">{state.amount}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Network fee:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">{state.fee}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-400">Transaction:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all">url/url</span>
            </div>
        </div>
    </>
}

export default TransactionInfo