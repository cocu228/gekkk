import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, isNull, uncoverResponse} from "@/shared/lib/helpers";
import {useForm} from "antd/es/form/Form";
import {CtxModalTrxInfo} from "../../../model/context";
import {CtnTrxInfo} from "../../../model/entitys";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {CreateWithdrawOut} from "@/shared/(orval)api/gek/model";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss"
import StatusModalSuccess from "../../modals/StatusModalSuccess";
import StatusModalError from "../../modals/StatusModalError";
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"


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
    handleCancel
}) => {
    const {
        networkTypeSelect,
        networksForSelector,
    } = useContext(CtxWalletNetworks);
    
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    
    const [form] = useForm();
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const setContent = useContext(CtxModalTrxInfo);
    const [stage, setStage] = useState(initStageConfirm);
    const [loading, setLoading] = useState<boolean>(false);
    const [localErrorHunter, ,localErrorInfoBox,] = useError();
    const [isErr, setErr] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)
    const {md} = useBreakpoints()
    const {t} = useTranslation()

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
                        localErrorHunter({message: "Something went wrong.", code: 1})
                        setErr(true)
                    }
                })
                .reject((err) => {
                    if (err.code === 10084) {
                        localErrorHunter({message: "Wallet not found", code: err.code});
                        setErr(true)
                        return;
                    }
                    err.code && setErr(true)
                    localErrorHunter(err);
                })
            setLoading(false);
        })()
    }, [])
    
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
                    if(md){
                        setSuccess(true)
                    }else{
                        handleCancel()
                        setContent(<CtnTrxInfo />)
                        setRefresh()
                    }
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                    setErr(true)
                }
            })
            .reject((err) => {
                localErrorHunter(err);
                form.resetFields();                
                err.code && setErr(true)
            })

        setLoading(false);
    }
    
    return !md ? <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
            <div className="row mb-5">
                <div className="col">
                    <div className="p-4 bg-gray-300">
                        <div className="wrapper flex flex-col">
                            <div className="row mb-1">
                                <div className="col">
                                    <span className="text-red-800">{t("please_note")}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span className="text-gray-400">
                                        {t("use_withdraw_addr_supported")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("network")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{label}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's requisite</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{requisite}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{amount ?? '-'} {$const}</span>
                </div>
            </div>
            {comment && <>
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">{t("comment")}</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span>{comment}</span>
                    </div>
                </div>
            </>}

            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's name</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {stage.recipient ? (
                        <span>{stage.recipient ?? '-'}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            
            <Form form={form} onFinish={(e) => onConfirm()}>
                <div className="row mt-4 mb-5">
                    <div className="col relative">
                        {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                            <Button htmlType={"submit"} disabled={!stage.recipient}
                                    className="w-full"
                                    size={"xl"}>{t("confirm")}</Button>}
                    </div>
                    
                    <div className="col flex justify-center mt-4">
                        {localErrorInfoBox}
                    </div>
                </div>
            </Form>
        </div>
    </div> : <div>
            {loading && <Loader className='justify-center'/>}
            
            <div className={loading ? 'collapse' : ''}>
                <hr className={styles.ModalLine}/>
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
                                            {t("check_your_information_carefully")}
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
                            <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{label}</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("recipient")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>{requisite}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.ModalPayInfo}>
                    <div className={styles.ModalPayInfoCol}>
                        <div className="row">
                            <span className={styles.ModalPayInfoText}>{t("you_will_pay")}:</span>
                        </div>
                        <div className="row">
                        <span className={styles.ModalPayInfoText}>
                            {t("you_will_get")}:
                        </span>
                        </div>
                        <div className="row">
                            <span className={styles.ModalPayInfoTextFee}>
                                {t("fee")}:
                            </span>
                        </div>
                    </div>
                    <div className={styles.ModalPayInfoColValue}>

                        <div className={styles.ModalPayInfoCol}>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexText}>{amount}</span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexText}>
                                        {amount}
                                </span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexTextFee}>
                                        -
                                </span>
                            </div>
                        </div>
                        
                        <div className={styles.ModalPayInfoCol}>
                            <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                {$const}
                            </span>
                            <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                {$const}
                            </span>
                            <span className={styles.ModalPayInfoValueFlexTextFee}>
                                {$const}
                            </span>
                        </div>
                    </div>
                    
                </div>
                {comment && <>
                    <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("comment")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{comment}</span>
                        </div>
                    </div>
                </>}

                <Form form={form} onFinish={(e) => onConfirm()}>

                    <div className="row mt-4">
                        <div className="col relative">
                            {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                                <div className={styles.ButtonContainer + " px-4"}>
                                    <Button htmlType={"submit"}
                                        className={styles.ButtonTwo}
                                        size={"xl"}
                                        greenTransfer
                                    >
                                        Confirm
                                    </Button>

                                    <Button
                                        className={styles.ButtonTwo}
                                        onClick={handleCancel}
                                        size={"xl"}
                                        whiteGreenTransfer
                                    >
                                        {t("cancel")}
                                    </Button>
                                </div>
                            }
                        </div>
                        
                        <div className="col flex justify-center mt-4">
                            {localErrorInfoBox}
                        </div>
                    </div>
                </Form>
            </div>
            <StatusModalSuccess setIsSuccess={setSuccess} open={isSuccess} refresh={setRefresh}/>
            <StatusModalError setIsErr={setErr} open={isErr}/>
        </div>
}

export default UniversalTransferConfirm;
