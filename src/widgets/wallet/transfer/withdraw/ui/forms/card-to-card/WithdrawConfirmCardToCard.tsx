import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import {FC, useContext, useEffect, useState} from "react";
import {apiPaymentContact, IResCommission, IResErrors} from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {useTranslation} from "react-i18next";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import {maskFullCardNumber} from "@/shared/lib";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";


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
            }).then(({data}) => {
                if ((data as IResErrors).errors) {
                    localErrorHunter({
                        code: 0,
                        message: "Something went wrong...",
                    });
                }

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    total: data as IResCommission,
                }));
            });
        })();
    }, []);

    const activeCard = cards?.filter(c => c.cardStatus === "ACTIVE")[0]

    const cardToCardInfo: { label: string, value: string }[] = [
        { label: t("type_transaction"), value: label },
        ...(!!activeCard ? [{ label: t("from_card"), value: formatCardNumber(activeCard.displayPan) }] : []),
        ...(cardNumber ? [{ label: t("to_card"), value: maskFullCardNumber(cardNumber) }] : []),
        ...(beneficiaryName ? [{ label: t("cardholder"), value: beneficiaryName }] : []),
        ...(purpose ? [{ label: t("description"), value: purpose }] : [])
    ]

    return (
      <>
          {loading && <Loader className='justify-center' />}
          <div className={loading ? "collapse" : ""}>
              <Notice text={t("check_your_information_carefully")} />

              <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
                  <div className="flex flex-col gap-[10px]">
                      {cardToCardInfo.map(({ label, value }) => (
                        <div key={value}>
                            <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
                            <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
                        </div>
                      ))}
                  </div>
                  <div className="w-full">
                      <Commissions
                        isLoading={loading}
                        youWillPay={amount + (totalCommission?.commission ?? 0)}
                        youWillGet={amount}
                        fee={totalCommission?.commission ?? "-"}
                      />
                  </div>
              </div>

              {localErrorInfoBox ? <div className="w-full mb-[30px]">{localErrorInfoBox}</div> : null}

              <ConfirmButtons
                isConfirmDisabled={!!localErrorInfoBox || !totalCommission || loading}
                onConfirm={onConfirm}
                onCancel={handleCancel}
              />
          </div>
      </>
    )
}

export default WithdrawConfirmCardToCard;
