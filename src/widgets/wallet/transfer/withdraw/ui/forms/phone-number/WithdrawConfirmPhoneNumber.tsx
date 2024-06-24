import Loader from "@/shared/ui/loader";
import styles from "../styles.module.scss";
import {useTranslation} from "react-i18next";
import {apiGetUas} from "@/shared/(orval)api";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {FC, useContext, useEffect, useState} from "react";
import { apiPaymentContact, IResCommission, IResErrors, IResResult } from "@/shared/api";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";

interface IState {
    loading: boolean;
    totalCommission: IResCommission;
}

interface IWithdrawConfirmPhoneNumberProps {
    details: PaymentDetails;
    handleCancel: () => void;
}

const WithdrawConfirmPhoneNumber: FC<IWithdrawConfirmPhoneNumberProps> = ({
    details,
    handleCancel
}) => {
    const {
        phoneNumber,
        purpose,
        amount: {
            sum: {
                value: amount
            }
        }
    } = details

    const [{
        loading,
        totalCommission
    }, setState] = useState<IState>({
        loading: true,
        totalCommission: undefined
    });
    const {t} = useTranslation();
    const {setRefresh} = useContext(CtxRootData);
    const {setContent} = useContext(CtxGlobalModalContext);
    const [uasToken, setUasToken] = useState<string>(null);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

    useEffect(() => {
        localErrorClear();
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();

            setUasToken(data.result.token);
            
            apiPaymentContact(details, true, {
                Authorization: phone,
                Token: data.result.token
            })
            .then(({data}) => {
                if ((data as IResErrors).errors) {
                    localErrorHunter({
                        code: 0,
                        message: "Something went wrong...",
                    });
                }
                setState(prev => ({
                    ...prev,
                    loading: false,
                    totalCommission: data as IResCommission
                }));
            })
            .catch(() => {
                localErrorHunter({
                    code: 0,
                    message: "Something went wrong...",
                });
            });
        })();
    }, []);

    const onConfirm = async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        const {phone} = await getAccountDetails();
        
        await apiPaymentContact(details, false, {
            Authorization: phone,
            Token: uasToken
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentContact(details, false, {
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
            }).catch(() => {
                handleCancel();
                setContent({ content: <ModalTrxStatusError /> });
            });;
        });
    }

    const getReceipt = async (referenceNumber: string) => {
        // setContent({
        //     content: <BankReceipt referenceNumber={referenceNumber} uasToken={uasToken}/>,
        //     title: 'Transaction receipt'
        // });
    };
    
    return (
        <div className="-md:px-4">
            {loading && <Loader className='justify-center'/>}

            <div className={loading ? "collapse" : ""}>
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
                    {!purpose ? null : <>
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
                                    {purpose}
                                </span>
                            </div>
                        </div>
                    </>}
                </div>
                <Commissions
                  isLoading={loading}
                  youWillPay={totalCommission?.total || 0}
                  youWillGet={amount}
                  fee={totalCommission?.commission || 0}
                />
                <div className="mt-2">{localErrorInfoBox}</div>
                <div className="row mt-4">
                    <div className="col relative">
                        <div className={styles.ButtonContainer + " px-4"}>
                            <Button
                              onClick={onConfirm}
                              disabled={!!localErrorInfoBox || !totalCommission}
                              className={styles.ButtonTwo}
                            >{t("confirm")}</Button>

                            <Button
                              skeleton
                              className={styles.ButtonTwo}
                              onClick={() => {
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
