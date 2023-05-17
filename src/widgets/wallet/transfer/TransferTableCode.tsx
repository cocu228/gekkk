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
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";
import CancelContent from "@/widgets/wallet/transfer/CancelContent";

const TransferTableCode = ({isOwner = false}: { isOwner?: boolean }) => {

    const currency = useContext(CtxWalletCurrency)
    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    const modalCodeInfo = useModal()

    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [currency])

    const onBtnConfirm = () => {

    }

    console.log(listTxCode.filter(item => item.currency === currency.const && item.isOwner === isOwner))
    return <GTable className={`${styles.Table}`}>
        <GTHead className={styles.TableHead + " py-4"}>
            <GTRow>
                <GTCol className="text-left">
                    <div data-text={"Code"} className="col">
                        <span>Code</span>
                    </div>
                </GTCol>
                <GTCol>
                    <div data-text={"Amount"} className="col ellipsis ellipsis-md">
                        <span>Amount</span>
                    </div>
                </GTCol>
                <GTCol>
                    <div data-text={"Status"} className="col ellipsis ellipsis-md">
                        <span>Status</span>
                    </div>
                </GTCol>
                <GTCol>
                    <div data-text={"Action"} className="col">
                        <span>Action</span>
                    </div>
                </GTCol>
            </GTRow>
        </GTHead>
        <GTBody className={styles.TableBody}>
            {listTxCode.filter(item => item.currency === currency.const && item.isOwner === isOwner).map(it => {

                const visiblyConfirm = it.stateCode === 3 && it.typeTx === 12 && it.isOwner

                return <GTRow
                    className="px-4 py-3 gap-3">
                    <GTCol>
                        <div className="row flex items-center">
                            <div className="col mr-2">
                                <CodeTxInfo code={it.code}/>
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
                        {visiblyConfirm ?
                            <Button size={"sm"} gray onClick={onBtnConfirm}
                                    className={"!py-3 !h-[fit-content]"}>Confirm</Button> :
                            <CancelContent code={it.code}/>}
                    </GTCol>
                </GTRow>
            })}
        </GTBody>
    </GTable>
}


export default TransferTableCode