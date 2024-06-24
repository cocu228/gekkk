import Loader from "@/shared/ui/loader";
import {useTranslation} from "react-i18next";
import {CtxRootData} from "@/processes/RootContext";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {FC, useContext, useEffect, useState} from "react";
import {apiPaymentContact, IResCommission, IResErrors, IResResult} from "@/shared/api";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import ConfirmNotice from "@/widgets/wallet/transfer/components/confirm-notice";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";

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
    const { displayHistory } = useContext(CtxDisplayHistory);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    const {uasToken} = useContext(UasConfirmCtx)

    useEffect(() => {
        localErrorClear();
        (async () => {
            const {phone} = await getAccountDetails();
            
            apiPaymentContact(details, true, {
                Authorization: phone,
                Token: uasToken
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

    const phoneNumberInfo: { label: string, value: string }[] = [
        { label: t("network"), value: label },
        { label: t("recepient_phone_number"), value: phoneNumber },
        ...(purpose ? [{ label: t("comment"), value: purpose }] : [])
    ]
    
    return (
      <>
          {loading && <Loader className='justify-center' />}
          <div className={loading ? "collapse" : ""}>
              <ConfirmNotice text={t("check_your_information_carefully")} />

              <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
                  <div className="flex flex-col gap-[10px]">
                      {phoneNumberInfo.map(({ label, value }) => (
                        <div key={value}>
                            <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
                            <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
                        </div>
                      ))}
                  </div>
                  <div className="w-full">
                      <Commissions
                        isLoading={loading}
                        youWillPay={totalCommission?.total || 0}
                        youWillGet={amount}
                        fee={totalCommission?.commission || 0}
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

export default WithdrawConfirmPhoneNumber;
