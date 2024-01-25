import styles from "./style.module.scss";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import React, {useContext, useEffect, useState} from "react";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import CodeTxInfo from "../CodeTxInfo";
import CancelContent from "./CancelContent";
import {apiApplyCode} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';

const TransferTableCode = ({isOwner = false}: { isOwner?: boolean }) => {

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
        <GTable.Head className={styles.TableHead + " py-4"}>
            <GTable.Row>
                <GTable.Col className="text-left">
                    <div data-text={"Code"} className="col">
                        <span>{t("code")}</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Amount"} className="col ellipsis ellipsis-md">
                        <span>{t("amount")}</span>
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
                            <div className="col mr-2">
                                <CodeModalInfo code={it.code}/>
                            </div>
                            <div className="col min-w-[14px]">
                                {/*<img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>*/}
                                <CopyIcon value={it.code}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-500 text-xs">{formatForCustomer(it.dateTxUTC)}</span>
                            </div>
                        </div>
                    </GTable.Col>

                    <GTable.Col className="text-center">
                        <span className="text-gra-600 text-xs">{it.amount}</span>
                    </GTable.Col>

                    <GTable.Col className="text-center">
                                <span className="text-gray-600 text-xs">
                                   {it.state}
                                </span>
                    </GTable.Col>

                    <GTable.Col className="flex flex-wrap gap-2 justify-center">
                        {visiblyConfirm ? <CodeModalConfirm code={it.code} amount={it.amount} currency={it.currency}/> :
                            <CancelContent code={it.code} amount={it.amount} currency={it.currency} confirm={it.typeTx === 12}/>}

                    </GTable.Col>
                </GTable.Row>
            }) : <div className={styles.Row}>
                <span>{t("no_have_transfer_code")}</span>
            </div>}
        </GTable.Body>
    </GTable>
}

const CodeModalInfo = ({code}) => {

    const {showModal, isModalOpen, handleCancel} = useModal()

    return <>
        <span onClick={showModal}
              className="text-gra-600 font-bold break-all cursor-pointer">{code}</span>

        <Modal title={"Your transfer code"} open={isModalOpen}
               onCancel={handleCancel}>
            <CodeTxInfo code={code}/>
        </Modal>
    </>
}

const CodeModalConfirm = ({code, amount, currency}) => {
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

        <Modal title={"The code confirmed"} open={isModalOpen}
               onCancel={handleCancel}>
            {localErrorInfoBox ? localErrorInfoBox : <>
                <div className="row mb-8 mt-2">
                    <div className="col">
                        <p className="text-sm">{t("you_made_transfer")}</p>
                    </div>
                </div>
                <div className="row mb-8">
                    <div className="col">
                        <p className="text-xl">{amount} {currency}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button className="w-full" size={"xl"} onClick={() => {
                            handleCancel()
                        }}>{t("done")}</Button>
                    </div>
                </div>
            </>}
        </Modal>
    </>
}


export default TransferTableCode;
