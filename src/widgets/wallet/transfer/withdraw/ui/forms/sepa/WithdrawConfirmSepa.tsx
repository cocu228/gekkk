import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {apiPaymentSepa, IResCommission, IResResult} from "@/shared/api";
import {useContext, useEffect, useRef, useState} from "react";
import {transferDescriptions} from "../../../model/transfer-descriptions";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss"
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"
import StatusModalSuccess from "../../modals/StatusModalSuccess";
import StatusModalError from "../../modals/StatusModalError";

interface IState {
    loading: boolean;
    total: IResCommission;
    status: 'error' | 'success' | null;
}

const WithdrawConfirmSepa = ({
    amount,
    comment,
    accountNumber,
    beneficiaryName,
    transferDescription,
    handleCancel
}) => {
    const [{
        total,
        status,
        loading,
    }, setState] = useState<IState>({
        status: null,
        loading: false,
        total: undefined,
    });

    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const { setRefresh } = useContext(CtxRootData)
    const [isErr, setErr] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)
    const {t} = useTranslation()
    const {md} = useBreakpoints()
    
    useEffect(()=>{
        if(status === "error"){
            setErr(true)
        }else if (status === "success"){
        setSuccess(true) 
        }
    },[status])

    const details = useRef({
        purpose: comment,
        iban: accountNumber,
        account: account.account_id,
        beneficiaryName: beneficiaryName,
        transferDetails: transferDescriptions.find(d => d.value === transferDescription)?.label,
        amount: {
            sum: {
                currency: {
                    code: $const
                },
                value: amount
            }
        }
    });

    const onConfirm = async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));

        const {data} = await apiGetUas();
        const {phone} = await getAccountDetails();

        await apiPaymentSepa(details.current, false, {
            Authorization: phone,
            Token: data.result.token
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentSepa(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => (setState(prev => ({
                ...prev,
                status: (data as IResResult).status === 'ok' ? 'success' : 'error'
            }))));
        });
    }
    
    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();
            
            apiPaymentSepa(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => (setState(prev => ({
                ...prev,
                total: data as IResCommission
            }))));
        })();
    }, []);
    
    return !md ? status ? <CtnTrxInfo status={status}/> : <div>
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
                    <span className="text-gray-400">{t("beneficiary_name")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{beneficiaryName}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("account_number")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{accountNumber}</span>
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
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("fee")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.commission ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("total_amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.total ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            {!comment ? null : <>
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

            <Form onFinish={onConfirm}>
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                className="w-full"
                                htmlType={"submit"}
                                disabled={!total}
                        >{t("confirm")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div> : (

<>

<hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66]"/>
<div className="flex justify-center">

    <div className="flex flex-col items-start self-center w-[90%]">
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
            <> <div className="row mb-2">
                <div className="col">
                    <span className={styles.ModalRowsTitle}>Type Transaction</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col text-[#3A5E66] font-semibold">
                    <span className={styles.ModalRowsValue}>{label}</span>
                </div>
            </div> </>
            <div className="row mb-2">
                <div className="col">
                    <span className={styles.ModalRowsTitle} >IBAN</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col text-[#3A5E66] font-semibold ">
                    <span className={styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"}>{accountNumber}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className={styles.ModalRowsTitle}>{t("recipient")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col text-[#3A5E66] font-semibold">
                    <span className={styles.ModalRowsValue}>{beneficiaryName}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className={styles.ModalRowsTitle}>{t("description")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col text-[#3A5E66] font-semibold">
                    <span className={styles.ModalRowsValue}>{t(`${transferDescription}`)}</span>
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
                                {total?.total ? total.total : "-"}
                        </span>
                    </div>
                    <div className={styles.ModalPayInfoValueFlex}>
                        <span
                            className={styles.ModalPayInfoValueFlexTextFee}>
                                {total?.commission ?? '-'}
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
    
        <div className={styles.ButtonContainer}>
            <Button 
                    greenTransfer
                    size={"xl"}
                    className={styles.ButtonTwo}
                    onClick={onConfirm}
                    disabled={!total}
            >{t("confirm")}</Button>
            <Button
                        onClick={()=>{
                            setRefresh()
                            handleCancel()
                        }}
                        whiteGreenTransfer
                        className={styles.ButtonTwo}
                        size={"xl"}
                    >
                        {t("cancel")}
            </Button>
        </div>
        <StatusModalSuccess refresh={setRefresh} setIsSuccess={setSuccess} open={isSuccess}/>
        <StatusModalError setIsErr={setErr} open={isErr}/>
        {/*{is_operable === false && <>*/}
        {/*    <div className="info-box-danger">*/}
        {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
        {/*            network for this transaction.</p>*/}
        {/*    </div>*/}
        {/*</>}*/}
    </div>
</div>
</>
    )
}

export default WithdrawConfirmSepa;
