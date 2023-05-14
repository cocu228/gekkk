import React, {useEffect, useState} from "react";
import {apiCodeTxInfo, IResCodeTxInfo} from "@/widgets/wallet/transfer/api/code-tx-info";
import Loader from "@/shared/ui/loader";
import ReactQRCode from "react-qr-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";

const CodeTxInfo = ({code}) => {

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
        <div className="row mb-8">
            <div className="col">
                <div className="info-box-note -mx-14 w-auto">
                    <span>This code can be used only once</span>
                </div>
            </div>
        </div>
        <div className="row text-right pb-10 flex justify-center items-center flex-col">
            <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                    <ReactQRCode
                        style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                        value={des.code}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
            <div className="row mt-4 w-full">
                <InputCopy value={des.code}/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="row mb-4 w-full flex">
                    <div className="col w-1/2">
                        <div className="row flex">
                            <div className="col">
                                <span className="text-gray-400">Amount:</span>
                            </div>
                            <div className="col">
                                <span className="text-green text-right">{des.amount} {des.currency}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col w-1/2">
                        <div className="row flex">
                            <div className="col">
                                <span className="text-gray-400">Confirmation:</span>
                            </div>
                            <div className="col">
                                <span>{des.stateCode === 1 ? "not used" : "used"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </> : <Loader/>
}

export default CodeTxInfo