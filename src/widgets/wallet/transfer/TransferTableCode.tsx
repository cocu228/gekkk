import styles from "@/widgets/wallet/transfer/style.module.scss";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import React, {useContext, useEffect, useState} from "react";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";
import CancelContent from "@/widgets/wallet/transfer/CancelContent";
import {apiApplyTxCode} from "@/shared/api";
import Loader from "@/shared/ui/loader";

const TransferTableCode = ({isOwner = false}: { isOwner?: boolean }) => {

    const {currency} = useContext(CtxWalletData)
    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [currency])


    console.log(listTxCode.filter(item => item.currency === currency && item.isOwner === isOwner))
    return <GTable className={`${styles.Table}`}>
        <GTable.Head className={styles.TableHead + " py-4"}>
            <GTable.Row>
                <GTable.Col className="text-left">
                    <div data-text={"Code"} className="col">
                        <span>Code</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Amount"} className="col ellipsis ellipsis-md">
                        <span>Amount</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Status"} className="col ellipsis ellipsis-md">
                        <span>Status</span>
                    </div>
                </GTable.Col>
                <GTable.Col>
                    <div data-text={"Action"} className="col">
                        <span>Action</span>
                    </div>
                </GTable.Col>
            </GTable.Row>
        </GTable.Head>
        <GTable.Body className={styles.TableBody}>
            {listTxCode.filter(item => item.currency === currency && item.isOwner === isOwner).map(it => {

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
                                <InputCopy onlyIcon value={it.code}/>
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
                            <CancelContent code={it.code}/>}

                    </GTable.Col>
                </GTable.Row>
            })}
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
    const [loading, setLoading] = useState(false)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const onBtnConfirm = async (code) => {
        setLoading(true)
        const response = await apiApplyTxCode(code)
        showModal()
        getListTxCode()
        setLoading(false)
    }

    const {showModal, isModalOpen, handleCancel} = useModal()

    return <>
        {loading ? <div className="w-full h-full relative"><Loader/></div> :
            <Button size={"sm"} gray onClick={() => onBtnConfirm(code)}
                    className={"!py-3 !h-[fit-content]"}>Confirm</Button>}

        <Modal title={"The code confirmed"} open={isModalOpen}
               onCancel={handleCancel}>
            <>
                <div className="row mb-6">
                    <div className="col">
                        <p className="text-sm">You made a transfer in the amount of:</p>
                    </div>
                </div>
                <div className="row mb-12">
                    <div className="col">
                        <p className="text-xl text-green">{amount} {currency}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button className="w-full" size={"xl"} onClick={() => {
                            handleCancel()
                        }}>Done</Button>
                    </div>
                </div>
            </>
        </Modal>
    </>
}


export default TransferTableCode;
