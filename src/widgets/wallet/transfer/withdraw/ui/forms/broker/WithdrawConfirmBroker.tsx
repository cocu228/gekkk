import {apiPaymentSepa} from "@/shared/api";
import { FC, useContext, useState } from "react";
import {CtxRootData} from "@/processes/RootContext";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";
import resValidation from "@/widgets/wallet/transfer/helpers/res-validation";

interface IWithdrawConfirmBrokerProps {
    amount: number;
    handleCancel: () => void;
}

const WithdrawConfirmBroker: FC<IWithdrawConfirmBrokerProps> = ({ amount, handleCancel }) => {
    // Hooks
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Context
    const {setContent} = useContext(CtxGlobalModalContext);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const { uasToken } = useContext(UasConfirmCtx)
    const {account} = useContext(CtxRootData);
    const {setRefresh} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
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

    const onConfirm = async () => {
        setIsLoading(true)
        const details = {
            purpose: t("purchase_of", {token: "EURG"}),
            iban: token_hot_address,
            account: account.account_id,
            beneficiaryName: account.name,
            amount: {
                sum: {
                    currency: { code: $const },
                    value: amount
                }
            }
        }
        const {phone} = await getAccountDetails();
        const headers = { Authorization: phone, Token: uasToken };
        try {
            const response = await apiPaymentSepa(details, false, headers)
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            const inSideHeaders = await signHeadersGeneration(phone, uasToken, confToken);
            const res = await apiPaymentSepa(details, false, { ...headers, ...inSideHeaders })
            if (resValidation(res)) {
                setRefresh();
                displayHistory();
                setContent({ content: <ModalTrxStatusSuccess/> });
            } else {
                setContent({ content: <ModalTrxStatusError /> });
            }
        } catch (_) {
            setContent({ content: <ModalTrxStatusError /> });
        }
        handleCancel();
        setIsLoading(false)
    }

    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    return (
      <ConfirmLoading isLoading={isLoading}>
          <Notice text={t("check_your_information_carefully")} />

          <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
              <div className="flex flex-col gap-[10px]">
                <div>
                    <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{t("type_transaction")}</p>
                    <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{label}</p>
                </div>
              </div>
              <div className="w-full">
                  <Commissions
                    youWillPay={amount + withdraw_fee}
                    youWillGet={amount}
                    fee={withdraw_fee}
                    youWillGetCoin={"EURG"}
                  />
              </div>
          </div>

          <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />
      </ConfirmLoading>
    )
}

export default WithdrawConfirmBroker;
