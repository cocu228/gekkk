import {CtxRootData} from "@/processes/RootContext";
import {apiPaymentSepa, IPaymentDetails} from "@/shared/api";
import { FC, useContext, useState } from "react";
import {CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {useTranslation} from "react-i18next";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions, { ICommissionsProps } from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";

interface IWithdrawConfirmSepaProps extends ICommissionsProps {
  details: PaymentDetails;
  handleCancel: () => void;
}

const WithdrawConfirmSepa: FC<IWithdrawConfirmSepaProps> = ({
  details,
  handleCancel,
  ...commissionsProps
}) => {
  // Hooks
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Context
  const {setRefresh} = useContext(CtxRootData);
  const {setContent} = useContext(CtxGlobalModalContext);
  const {displayHistory} = useContext(CtxDisplayHistory);
  const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
  const {uasToken} = useContext(UasConfirmCtx)

  // Store
  const {getAccountDetails} = storeAccountDetails((state) => state);

  // Handles
  const getTransformDetails = (): IPaymentDetails => {
    const { purpose, ...others } = details
    return {
      ...others,
      transferDetails: transferDescriptions.find((d) => d.value === purpose)?.label
    } as IPaymentDetails
  }

  const onConfirm = async () => {
    setIsLoading(true)
    const { phone } = await getAccountDetails();
    const headers = { Authorization: phone, Token: uasToken };
    try {
      const response = await apiPaymentSepa(getTransformDetails(), false, headers);
      // @ts-ignore
      const confToken = response.data.errors[0].properties.confirmationToken;
      const inSideHeaders = await signHeadersGeneration(phone, confToken);
      const transformedDetails = getTransformDetails();
      const res = await apiPaymentSepa(transformedDetails, false, { ...headers, ...inSideHeaders })
      console.log({ res });
      if (res.data) {
        setRefresh();
        displayHistory();
        setContent({ content: <ModalTrxStatusSuccess /> });
      }
    } catch (_) {
      setContent({ content: <ModalTrxStatusError /> });
    }
    handleCancel();
    setIsLoading(false)
  };

  // Helpers
  const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
  const { iban, purpose, beneficiaryName, } = details;
  const sepaInfo: { label: string, value: string }[] = [
    { label: t("type_transaction"), value: label },
    { label: "IBAN", value: iban },
    { label: t("recipient"), value: beneficiaryName },
    { label: t("description"), value: purpose },
  ]

  return (
    <ConfirmLoading isLoading={isLoading}>
      <Notice text={t("check_your_information_carefully")} />

      <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
        <div className="flex flex-col gap-[10px]">
          {sepaInfo.map(({ label, value }) => (
            <div key={value}>
              <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
              <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
            </div>
          ))}
        </div>
        <div className="w-full">
          <Commissions {...commissionsProps} />
        </div>
      </div>

      <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />
    </ConfirmLoading>
  );
};

export default WithdrawConfirmSepa;
