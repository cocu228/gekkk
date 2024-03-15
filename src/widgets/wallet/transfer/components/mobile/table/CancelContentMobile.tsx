import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import React, {useState} from "react";
import {apiCancelCode} from "@/shared/(orval)api/gek";
import {actionResSuccess} from "@/shared/lib/helpers";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import Loader from "@/shared/ui/loader";
import {Modal} from "antd";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from 'react-i18next';
import { formatForHistoryMobile, formatForHistoryTimeMobile } from "@/shared/lib/date-helper";
import styles from "../../../../transfer/withdraw/ui/forms/styles.module.scss"
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";


const CancelContentMobile = ({code, date, amount, confirm, currency}) => {
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

    return <>
        <Button onClick={showModal} size={"sm"} gray
                className={"!py-3 !h-[fit-content]"}>{t("cancel")}</Button>
        <Modal
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
                    <div className={styles.ButtonContainer}>
                        <Button greenTransfer className={styles.ButtonTwo} size="xl" onClick={onBtnCancel}>
                            {t("confirm")}
                        </Button>
                        <Button whiteGreenTransfer className={styles.ButtonTwo} size="xl" onClick={handleCancel}>
                            {t("cancel")}
                        </Button>
                    </div>
                </div>
            </div>}
        </Modal></>
}

export default CancelContentMobile;
