import {useContext, useEffect, useState} from "react";
import {apiCodeTxInfo} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import type {TxCodesOut} from "@/shared/(orval)api/gek/model";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import { useTranslation } from "react-i18next";
import styles from "../../../transfer/withdraw/ui/forms/styles.module.scss"
import style from "./style.module.scss"

const CodeTxInfo = ({code, onBtnApply = null, applyTxCodeInfoBox=null, inputCurr=null, onClose=null}) => {
    const [localErrorHunter, , codeTxInfoErrorInfoBox] = useError();
    const [infoCode, setInfoCode] = useState<TxCodesOut | null>(null);
    const {t} = useTranslation()
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            const response = await apiCodeTxInfo({
                code: code
            });
            
            actionResSuccess(response).success(() => {
                setInfoCode(response.data.result);
            }).reject(localErrorHunter)

            setLoading(false);
        })();
    }, []);

    return <>
        {codeTxInfoErrorInfoBox ? codeTxInfoErrorInfoBox : loading ? <Loader/> : <>
            <div className="row mb-8">
                <div className="col">
                    <div className={`info-box-note w-auto`}>
                        <span className={style.WarnText}>{t("this_code_can_be_used")}</span>
                    </div>
                </div>
            </div>
            {onBtnApply === null && <div className="row text-right flex justify-center items-center flex-col">
                <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                    <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                        <ReactQRCode
                            style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                            value={infoCode.code}
                            viewBox={`0 0 148 148`}
                        />
                    </div>
                </div>
                <div className="row w-full mt-[20px]">
                <div className="col">
                    <div className="row mb-4 w-full flex">
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2 text-[15px] sm:text-[13px]">{t("amount")}:</span>
                                </div>
                                <div className="col">
                                    <span className="text-green text-right text-[14px] sm:text-[12px]">{infoCode.amount} {infoCode.currency}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2 text-[15px] sm:text-[13px]">{t("confirmation")}:</span>
                                </div>
                                <div className="col">
                                    <span className="text-[14px] sm:text-[12px]">{infoCode.typeTx === 12 ? "used" : "not used"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="row mt-2 w-full md:flex md:justify-center">
                    <ClipboardField value={infoCode.code}/>
                </div>
                <div className={'w-full flex justify-center'}>
                    <Button
                        size="lg"
                        color="blue"
                        className="h-[43px] w-full mt-4"
                        onClick={onClose}
                    >
                        {t("close")}
                    </Button>
                </div>
            </div>}
            {onBtnApply && <div className="row">
                <div className="flex justify-center col">
                    <Button disabled={loading} onClick={() => onBtnApply(infoCode)}
                            size="lg"
                            className={"w-full"}>
                        {t("confirm")}
                    </Button>
                </div>
            </div>}
            {applyTxCodeInfoBox && <div className={"row mt-4"}>{applyTxCodeInfoBox}</div>}
        </>}
    </>
}

export default CodeTxInfo
