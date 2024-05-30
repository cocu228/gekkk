import Loader from "@/shared/ui/loader";
import styles from "../styles.module.scss";
import {formatAsNumber} from "@/shared/lib";
import {useTranslation} from "react-i18next";
import {apiGetUas} from "@/shared/(orval)api";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission, IResResult} from "@/shared/api";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import BankReceipt from "@/widgets/wallet/transfer/components/receipt/bank";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";

interface IParams {
    amount: number;
    comment: string;
    phoneNumber: string;
    handleCancel: () => void;
}

interface IState {
    loading: boolean;
    totalCommission: IResCommission;
}

const WithdrawConfirmPhoneNumber = ({
    amount,
    comment,
    phoneNumber,
    handleCancel
}: IParams) => {
    const [{
        loading,
        totalCommission
    }, setState] = useState<IState>({
        loading: true,
        totalCommission: undefined
    });
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const {setContent} = useContext(CtxGlobalModalContext);
    const [uasToken, setUasToken] = useState<string>(null);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        account: account.account_id,
        beneficiaryName: null,
        cardNumber: null,
        phoneNumber: formatAsNumber(phoneNumber),
        purpose: comment,
        amount: {
            sum: {
                value: amount,
                currency: {
                    code: $const
                }
            }
        }
    });

    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();

            setUasToken(data.result.token);
            
            apiPaymentContact(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            })
            .then(({data}) => setState(prev => ({
                ...prev,
                loading: false,
                totalCommission: data as IResCommission
            })))
            .catch(() => {
                handleCancel();
                setContent({content: <ModalTrxStatusError/>});
            });
        })();
    }, []);

    const onConfirm = async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        const {phone} = await getAccountDetails();
        
        await apiPaymentContact(details.current, false, {
            Authorization: phone,
            Token: uasToken
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentContact(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: uasToken
            }).then(({data}) => {
                handleCancel();
                setRefresh();
                displayHistory();
                setContent({
                    content: (
                      <ModalTrxStatusSuccess
                        onReceipt={() => getReceipt((data as IResResult).referenceNumber)}
                      />
                    )
                });
            });
        });
    }

    const getReceipt = async (referenceNumber: string) => {
        setContent({
            content: <BankReceipt referenceNumber={referenceNumber} uasToken={uasToken}/>,
            title: 'Transaction receipt'
        });
    };
    
    return (
        <div className="-md:px-4">
            {loading && <Loader className='justify-center'/>}

            <div className={loading ? 'collapse' : ''}>
                <div className="row mb-5 md:mb-0">
                    <div className="col">
                        <div className="p-4">
                            <div className={`wrapper ${styles.ModalInfo}`}>
                                <div className={styles.ModalInfoIcon}>
                                    <div className="col">
                                        <IconApp color="#8F123A" size={22} code="t27" />
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
                            <span className={styles.ModalRowsTitle}>
                                {t("network")}
                            </span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>
                                {label}
                            </span>
                        </div>
                    </div>
                    <div className="row mb-2 md:mb-1">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>
                                {t("recepient_phone_number")}
                            </span>
                        </div>
                    </div>
                    <div className="row mb-4 md:mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsValue}>
                                {phoneNumber}
                            </span>
                        </div>
                    </div>
                    {!comment ? null : <>
                        <div className="row mb-2 md:mb-1">
                            <div className="col">
                                <span className={styles.ModalRowsTitle}>
                                    {t("comment")}
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4 md:mb-2">
                            <div className="col">
                                <span className={styles.ModalRowsValue}>
                                    {comment}
                                </span>
                            </div>
                        </div>
                    </>}
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
                                <span className={styles.ModalPayInfoValueFlexText}>
                                    {totalCommission?.total ?? '-'}
                                </span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span className={styles.ModalPayInfoValueFlexText}>
                                    {amount}
                                </span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span className={styles.ModalPayInfoValueFlexTextFee}>
                                    {totalCommission?.commission ?? '-'}
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

                <div className="row mt-4">
                    <div className="col relative">
                        <div className={styles.ButtonContainer + " px-4"}>
                            <Button
                                onClick={onConfirm}
                                disabled={!totalCommission}
                                className={styles.ButtonTwo}
                            >{t("confirm")}</Button>

                            <Button
                                skeleton
                                className={styles.ButtonTwo}
                                onClick={()=>{
                                    handleCancel();
                                }}
                            >{t("cancel")}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawConfirmPhoneNumber;
