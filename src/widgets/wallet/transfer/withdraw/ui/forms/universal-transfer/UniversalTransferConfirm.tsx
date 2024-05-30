import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, uncoverResponse} from "@/shared/lib/helpers";
import {GlobalCtxModalContext} from "@/app/providers/GlobalCtxModalProvider";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {CreateWithdrawOut} from "@/shared/(orval)api/gek/model";
import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss"
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";

const initStageConfirm = {
    txId: null,
    code: null,
    status: null,
    recipient: null
}

const UniversalTransferConfirm = ({
    amount,
    comment,
    requisite,
    handleCancel,
}) => {
    const {t} = useTranslation();
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const {setContent} = useContext(GlobalCtxModalContext);
    const [stage, setStage] = useState(initStageConfirm);
    const [loading, setLoading] = useState<boolean>(true);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const [localErrorHunter, ,localErrorInfoBox,] = useError();
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        tag: comment,
        amount: amount,
        currency: $const,
        recipient: requisite
    });

    useEffect(() => {
        (async () => {
            // TODO: wallet not found error
            const response = await apiInternalTransfer({
                ...details.current,
                client_nonce: getRandomInt32(),
            });
            
            actionResSuccess(response)
                .success(() => {
                    const {
                        txId,
                        message,
                        create_result,
                        confirmationStatusCode
                    }: CreateWithdrawOut = uncoverResponse(response);
                    
                    if (confirmationStatusCode === 0
                        || confirmationStatusCode === 1
                        || confirmationStatusCode === 2) {
                        setStage(prev => ({
                            ...prev,
                            txId: txId,
                            code: message,
                            recipient: create_result,
                            status: confirmationStatusCode
                        }))
                    }
                    else {
                        localErrorHunter({message: "Something went wrong.", code: 1});
                    }
                })
                .reject(localErrorHunter);

            setLoading(false);
        })()
    }, []);
    
    const onConfirm = async () => {
        setLoading(true);
        
        const response = await apiInternalTransfer({
            ...details.current,
            client_nonce: getRandomInt32(),
        }, {
            confirmationCode: stage.code,
            confirmationTimetick: stage.txId
        });
        
        actionResSuccess(response)
            .success(() => {
                const result: CreateWithdrawOut = uncoverResponse(response);
                
                if (result.confirmationStatusCode === 0
                    || result.confirmationStatusCode === 1
                    || result.confirmationStatusCode === 2) {
                    setStage(prev => ({
                        ...prev,
                        status: result.confirmationStatusCode,
                        txId: result.txId,
                    }))
                }
                if (result.confirmationStatusCode === 4) {
                    handleCancel();
                    setRefresh();
                    displayHistory();
                    setContent({
                        title: 'Successfull transaction',
                        content: <ModalTrxStatusSuccess/>
                    });
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                }
            })
            .reject(localErrorHunter);

        setLoading(false);
    }
    
    return (
        <div className="-md:px-4">
            {loading && <Loader className='justify-center'/>}
            
            <div className={loading ? 'collapse' : ''}>
                <div className="row mb-5 md:mb-0">
                    <div className="col">
                        <div className="p-4">
                            <div className={`wrapper ${styles.ModalInfo}`}>
                                <div className={styles.ModalInfoIcon + " self-start"}>
                                    <div className="col">
                                        <IconApp color="#8F123A" size={15} code="t27" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className={styles.ModalInfoText}>
                                            {t("check_your_information_carefully")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className={styles.ModalRows}>
                    <div className="row mb-2 md:mb-1">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{label}</span>
                        </div>
                    </div>
                    <div className="row mb-2 md:mb-1">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>Amount</span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>{amount} {$const}</span>
                        </div>
                    </div>
                    <div className="row mb-2 md:mb-1">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>Requisite</span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>{requisite}</span>
                        </div>
                    </div>
                    <div className="row mb-2 md:mb-1">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("recipient_name")}</span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>{stage.recipient ?? '-'}</span>
                        </div>
                    </div>
                    {comment && <>
                        <div className="row mb-2 md:mb-1">
                            <div className="col">
                                <span className={styles.ModalRowsTitle}>{t("description")}</span>
                            </div>
                        </div>
                        <div className="row mb-4 md:mb-2">
                            <div className="col">
                                <span className={styles.ModalRowsValue}>{comment}</span>
                            </div>
                        </div>
                    </>}
                </div>

                <div className="row mt-4">
                    <div className="col relative">
                        <div className={styles.ButtonContainer + " px-4"}>
                            <Button htmlType={"submit"}
                                onClick={onConfirm}
                                className={styles.ButtonTwo}
                            >
                                {t("confirm")}
                            </Button>

                            <Button
                                skeleton
                                className={styles.ButtonTwo}
                                onClick={handleCancel}
                            >
                                {t("cancel")}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="col flex justify-center mt-4">
                        {localErrorInfoBox}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniversalTransferConfirm;
