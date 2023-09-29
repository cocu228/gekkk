import React, {useEffect, useState} from "react";
import {apiTransactionInfo, ITransactionInfo} from "@/shared/api/various/transaction-info";
import {actionResSuccess, asteriskText, isNull} from "@/shared/lib/helpers";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Loader from "@/shared/ui/loader";
import {AxiosResponse} from "axios";
import {IResHistoryTransactions} from "@/shared/api";
import InfoConfirmPartner from "@/widgets/history/ui/InfoConfirmPartner";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import useError from "@/shared/model/hooks/useError";

type TypeProps = IResHistoryTransactions & { handleCancel: () => void }

const InfoContent = (props: TypeProps) => {


    const [state, setState] = useState<ITransactionInfo | null>(null)
    const isNeedConfirm = props.tx_type === 3 && props.partner_info === ""
    const isAvailableType = props.tx_type === 3 || props.tx_type === 4

    const loading = isNull(state) && isAvailableType

    const [localErrorHunter, , localErrorInfoBox] = useError()

    useEffect(() => {

        if (isAvailableType) {
            (async () => {
                setState(null)

                const response: AxiosResponse = await apiTransactionInfo(+props.id_transaction)

                actionResSuccess(response)
                    .success(() => setState(response.data.result))
                    .reject(localErrorHunter)

            })()
        }

    }, [props.id_transaction])


    return <> {localErrorInfoBox ? localErrorInfoBox : loading ? <Loader/> : <>
        <div className="mb-8">
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
                <span className="text-gray-500 font-medium">Transaction ID:</span>
            </div>
            <div className="col w-auto font-medium flex items-center">
                <span>{props.id_transaction}</span>
                <CopyIcon value={props.id_transaction}/>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">Transaction type:</span>
            </div>
            <div className="col w-auto font-medium">
                <span>{props.tx_type_text}</span>
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
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Amount:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{props.amount} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Fee:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{props.fee} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Status:</span>
                </div>
                <div className="col w-auto flex items-center">
                    <span className="break-all font-medium underline">{props.status_text}</span>
                </div>
            </div>
            {!isNeedConfirm &&
                <div className="row mb-4 flex flex-wrap gap-2">
                    <div className="col w-auto">
                        <span className="text-gray-500 font-medium">Sender name:</span>
                    </div>
                    <div className="col w-auto">
                        <span className="break-all font-medium">{props.partner_info}</span>
                    </div>
                </div>}
        </div>
        {state !== null && <>
            <div className="font-light">
            {state.addressFrom && <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col">
                    <span className="text-gray-500 font-normal">Address from:</span>
                </div>
                <div className="col flex items-center">
                    <span className="break-all font-normal">{asteriskText(state.addressFrom)}</span>
                    <CopyIcon value={state.addressFrom}/>
                </div>
            </div>}
            {state.addressTo && <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-normal whitespace-nowrap">Address to:</span>
                </div>
                <div className="col w-auto flex items-center">
                    <span className="break-all font-normal">{asteriskText(state.addressTo)}</span>
                    <CopyIcon value={state.addressTo}/>
                </div>
            </div>}
            {state.tokenNetwork && <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-normal">Token network:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-normal">{state.tokenNetwork}</span>
                </div>
            </div>}
            {state.txHash && <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-normal">Transaction:</span>
                </div>
                <div className="col w-auto flex items-center">
                    <a target={"_blank"} href={state.explorerBaseAddress + state.txHash}
                       className="break-all font-normal underline">{asteriskText(state.txHash)}</a>
                    <CopyIcon value={state.txHash}/>
                </div>
            </div>}
                {/*{state.state_text && <div className="row mb-4 flex flex-wrap gap-2">*/}
                {/*    <div className="col">*/}
                {/*        <span className="text-gray-500 font-normal">Status blockchain:</span>*/}
                {/*    </div>*/}
                {/*    <div className="col flex items-center">*/}
                {/*        <span className="break-all font-normal">{state.state_text}</span>*/}
                {/*    </div>*/}
                {/*</div>}*/}

            </div>
        </>}
        {isNeedConfirm && <InfoConfirmPartner {...props}/>}
    </>}
    </>
}

export default InfoContent
