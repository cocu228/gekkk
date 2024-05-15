import styles from "./style.module.scss";
import stylesForms from "../../../../transfer/withdraw/ui/forms/styles.module.scss"
import {formatForCustomer, formatForHistoryMobile, formatForHistoryTimeMobile} from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import {useContext, useEffect, useState} from "react";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import Modal from "@/shared/ui/modal/Modal";
import {Modal as ModalAnt} from "antd"
import useModal from "@/shared/model/hooks/useModal";
import CodeTxInfo from "../CodeTxInfo";
import CancelContent from "./CancelContent";
import {apiApplyCode} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";


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
    const {md} = useBreakpoints() 

    return !md ? <GTable className={`${styles.Table}`}>
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
    </GTable> : <GTable className={`${styles.Table}`}>
        <GTable.Head className={styles.TableHead + " rounded-[8px_8px_0px_0px]"}>
            <GTable.Row>
                <GTable.Col>
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
                    <GTable.Col className="px-2">
                        <div className="row flex items-center">
                            <div className="flex">
                                <CodeModalInfo inputCurr={it.amount} code={it.code}/>
                            </div>
                            <div className="col min-w-[14px]">
                                <CopyIcon value={it.code}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-500 text-[10px]">{formatForHistoryMobile(it.dateTxUTC)} at {formatForHistoryTimeMobile(it.dateTxUTC)}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-[color:var(--gek-dark-blue)] text-[10px]">{it.amount} {$const}</span>
                            </div>
                        </div>
                    </GTable.Col>
                    <GTable.Col className="text-center px-2">
                                <span className="text-gray-600 text-xs">
                                   {it.state}
                                </span>
                    </GTable.Col>

                    <GTable.Col className="flex flex-wrap gap-2 justify-center">
                        {visiblyConfirm ? <CodeModalConfirm date={it.dateTxUTC} code={it.code} amount={it.amount} currency={it.currency}/> :
                            <CancelContent date={it.dateTxUTC} code={it.code} amount={it.amount} currency={it.currency} confirm={it.typeTx === 12}/>}

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
    const {md} = useBreakpoints()
    const {t} = useTranslation() 
    return !md ? <>
        <span onClick={showModal}
              className="text-gra-600 font-bold break-all cursor-pointer">{code}</span>

        <Modal closable={false} padding title={<ModalTitle handleCancel={handleCancel} title={t("your_transfer_code")}/>} open={isModalOpen}
               onCancel={handleCancel}>
            <CodeTxInfo onClose={handleCancel} inputCurr={inputCurr} code={code}/>
        </Modal>
    </> : <>
        <span onClick={showModal}
              className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-[70px] text-[color:var(--gek-dark-blue)] text-[12px] cursor-pointer">{code}</span>

        <ModalAnt title={<ModalTitle handleCancel={handleCancel} title={t("your_transfer_code")}/>} closable={false} open={isModalOpen}
               onCancel={handleCancel}
               footer={null}
        >
            <CodeTxInfo onClose={handleCancel} inputCurr={inputCurr} code={code}/>
        </ModalAnt>
    </>
}

const CodeModalConfirm = ({code, amount, currency, date = null}) => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [success, setSuccess] = useState(null)
    const {md} = useBreakpoints()
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

    return !md ? <>
        {loading ? <div className="w-full h-full relative"><Loader/></div> :
            <Button skeleton onClick={() => onBtnConfirm(code)}>{t("confirm")}</Button>}

        <Modal closable={false} padding title={<ModalTitle handleCancel={handleCancel} title={t("the_code_confirmed")}/>} open={isModalOpen}
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
                    <div className="flex justify-center col">
                        <Button className="w-full" size="lg" onClick={() => {
                            handleCancel()
                        }}>{t("done")}</Button>
                    </div>
                </div>
            </>}
        </Modal>
    </> : <>
        {loading ? <div className="w-full h-full relative"><Loader/></div> :
            <Button onClick={showModal}><span className="text-[12px]">{t("confirm")}</span></Button>}

        <ModalAnt closable={false} footer={null} title={<ModalTitle handleCancel={handleCancel} title={t("confirm_code")}/>} open={isModalOpen}
               onCancel={handleCancel}>
            {localErrorInfoBox ? localErrorInfoBox : <>
                <div>
                <div className={stylesForms.ModalRows}>
                    <div className="row mb-2 mt-5">
                        <div className="col">
                            <span className={stylesForms.ModalRowsTitle}>{t("transaction_code")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={stylesForms.ModalRowsValue}>{code}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={stylesForms.ModalRowsTitle}>{t("date")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={stylesForms.ModalRowsValue}>{formatForHistoryMobile(date)} at {formatForHistoryTimeMobile(date)}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={stylesForms.ModalRowsTitle}>{t("amount")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={stylesForms.ModalRowsValue}>{amount} {currency}</span>
                        </div>
                    </div>
                </div>
                <div className={stylesForms.ButtonContainer}>
                    <Button className={stylesForms.ButtonTwo} onClick={()=>{onBtnConfirm(code); handleCancel()}}>
                        {t("confirm")}
                    </Button>
                    <Button skeleton className={stylesForms.ButtonTwo} onClick={handleCancel}>
                        {t("cancel")}
                    </Button>
                </div>
            </div>
            </>}
        </ModalAnt>
    </>
}


export default TransferTableCode;
