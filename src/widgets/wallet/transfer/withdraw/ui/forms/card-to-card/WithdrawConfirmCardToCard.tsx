import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import { FC, useContext, useEffect, useState } from "react";
import { apiPaymentContact, IResCommission, IResErrors } from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {apiGetUas} from "@/shared/(orval)api";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {useTranslation} from "react-i18next";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss"
import {maskFullCardNumber} from "@/shared/lib";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";
import { UasConfirmCtx } from "@/processes/errors-provider-context";


interface IState {
    loading: boolean;
    totalCommission: IResCommission;
}

interface IWithdrawConfirmCardToCardProps {
    details: PaymentDetails;
    handleCancel: () => void;
}

const WithdrawConfirmCardToCard: FC<IWithdrawConfirmCardToCardProps> = ({
    details,
    handleCancel
}) => {
    const {
        cardNumber,
        beneficiaryName,
        purpose,
          amount: {
                sum: {
                    value: amount
                }
          }
    } = details

    const [{loading, totalCommission}, setState] = useState<IState>({
        loading: false,
        totalCommission: undefined
    });

    const {t} = useTranslation()
    const {md} = useBreakpoints()
    const { displayHistory } = useContext(CtxDisplayHistory);
    const {uasToken} = useContext(UasConfirmCtx)
    const cards = storeActiveCards(state => state.activeCards);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const [, setErr] = useState<boolean>(false)
    const [, setSuccess] = useState<boolean>(false)
    const { setRefresh } = useContext(CtxRootData)
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

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
        localErrorClear();
        (async () => {
            const {phone} = await getAccountDetails();
            

            apiPaymentContact(details, true, {
                Authorization: phone,
                Token: uasToken
            }).then(({data}) => setState(prev => ({
                ...prev,
                totalCommission: data as IResCommission
            })));
        })();
    }, []);

    return (
        <div>
        {loading && <Loader className='justify-center'/>}

            <div className={loading ? "collapse" : ""}>
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
                            <span className={styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"}>{maskFullCardNumber(details?.cardNumber)}</span>
                        </div>
                    </div> </>}
                    {beneficiaryName && <> <div className="row">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("cardholder")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{beneficiaryName}</span>
                        </div>
                    </div> </>}
                    {purpose && <>
                        <div className="row">
                            <div className="col">
                                <span className={styles.ModalRowsTitle}>{t('description')}</span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col text-[#3A5E66] font-semibold">
                                <span className={styles.ModalRowsValue}>{purpose}</span>
                            </div>
                        </div>
                    </>}
                </div>
                <Commissions
                  isLoading={loading}
                  youWillPay={amount + (totalCommission?.commission ?? 0)}
                  youWillGet={amount}
                  fee={totalCommission?.commission ?? "-"}
                />
                <div className="mt-2">{localErrorInfoBox}</div>
                <Form onSubmit={onConfirm}>
                    <div className="row my-5">
                        <div className={styles.ButtonContainer}>
                            <Button
                              htmlType={"submit"}
                              className={styles.ButtonTwo}
                              disabled={!!localErrorInfoBox || !totalCommission}
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
