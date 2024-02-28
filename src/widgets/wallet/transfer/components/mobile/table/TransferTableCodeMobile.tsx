import styles from "./style.module.scss";
import {formatForCustomer, formatForHistoryMobile, formatForHistoryTimeMobile, formatForTimeZone} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import React, {useContext, useEffect, useState} from "react";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import {Modal} from "antd";
import useModal from "@/shared/model/hooks/useModal";
import CodeTxInfo from "../../transfer-code/CodeTxInfo";
import CancelContentMobile from "./CancelContentMobile";
import {apiApplyCode} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';
import CopyIconGreen from "@/shared/ui/copy-icon/CopyIconGreen";
import { utcToZonedTime } from "date-fns-tz";
import { timestampToTimeFormat } from "@/features/chat/model/helpers";

const TransferTableCodeMobile = ({isOwner = false}: { isOwner?: boolean }) => {

    const {$const} = useContext(CtxWalletData)
    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [$const])


    const filteredListTxCode = listTxCode.filter(item => item.currency === $const && item.isOwner === isOwner)
    const {t} = useTranslation();

    return <GTable className={`${styles.Table}`}>
        <GTable.Head className={styles.TableHead + " rounded-[8px_8px_0px_0px]"}>
            <GTable.Row>
                <GTable.Col className="text-left">
                    <div data-text={"Code"} className="col">
                        <span>{t("code")}</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Status"} className="col ellipsis ellipsis-md">
                        <span>{t("status")}</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Action"} className="col">
                        <span>{t("action")}</span>
                    </div>
                </GTable.Col>
            </GTable.Row>
        </GTable.Head>
        <GTable.Body className={styles.TableBody}>
            {filteredListTxCode.length > 0 ? filteredListTxCode.map(it => {
                const visiblyConfirm = it.stateCode === 3 && it.typeTx === 12 && it.isOwner

                return <GTable.Row
                    className="px-4 py-3 gap-3">
                    <GTable.Col>
                        <div className="row flex items-center">
                            <div className="flex mr-2">
                                <CodeModalInfo inputCurr={it.amount} code={it.code}/>
                            </div>
                            <div className="col min-w-[14px]">
                                {/*<img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>*/}
                                <CopyIcon value={it.code}/>
                                {/* <CopyIconGreen value={it.code}/> TODO: Не корректный экспорт с макета */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-500 text-[10px]">{formatForHistoryMobile(it.dateTxUTC)} at {formatForHistoryTimeMobile(it.dateTxUTC)}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-500 text-xs">{it.amount} {$const}</span>
                            </div>
                        </div>
                    </GTable.Col>
                    <GTable.Col className="text-center">
                                <span className="text-gray-600 text-xs">
                                   {it.state}
                                </span>
                    </GTable.Col>

                    <GTable.Col className="flex flex-wrap gap-2 justify-center">
                        {visiblyConfirm ? <CodeModalConfirm date={it.dateTxUTC} code={it.code} amount={it.amount} currency={it.currency}/> :
                            <CancelContentMobile date={it.dateTxUTC} code={it.code} amount={it.amount} currency={it.currency} confirm={it.typeTx === 12}/>}

                    </GTable.Col>
                </GTable.Row>
            }) : <div className={styles.Row}>
                <span>{t("no_have_transfer_code")}</span>
            </div>}
        </GTable.Body>
    </GTable>
}

const CodeModalInfo = ({code, inputCurr=null}) => {

    const {showModal, isModalOpen, handleCancel} = useModal()

    return <>
        <span onClick={showModal}
              className="text-ellipsis whitespace-nowrap overflow-hidden w-[70px] text-[12px] cursor-pointer">{code}</span>

        <Modal title={"Your transfer code"} open={isModalOpen}
               onCancel={handleCancel}
               footer={null}
        >
            <CodeTxInfo inputCurr={inputCurr} code={code}/>
        </Modal>
    </>
}

const CodeModalConfirm = ({code, amount, currency, date}) => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [success, setSuccess] = useState(null)
    const {showModal, isModalOpen, handleCancel} = useModal()
    const onBtnConfirm = async (code: string) => {
        setLoading(true)
        const response = await apiApplyCode({
            code: code
        });

        actionResSuccess(response).success(async () => setSuccess(true)).reject(localErrorHunter)

        showModal()

        setLoading(false)
    }

    useEffect(() => {

        if (success && !isModalOpen) {
            (async () => {
                await getListTxCode()
            })()
        }

    }, [isModalOpen])

    return <>
        {loading ? <div className="w-full h-full relative"><Loader/></div> :
            <Button size={"sm"} gray onClick={() => onBtnConfirm(code)}
                    className={"!py-3 !h-[fit-content]"}>{t("confirm")}</Button>}

        <Modal footer={null} title={t("confirm_code")} open={isModalOpen}
               onCancel={handleCancel}>
            {localErrorInfoBox ? localErrorInfoBox : <>
                <div>
                <div className="w-full flex-col mb-6 flex justify-center">
                    <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("transaction_code")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{code}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("date")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span className="font-bold text-[10px]">{formatForHistoryMobile(date)} at {formatForHistoryTimeMobile(date)}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("amount")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span className="font-bold text-[10px]">{amount} {currency}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row gap-5">
                    <Button className="w-full" size="xl" onClick={()=>{onBtnConfirm(code)}}>{t("confirm")}
                    </Button>
                    <Button darkBlue className="w-full" size="xl" onClick={handleCancel}>{t("cancel")}
                    </Button>
                </div>
            </div>
            </>}
        </Modal>
    </>
}


export default TransferTableCodeMobile;
