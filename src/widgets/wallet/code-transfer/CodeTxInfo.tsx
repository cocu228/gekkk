import React, {useEffect, useState} from "react";
import {apiCodeTxInfo, IResCodeTxInfo} from "@/widgets/wallet/code-transfer/api/code-tx-info";
import Loader from "@/shared/ui/loader";
import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";

const CodeTxInfo = ({code, onBtnApply = null, applyTxCodeInfoBox=null}) => {

    const [infoCode, setInfoCode] = useState<IResCodeTxInfo | null>(null)
    const [localErrorHunter, localErrorSpan, codeTxInfoErrorInfoBox, localErrorClear, localIndicatorError] = useError()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await apiCodeTxInfo(code)


            actionResSuccess(response).success(() => {
                setInfoCode(response.data.result)
            }).reject(localErrorHunter)

            setLoading(false)

        })()
    }, [])

    return <>
        {codeTxInfoErrorInfoBox ? codeTxInfoErrorInfoBox : loading ? <Loader/> : <>
            <div className="row mb-8">
                <div className="col">
                    <div className="info-box-note -mx-14 w-auto">
                        <span>This code can be used only once</span>
                    </div>
                </div>
            </div>
            {onBtnApply !== null && <div className="row text-right pb-10 flex justify-center items-center flex-col">
                <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                    <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                        <ReactQRCode
                            style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                            value={infoCode.code}
                            viewBox={`0 0 148 148`}
                        />
                    </div>
                </div>
                <div className="row mt-4 w-full">
                    <ClipboardField value={infoCode.code}/>
                </div>
            </div>}
            <div className="row">
                <div className="col">
                    <div className="row mb-4 w-full flex">
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">Amount:</span>
                                </div>
                                <div className="col">
                                    <span className="text-green text-right">{infoCode.amount} {infoCode.currency}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">Confirmation:</span>
                                </div>
                                <div className="col">
                                    <span>{infoCode.typeTx === 12 ? "used" : "not used"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {onBtnApply && <div className="row">
                <div className="col">
                    <Button disabled={loading} onClick={() => onBtnApply(infoCode)}
                            size={"xl"}
                            className={"w-full !h-full !font-medium"}>
                        Confirm
                    </Button>
                </div>
            </div>}
            {applyTxCodeInfoBox && <div className={"row mt-4"}>{applyTxCodeInfoBox}</div>}
        </>}
        {/*</Modal>*/}
    </>
}

export default CodeTxInfo
