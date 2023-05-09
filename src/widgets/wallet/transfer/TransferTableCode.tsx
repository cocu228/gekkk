import styles from "@/widgets/wallet/transfer/style.module.scss";
import {GTHead} from "@/shared/ui/grid-table/table-head/GTHead";
import {GTRow} from "@/shared/ui/grid-table/table-row/GTRow";
import {GTCol} from "@/shared/ui/grid-table/table-column/GTCol";
import {GTBody} from "@/shared/ui/grid-table/table-body/GTBody";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import {GTable} from "@/shared/ui/grid-table/GTable";
import React, {useContext, useEffect} from "react";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import {apiCancelTxCode} from "@/widgets/wallet/transfer/api/cancel-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import QrCode from "@/widgets/auth/ui/qr-code";
import ReactQRCode from "react-qr-code";

const TransferTableCode = ({isOwner = false}: { isOwner?: boolean }) => {

    const currency = useContext(CtxWalletCurrency)
    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const {showModal, isModalOpen, handleCancel} = useModal()

    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [currency])

    const onBtnCancel = async (code) => {
        const response = await apiCancelTxCode(code)

        if (response) await getListTxCode()
    }

    const onBtnConfirm = () => {

    }


    return <GTable className={`${styles.Table}`}>
        <GTHead className={styles.TableHead + " py-4"}>
            <GTRow>
                <GTCol className="text-left">Code</GTCol>
                <GTCol>Amount</GTCol>
                <GTCol>Status</GTCol>
                <GTCol>Action</GTCol>
            </GTRow>
        </GTHead>
        <GTBody className={styles.TableBody}>
            {listTxCode.filter(item => item.currency === currency.const && item.isOwner === isOwner).map(it => {

                const visiblyConfirm = (it.stateCode === 4 && isOwner) || (it.stateCode === 2 && !isOwner && (it.typeTx === 12 || it.typeTx === 14))

                return <GTRow
                    className="px-4 py-3 gap-3">
                    <GTCol>
                        <div className="row flex items-center">
                            <div className="col mr-2">
                                <span className="text-gra-600 font-bold break-all">{it.code}</span>
                            </div>
                            <div className="col min-w-[14px]">
                                {/*<img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>*/}
                                <InputCopy onlyIcon value={it.code}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-500 text-xs">{formatForCustomer(it.dateTxUTC)}</span>
                            </div>
                        </div>
                    </GTCol>

                    <GTCol className="text-center">
                        <span className="text-gra-600 text-xs">{it.amount}</span>
                    </GTCol>

                    <GTCol className="text-center">
                                <span className="text-gray-600 text-xs">
                                   {it.state}
                                </span>
                    </GTCol>

                    <GTCol className="flex flex-wrap gap-2 justify-center">
                        <Button onClick={showModal} size={"sm"} gray
                                className={"!py-3 !h-[fit-content]"}>Cancel</Button>
                        <Modal title={"Deleting transfer code"} open={isModalOpen} onCancel={handleCancel}>
                            <div>
                                <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                                    <p>This code will be deleted from the system. It will not be possible to transfer
                                        funds using this code.</p>
                                </div>
                                <div className="row mb-6 flex justify-center">
                                    <div
                                        className="wrapper w-[max-content] border-1 border-blue-400 border-solid p-4 rounded-md">
                                        <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                                            <ReactQRCode
                                                size={148}
                                                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                                value={it.code}
                                                viewBox={`0 0 148 148`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row flex justify-center mb-6">
                                    <div className="col">
                                        <span className="font-medium text-lg">{it.code}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <Button className="w-full" size="xl" onClick={() => {
                                        onBtnCancel(it.code)
                                        handleCancel()
                                    }}>Confirm
                                    </Button>
                                </div>

                            </div>
                        </Modal>
                        {visiblyConfirm &&
                            <Button size={"sm"} gray onClick={onBtnConfirm}
                                    className={"!py-3 !h-[fit-content]"}>Confirm</Button>}
                    </GTCol>
                </GTRow>
            })}
        </GTBody>
    </GTable>
}


export default TransferTableCode