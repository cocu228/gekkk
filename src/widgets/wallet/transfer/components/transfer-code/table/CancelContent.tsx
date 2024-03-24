import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import React, {useState} from "react";
import {apiCancelCode} from "@/shared/(orval)api/gek";
import {actionResSuccess} from "@/shared/lib/helpers";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import Loader from "@/shared/ui/loader";
import {Modal as ModalAnt} from "antd"
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../../../../transfer/withdraw/ui/forms/styles.module.scss"
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"
import { formatForHistoryMobile, formatForHistoryTimeMobile } from "@/shared/lib/date-helper";


const CancelContent = ({code, amount, confirm, currency, date = null}) => {
    const {t} = useTranslation();
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const {showModal, isModalOpen, handleCancel} = useModal()
    const {md} = useBreakpoints()

    const onBtnCancel = async () => {
        setLoading(true)
        const response = await apiCancelCode({
            code: code
        });
        
        actionResSuccess(response).success(() => {
            getListTxCode()
        }).reject(() => {
        })
        setLoading(false)
        handleCancel()


    }

    return !md ? <>
        <Button onClick={showModal} size={"sm"} gray
                className={"!py-3 !h-[fit-content]"}>{t("cancel")}</Button>
        <Modal
            title={t("deleting_transfer_code")} open={isModalOpen} onCancel={handleCancel}>
            {loading ? <Loader/> : <div>
                <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                    <p>{t("code_will_be_deleted")}</p>
                </div>
                <div className="row mb-6 flex justify-center">
                    <div
                        className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                        <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                            <ReactQRCode
                                size={120}
                                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                value={code}
                                viewBox={`0 0 148 148`}
                            />
                        </div>
                    </div>
                </div>
                <div className="row flex justify-center mb-6">
                    <div className="col">
                        <span className="font-medium text-lg">{code}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <div className="col">
                        <div className="row mb-4 w-full flex">
                            <div className="col w-1/2">
                                <div className="row flex">
                                    <div className="col">
                                        <span className="text-gray-400 mr-2">{t("amount")}:</span>
                                    </div>
                                    <div className="col">
                                        <span
                                            className="text-green text-right">{amount} {currency}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col w-1/2">
                                <div className="row flex">
                                    <div className="col">
                                        <span className="text-gray-400 mr-2">{t("confirmation")}:</span>
                                    </div>
                                    <div className="col">
                                        <span>{confirm ? t("used") : t("not_used")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Button className="w-full" size="xl" onClick={onBtnCancel}>{t("delete_this_code")}
                    </Button>
                </div>
            </div>}
        </Modal></> : <>
        <Button redTransferCode onClick={showModal} size={"sm"}
                className={"!py-3 w-full !h-[fit-content]"}><span className='text-[12px]'>{t("cancel")}</span></Button>
        <ModalAnt
            title={<span className={styles.MainModalTitle}>{t("cancel_code")}</span>} footer={null} open={isModalOpen} onCancel={handleCancel}>
            {!md ? (loading ? <Loader/> : <div>
                <div className="row w-full px-5 py-4 mb-6">
                    <p className="text-[12px]">{t("code_will_be_deleted")}</p>
                </div>
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
                    <Button className="w-full" size="xl" onClick={onBtnCancel}>{t("confirm")}
                    </Button>
                    <Button darkBlue className="w-full" size="xl" onClick={handleCancel}>{t("cancel")}
                    </Button>
                </div>
            </div>) : <div>
                <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66]"/>
                <div className="row mb-5">
                    <div className="col">
                        <div className="p-4">
                            <div className={`wrapper ${styles.ModalInfo}`}>
                                <div className={styles.ModalInfoIcon}>
                                    <div className="col">
                                        <WarningIcon/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className={styles.ModalInfoText}>
                                            {t("code_will_be_deleted")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ModalRows}>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("transaction_code")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{code}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("date")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{formatForHistoryMobile(date)} at {formatForHistoryTimeMobile(date)}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("amount")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{amount} {currency}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.ButtonContainer}>
                    <Button greenTransfer className={styles.ButtonTwo} size="xl" onClick={onBtnCancel}>
                        {t("confirm")}
                    </Button>
                    <Button whiteGreenTransfer className={styles.ButtonTwo} size="xl" onClick={handleCancel}>
                        {t("cancel")}
                    </Button>
                </div>
            </div>}
        </ModalAnt></>
}

export default CancelContent;