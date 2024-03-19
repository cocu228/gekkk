import React, {useContext, useEffect, useState} from "react";
import {apiCodeTxInfo} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import type {TxCodesOut} from "@/shared/(orval)api/gek/model";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { CtxWalletData } from "../../model/context";
import Decimal from "decimal.js";
import { useTranslation } from "react-i18next";
import styles from "../../../transfer/withdraw/ui/forms/styles.module.scss"
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"


const CodeTxInfo = ({code, onBtnApply = null, applyTxCodeInfoBox=null, inputCurr=null, onClose=null}) => {
    const [localErrorHunter, , codeTxInfoErrorInfoBox] = useError();
    const [infoCode, setInfoCode] = useState<TxCodesOut | null>(null);
    const currency = useContext(CtxWalletData)
    const {t} = useTranslation()
    
    const {md} = useBreakpoints()
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
            {md && <hr className={styles.ModalLine}/>}

            {!md ? <div className="row mb-8">
                <div className="col">
                    <div className={`info-box-note ${!md && "-mx-14"} w-auto`}>
                        <span>This code can be used only once</span>
                    </div>
                </div>
            </div> : <div className={`wrapper my-4 ml-4 ${styles.ModalInfo}`}>
                <div className={styles.ModalInfoIcon}>
                    <div className="col">
                        <WarningIcon/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className={styles.ModalInfoText}>
                            This code can be used only once
                        </span>
                    </div>
                </div>
            </div>}
            {onBtnApply === null && <div className="row text-right pb-10 md:pb-0 flex justify-center items-center flex-col">
                <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                    <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                        <ReactQRCode
                            style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                            value={infoCode.code}
                            viewBox={`0 0 148 148`}
                        />
                    </div>
                </div>
                {md && 
                    <div className="w-full row">
                        
                        <div className={styles.ModalPayInfo + " ml-10 px-4"}>
                            <div className={styles.ModalPayInfoCol + " items-start"}>
                                <div className="row">
                                    <span className={styles.ModalPayInfoText}>{t("you_will_pay")}:</span>
                                </div>
                                <div className="row">
                                <span className={styles.ModalPayInfoText}>
                                    {t("you_will_get")}:
                                </span>
                                </div>
                                <div className="row">
                                    <span className={styles.ModalPayInfoTextFee}>
                                        {t("fee")}:
                                    </span>
                                </div>
                            </div>
                            <div className={styles.ModalPayInfoColValue}>

                                <div className={styles.ModalPayInfoCol}>
                                    <div className={styles.ModalPayInfoValueFlex}>
                                        <span
                                            className={styles.ModalPayInfoValueFlexText}>{typeof inputCurr === "number"?inputCurr:inputCurr.value.number}</span>
                                    </div>
                                    <div className={styles.ModalPayInfoValueFlex}>
                                        <span
                                            className={styles.ModalPayInfoValueFlexText}>
                                                {typeof inputCurr === "number"?inputCurr:inputCurr.value.number}
                                        </span>
                                    </div>
                                    <div className={styles.ModalPayInfoValueFlex}>
                                        <span
                                            className={styles.ModalPayInfoValueFlexTextFee}>
                                                -
                                        </span>
                                    </div>
                                </div>
                                
                                <div className={styles.ModalPayInfoCol}>
                                    <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                        {currency.$const}
                                    </span>
                                    <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                        {currency.$const}
                                    </span>
                                    <span className={styles.ModalPayInfoValueFlexTextFee}>
                                        {currency.$const}
                                    </span>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">{t("confirmation")}:</span>
                                </div>
                                <div className="col">
                                    <span>{infoCode.typeTx === 12 ? <span className="text-[green]">on</span> : "off"}</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                }
                <div className="row mt-4 w-full md:flex md:justify-center">
                    <ClipboardField value={infoCode.code}/>
                </div>
                <div className={styles.ButtonContainerCenter}>
                    <Button
                        size="xl"
                        className="w-full mt-4"
                        onClick={onClose}
                        blueTransfer
                    >
                        {t("close")}
                    </Button>
                </div>
            </div>}
            {!md && <div className="row">
                <div className="col">
                    <div className="row mb-4 w-full flex">
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">{t("amount")}:</span>
                                </div>
                                <div className="col">
                                    <span className="text-green text-right">{infoCode.amount} {infoCode.currency}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">{t("confirmation")}:</span>
                                </div>
                                <div className="col">
                                    <span>{infoCode.typeTx === 12 ? "used" : "not used"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {(md && onBtnApply) && <div className="row">
                <div className="col">
                    <div className="row mb-4 w-full flex">
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">{t("amount")}:</span>
                                </div>
                                <div className="col">
                                    <span className="text-green text-right">{infoCode.amount} {infoCode.currency}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col w-1/2">
                            <div className="row flex">
                                <div className="col">
                                    <span className="text-gray-400 mr-2">{t("confirmation")}:</span>
                                </div>
                                <div className="col">
                                    <span>{infoCode.typeTx === 12 ? "used" : "not used"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
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
