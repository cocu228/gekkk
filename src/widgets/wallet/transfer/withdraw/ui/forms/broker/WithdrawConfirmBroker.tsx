import {apiPaymentSepa} from "@/shared/api";
import {useContext, useRef, useState} from "react";
import {CtxRootData} from "@/processes/RootContext";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import ConfirmNotice from "@/widgets/wallet/transfer/components/confirm-notice";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";

const WithdrawConfirmBroker = ({amount, handleCancel}) => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const {setContent} = useContext(CtxGlobalModalContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const { uasToken } = useContext(UasConfirmCtx)

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
    const {setRefresh} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    console.log('uas', uasToken)

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
    
        const {phone} = await getAccountDetails();
        
        await apiPaymentSepa(details.current, false, {
            Authorization: phone,
            Token: uasToken
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentSepa(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: uasToken
            }).then((response)=>{
                if(md){                    
                    //@ts-ignore
                    if(response.data.status === "ok"){
                        handleCancel();
                        setRefresh();
                        displayHistory();
                        setContent({content: <ModalTrxStatusSuccess/>});
                    }
                }
                handleCancel();
            })
        })
    }

    return (
      <>
          <ConfirmNotice text={t("check_your_information_carefully")} />

          <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
              <div className="flex flex-col gap-[10px]">
                <div>
                    <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{t("type_transaction")}</p>
                    <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{label}</p>
                </div>
              </div>
              <div className="w-full">
                  <Commissions
                    isLoading={loading}
                    youWillPay={amount + withdraw_fee}
                    youWillGet={amount}
                    fee={withdraw_fee}
                    youWillGetCoin={"EURG"}
                  />
              </div>
          </div>

          <ConfirmButtons
            onConfirm={onConfirm}
            onCancel={handleCancel}
          />
      </>
    )
}

export default WithdrawConfirmBroker;
