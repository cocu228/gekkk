import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {useEffect, useState} from "react";
import {
    apiTransactionInfo,
    apiUpdatePartnerInfo,
    IResHistoryTransactions
} from "@/shared/api";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Loader from "@/shared/ui/loader";
import {actionResSuccess, asteriskText} from "@/shared/lib/helpers";

type TypeProps = IResHistoryTransactions & { handleCancel: () => void }
export const InfoConfirmPartner = (props: TypeProps) => {

    const [loading, setLoading] = useState(false)
    const [received, setReceived] = useState(null)
    const [input, setInput] = useState("")


    useEffect(() => {
        (async () => {

            const response = await apiTransactionInfo(props.id_transaction)

            actionResSuccess(response)
                .success(() => setReceived(response.data.result.addressFrom))
                .reject(() => props.handleCancel())

        })()
    }, [])
    const updatePartnerInfo = async () => {
        setLoading(true)
        await apiUpdatePartnerInfo(input, props.id_transaction)
        props.handleCancel()
    }


    return <div className="row min-h-[120px] relative font-medium mb-14">
        {!received ? <Loader/> : <div className="col">
            <div className="row mb-2 flex justify-between">
                <div className="col cursor-pointer">
                    <img width={12} height={12} src="/img/icon/Download.svg" alt="Download"/>
                </div>
                <div className="col">
                    <span>{formatForCustomer(props.datetime)}</span>
                </div>
                <div className="col">
                    <span className="text-green">{props.amount} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-2 flex gap-3">
                <div className="col">
                    <span className="whitespace-nowrap">
                             Received from:
                    </span>
                </div>
                <div className="col">
                    <span className="break-all">{asteriskText(received)}</span>
                </div>
            </div>
            <div className="row mb-2 flex">
                <div className="col">
                    <span>Sender name:</span>
                </div>
            </div>
            <div className="row flex gap-3">
                <div className="col w-3/5">
                    <Input value={input} onChange={({target}) => setInput(target.value)}/></div>
                <div className="col w-2/5">
                    <Button onClick={updatePartnerInfo} disabled={input === ""} size={"xl"}
                            className="w-full">Apply</Button>
                </div>
            </div>
        </div>}
    </div>
}

export default InfoConfirmPartner