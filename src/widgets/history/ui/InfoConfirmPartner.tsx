import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import React, {useState} from "react";
import {
    apiUpdatePartnerInfo,
    IResHistoryTransactions
} from "@/shared/api";
import Loader from "@/shared/ui/loader";

type TypeProps = IResHistoryTransactions & { handleCancel: () => void }
export const InfoConfirmPartner = (props: TypeProps) => {

    const [loading, setLoading] = useState(false)

    const [isSuccess, setIsSuccess] = useState(null)

    const [input, setInput] = useState("")

    const updatePartnerInfo = async () => {
        setLoading(true)

        const response = await apiUpdatePartnerInfo(input, props.id_transaction)

        setIsSuccess(response.data.result === "Success")

        setLoading(false)

    }


    return <div className="row min-h-[120px] relative font-medium mb-14">
        {loading ? <Loader/> : isSuccess === null ? <div className="col">
            <div className="row mb-2">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">Sender name:</span>
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
        </div> : isSuccess ? <div className="col">
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="col w-auto">
                    <span className="text-green font-medium">Sender name:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{input}</span>
                </div>
            </div>
        </div> : <div className="col">
            <div className="row mb-4 flex flex-wrap gap-2">
                <div className="info-box-warning">
                    <span className="text-gray-500 font-medium">Failed to install partner</span>
                </div>
            </div>
        </div>}
    </div>
}

export default InfoConfirmPartner