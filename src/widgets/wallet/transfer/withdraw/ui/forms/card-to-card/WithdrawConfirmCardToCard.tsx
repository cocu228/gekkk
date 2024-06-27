import {CtxRootData} from "@/processes/RootContext";
import { FC, useContext, useState } from "react";
import {apiPaymentContact} from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {useTranslation} from "react-i18next";
import {maskFullCardNumber} from "@/shared/lib";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions, { ICommissionsProps } from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";
import resValidation from "@/widgets/wallet/transfer/helpers/res-validation";
import ModalTrxStatusSuccess from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusSuccess";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";

interface IWithdrawConfirmCardToCardProps extends ICommissionsProps {
    details: PaymentDetails;
    handleCancel: () => void;
}

const WithdrawConfirmCardToCard: FC<IWithdrawConfirmCardToCardProps> = ({
    details,
    handleCancel,
    ...commissionsProps
}) => {
    // Hooks
    const {t} = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Context
    const {setContent} = useContext(CtxGlobalModalContext);
    const {setRefresh} = useContext(CtxRootData)
    const {displayHistory} = useContext(CtxDisplayHistory);
    const {uasToken} = useContext(UasConfirmCtx)
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);

    // Store
    const {getAccountDetails} = storeAccountDetails(state => state);
    const cards = storeActiveCards(state => state.activeCards);

    // Handles
    const onConfirm = async () => {
        setIsLoading(true);
        const {phone} = await getAccountDetails();
        try {
            const headers = { Authorization: phone, Token: uasToken }
            const response = await apiPaymentContact(details, false, headers)
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            const inSideHeaders = await signHeadersGeneration(phone, confToken);
            const res = await apiPaymentContact(details, false, { ...inSideHeaders, ...headers });
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
        handleCancel()
        setIsLoading(false)
    }

    // Helpers
    const activeCard = cards?.filter(c => c.cardStatus === "ACTIVE")[0]
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    const { cardNumber, beneficiaryName, purpose, } = details
    const cardToCardInfo: { label: string, value: string }[] = [
        { label: t("type_transaction"), value: label },
        ...(!!activeCard ? [{ label: t("from_card"), value: formatCardNumber(activeCard.displayPan) }] : []),
        ...(cardNumber ? [{ label: t("to_card"), value: maskFullCardNumber(cardNumber) }] : []),
        ...(beneficiaryName ? [{ label: t("cardholder"), value: beneficiaryName }] : []),
        ...(purpose ? [{ label: t("description"), value: purpose }] : [])
    ]

    return (
      <ConfirmLoading isLoading={isLoading}>
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
                  <Commissions {...commissionsProps} />
              </div>
          </div>1

          <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />
      </ConfirmLoading>
    )
}

export default WithdrawConfirmCardToCard;
