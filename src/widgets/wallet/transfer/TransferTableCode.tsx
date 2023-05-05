import styles from "@/widgets/wallet/transfer/style.module.scss";
import {GTHead} from "@/shared/ui/grid-table/table-head/GTHead";
import {GTRow} from "@/shared/ui/grid-table/table-row/GTRow";
import {GTCol} from "@/shared/ui/grid-table/table-column/GTCol";
import {GTBody} from "@/shared/ui/grid-table/table-body/GTBody";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import {GTable} from "@/shared/ui/grid-table/GTable";
import {useContext, useEffect} from "react";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import {apiCancelTxCode} from "@/widgets/wallet/transfer/api/cancel-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
const TransferTableCode = ({isOwner = false}: { isOwner?: boolean }) => {

    const currency = useContext(CtxWalletCurrency)
    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)


    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [currency])

    const onBtnCancel = async (code) => {
        const response = await apiCancelTxCode(code)
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
            {listTxCode.filter(item => item.currency === currency.const && item.isOwner === isOwner).map(it => <GTRow
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
                    {<Button size={"sm"} gray onClick={() => onBtnCancel(it.code)}
                             className={"!py-3 !h-[fit-content]"}>Cancel</Button>}
                    {it.stateCode === 1 &&
                        <Button size={"sm"} gray onClick={onBtnConfirm}
                                className={"!py-3 !h-[fit-content]"}>Confirm</Button>}
                </GTCol>
            </GTRow>)}
        </GTBody>
    </GTable>
}


export default TransferTableCode