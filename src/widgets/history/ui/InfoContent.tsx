import React, {useEffect, useState} from "react";
import {apiTransactionInfo, ITransactionInfo} from "@/shared/api/various/transaction-info";
import {actionResSuccess, asteriskText, isNull} from "@/shared/lib/helpers";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Loader from "@/shared/ui/loader";
import {AxiosResponse} from "axios";
import {IResHistoryTransactions} from "@/shared/api";
import InfoConfirmPartner from "@/widgets/history/ui/InfoConfirmPartner";

type TypeProps = IResHistoryTransactions & { handleCancel: () => void }

const InfoContent = (props: TypeProps) => {


    const [state, setState] = useState<ITransactionInfo | null>(null)
    const isNeedConfirm = props.type_raw === 3 && props.partner_info === ""
    const isAvailableType = props.type_raw === 3 || props.type_raw === 4

    const loading = isNull(state) && isAvailableType

    useEffect(() => {

        if (isAvailableType) {
            (async () => {
                setState(null)

                const response: AxiosResponse = await apiTransactionInfo(props.id_transaction)

                actionResSuccess(response)
                    .success(() => setState(response.data.result))
                    .reject(() => props.handleCancel())

            })()
        }

    }, [props.id_transaction])

    return loading ? <Loader/> : <>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col">
                <span className="text-gray-500 font-medium">Date:</span>
            </div>
            <div className="col font-medium">
                <span>{formatForCustomer(props.datetime)}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">Transaction type:</span>
            </div>
            <div className="col w-auto font-medium">
                <span>{props.type_transaction}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">Currency:</span>
            </div>
            <div className="col w-auto font-medium">
                <span>{props.currency}</span>
            </div>
        </div>
        {state !== null && <>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col">
                    <span className="text-gray-500 font-medium">Address from:</span>
                </div>
                <div className="col">
                    <span className="break-all font-medium">{asteriskText(state.addressFrom)}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium whitespace-nowrap">Address to:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{asteriskText(state.addressTo)}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Token network:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{state.tokenNetwork}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Fee:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{state.fee}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Transaction:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{state.explorerBaseAddress + state.txHash}</span>
                </div>
            </div>
        </>}
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">Amount:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all font-medium">{props.amount}</span>
            </div>
        </div>
        {isNeedConfirm ? <InfoConfirmPartner {...props}/> : <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">Sender name:</span>
            </div>
            <div className="col w-auto">
                <span className="break-all font-medium">{props.partner_info}</span>
            </div>
        </div>}
    </>
}

export default InfoContent