import Decimal from "decimal.js";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import {apiPaymentSepa} from "@/shared/api";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxRootData} from "@/processes/RootContext";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss"
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"
import StatusModalSuccess from "../../modals/StatusModalSuccess";
import StatusModalError from "../../modals/StatusModalError";
import useError from "@/shared/model/hooks/useError";
import { isNull } from "@/shared/lib";
import { useForm } from "antd/es/form/Form";


const WithdrawConfirmBroker = ({amount, handleCancel}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {t} = useTranslation()
    const {md} = useBreakpoints()
    const [isErr, setErr] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)
    const {setRefresh} = useContext(CtxRootData)



    const {
        networkTypeSelect,
        networksForSelector,
        tokenNetworks
    } = useContext(CtxWalletNetworks);

    const {
        token_hot_address,
        withdraw_fee
    } = getChosenNetwork(
        tokenNetworks,
        networkTypeSelect
    ) ?? {}

    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        purpose: t("purchase_of", {token: "EURG"}),
        iban: token_hot_address,
        account: account.account_id,
        beneficiaryName: account.name,
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
        setLoading(true);
        
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
            }).then((response)=>{
                if(md){                    
                    //@ts-ignore
                    if(response.data.status === "ok"){
                        setSuccess(true)
                    }else{
                        setErr(true)
                    }
                }
                handleCancel();
            })

            

        })
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
                    <span className="text-gray-400">{t("beneficiary_name")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{account.name}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("account_number")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{account.number}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("purpose")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{t("purchase_of", {token: "EURG"})} {t("for_token", {token: "EUR"})}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{amount} {$const}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("fee")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {new Decimal(withdraw_fee).toString()} EUR
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("you_will_get")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {new Decimal(amount).minus(withdraw_fee).toString()} EURG
                </div>
            </div>
            
            <Form onFinish={onConfirm}>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <Button size={"xl"}
                                className="w-full"
                                htmlType={"submit"}
                        >{t("confirm")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div> : <>
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
                                        Please, check your transaction information carefully and confirm the operation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ModalRows}>
                <div className="row">
                    <div className="col">
                        <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span className={styles.ModalRowsValue}>{label}</span>
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
                                    {new Decimal(amount).minus(withdraw_fee).toString()}
                            </span>
                        </div>
                        <div className={styles.ModalPayInfoValueFlex}>
                            <span
                                className={styles.ModalPayInfoValueFlexTextFee}>
                                    {new Decimal(withdraw_fee).toString()}
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles.ModalPayInfoCol}>
                        <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                            {$const}
                        </span>
                        <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                            EURG
                        </span>
                        <span className={styles.ModalPayInfoValueFlexTextFee}>
                            EUR
                        </span>
                    </div>
                </div>
                
            </div>
            <Form onFinish={onConfirm}>
                <div className="row mt-4 mb-4">
                    <div className={styles.ButtonContainer}>
                        <Button greenTransfer
                                size={"xl"}
                                className={styles.ButtonTwo}
                                htmlType={"submit"}
                        >{t("confirm")}</Button>
                        <Button whiteGreenTransfer
                                size={"xl"}
                                className={styles.ButtonTwo}
                                onClick={handleCancel}
                        >{t("cancel")}</Button>
                    </div>
                </div>
            </Form>
            <StatusModalSuccess refresh={setRefresh} setIsSuccess={setSuccess} open={isSuccess}/>
            <StatusModalError setIsErr={setErr} open={isErr}/>
            {/*{is_operable === false && <>*/}
            {/*    <div className="info-box-danger">*/}
            {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
            {/*            network for this transaction.</p>*/}
            {/*    </div>*/}
            {/*</>}*/}
        </>
}

export default WithdrawConfirmBroker;
