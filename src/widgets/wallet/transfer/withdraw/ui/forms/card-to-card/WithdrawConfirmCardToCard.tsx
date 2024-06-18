import Decimal from "decimal.js";
import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission} from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { apiGetUas } from "@/shared/(orval)api";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss"
import { maskFullCardNumber } from "@/shared/lib";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";


interface IState {
    loading: boolean;
    totalCommission: IResCommission;
}

const WithdrawConfirmCardToCard = ({
    amount,
    comment,
    cardNumber,
    selectedCard,
    cardholderName,
    handleCancel
}) => {
    const [{
        loading,
        totalCommission,
    }, setState] = useState<IState>({
        loading: false,
        totalCommission: undefined
    });

    const {t} = useTranslation()
    const {md} = useBreakpoints()
    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const [uasToken, setUasToken] = useState<string>(null);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const cards = storeActiveCards(state => state.activeCards);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const [isErr, setErr] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)
    const { setRefresh } = useContext(CtxRootData)

    const details = useRef({
        account: account.account_id,
        beneficiaryName: cardholderName,
        cardNumber: cardNumber,
        fromCardId: selectedCard,
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
            }).then((res)=>{
                if(md){                    
                    //@ts-ignore
                    if(res.data.status === "ok"){
                        setSuccess(true)
                        setRefresh();
                        displayHistory();
                        handleCancel()
                    }else{
                        setErr(true)
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }));
                    }
                }
            }).catch(()=>{
                setErr(true)
            });
        }).catch(()=>{
            setErr(true)
        });
    }

    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();
            
            setUasToken(data.result.token);

            apiPaymentContact(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => setState(prev => ({
                ...prev,
                totalCommission: data as IResCommission
            })));
        })();
    }, []);

    return (
        <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
                <div className="row mb-5">
                    <div className="col">
                        <div className="p-[1rem_1rem_10px_0]">
                            <div className={`wrapper ${styles.ModalInfo}`}>
                                <div className={styles.ModalInfoIcon}>
                                    <div className="col">
                                        <IconApp size={15} code="t27" color="#8F123A" />
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
                    {label && <> <div className="row">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{label}</span>
                        </div>
                    </div> </>}
                    {cards?.filter(c => c.cardStatus === "ACTIVE")[0] && <> <div className="row">
                        <div className="col">
                            <span className={styles.ModalRowsTitle} >{t("from_card")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col text-[#3A5E66] font-semibold ">
                            <span className={styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"}>{formatCardNumber(`${cards?.filter(c => c.cardStatus === "ACTIVE")[0].displayPan}`)}</span>
                        </div>
                    </div> </>}
                    {cardNumber && <> <div className="row">
                        <div className="col">
                            <span className={styles.ModalRowsTitle} >{t("to_card")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col text-[#3A5E66] font-semibold ">
                            <span className={styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"}>{maskFullCardNumber(cardNumber)}</span>
                        </div>
                    </div> </>}
                    {cardholderName && <> <div className="row">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("cardholder")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{cardholderName}</span>
                        </div>
                    </div> </>}
                    {comment && <>
                        <div className="row">
                            <div className="col">
                                <span className={styles.ModalRowsTitle}>{t('description')}</span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col text-[#3A5E66] font-semibold">
                                <span className={styles.ModalRowsValue}>{comment}</span>
                            </div>
                        </div>
                    </>}
                </div>
                <Commissions
                    isLoading={loading}
                    youWillPay={new Decimal(amount).plus(totalCommission?.commission ?? 0).toString()}
                    youWillGet={amount}
                    fee={totalCommission?.commission ?? '-'}
                />
            <Form onSubmit={onConfirm}>
                <div className="row my-5">
                    <div className={styles.ButtonContainer}>
                        <Button 
                                htmlType={"submit"}
                                className={styles.ButtonTwo}
                                disabled={!totalCommission}
                        >{t("confirm")}</Button>
                        <Button
                            skeleton
                            onClick={handleCancel}
                            className={styles.ButtonTwo}
                        >{t("cancel")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    )
}

export default WithdrawConfirmCardToCard;
