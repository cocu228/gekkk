import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import React, {useContext, useState} from "react";
import {
    apiUpdatePartnerInfo,
    IResHistoryTransactions
} from "@/shared/api";
import Loader from "@/shared/ui/loader";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import {CtxCurrencyData} from "@/app/CurrenciesContext";

type TypeProps = IResHistoryTransactions & { handleCancel: () => void }
export const InfoConfirmPartner = (props: TypeProps) => {
    const {setRefresh} = useContext(CtxCurrencyData)
    const [loading, setLoading] = useState(false)
    const [localErrorHunter, , localErrorInfoBox] = useError()

    const [input, setInput] = useState("")
    const [partnerInfo, setPartnerInfo] = useState(null)

    const confirmPartnerInfo = async () => {

        setLoading(true)

        const response = await apiUpdatePartnerInfo(input, props.id_transaction)

        actionResSuccess(response).success(() => {
            props.handleCancel()
            setRefresh()

        }).reject(localErrorHunter)


        setLoading(false)

    }


    return <div className="row min-h-[120px] relative font-medium mb-14">
        {loading ? <Loader/> : partnerInfo === null ? <div className="col">
            <div className="row mb-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Sender name:</span>
                </div>
            </div>
            <div className="row flex gap-3">
                <div className="col w-3/5">
                    <Input value={input} onChange={({target}) => setInput(target.value)}/></div>
                <div className="col w-2/5">
                    <Button onClick={() => setPartnerInfo(input)} disabled={input === ""} size={"xl"}
                            className="w-full">Apply</Button>
                </div>
            </div>
        </div> : localErrorInfoBox ? localErrorInfoBox : <div className="col">
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-green font-medium">Sender name:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{input}</span>
                </div>
            </div>
            <div className="row flex gap-3">
                <div className="col w-full">
                    <Button onClick={confirmPartnerInfo} size={"xl"}
                            className="w-full">Confirm</Button>
                </div>
            </div>
        </div>}
    </div>
}

export default InfoConfirmPartner