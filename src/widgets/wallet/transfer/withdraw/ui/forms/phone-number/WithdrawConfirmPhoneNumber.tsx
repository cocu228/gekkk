import { useTranslation } from "react-i18next";
import { FC, useContext, useState } from "react";

import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import { CtxRootData } from "@/processes/RootContext";
import { apiPaymentContact } from "@/shared/api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions, { ICommissionsProps } from "@/widgets/wallet/transfer/components/commissions";
import { PaymentDetails } from "@/shared/(orval)api/gek/model";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";
import resValidation from "@/widgets/wallet/transfer/helpers/res-validation";

import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";

interface IWithdrawConfirmPhoneNumberProps extends ICommissionsProps {
  details: PaymentDetails;
  handleCancel: () => void;
}

const WithdrawConfirmPhoneNumber: FC<IWithdrawConfirmPhoneNumberProps> = ({
  details,
  handleCancel,
  ...commissionsProps
}) => {
  // Hooks
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Context
  const { setRefresh } = useContext(CtxRootData);
  const { setContent } = useContext(CtxGlobalModalContext);
  const { displayHistory } = useContext(CtxDisplayHistory);
  const { networkTypeSelect, networksForSelector } = useContext(CtxWalletNetworks);
  const { uasToken } = useContext(UasConfirmCtx);

  // Store
  const { getAccountDetails } = storeAccountDetails(state => state);

  // Handles
  const onConfirm = async () => {
    setIsLoading(true);
    const { phone } = await getAccountDetails();
    try {
      const headers = { Authorization: phone, Token: uasToken };
      const response = await apiPaymentContact(details, false, headers);
      // @ts-ignore
      const confToken = response.data.errors[0].properties.confirmationToken;
      const inSideHeaders = await signHeadersGeneration(phone, uasToken, confToken);

      const res = await apiPaymentContact(details, false, { ...headers, ...inSideHeaders });
      if (resValidation(res)) {
        setRefresh();
        displayHistory();
        setContent({ content: <ModalTrxStatusSuccess /> });
      } else {
        setContent({ content: <ModalTrxStatusError /> });
      }
    } catch (_) {
      setContent({ content: <ModalTrxStatusError /> });
    }
    handleCancel();
    setIsLoading(false);
  };

  // Helpers
  const { label } = networksForSelector.find(it => it.value === networkTypeSelect);
  const { phoneNumber, purpose } = details;
  const phoneNumberInfo: { label: string; value: string }[] = [
    { label: t("network"), value: label },
    { label: t("recepient_phone_number"), value: phoneNumber },
    ...(purpose ? [{ label: t("comment"), value: purpose }] : [])
  ];

  return (
    <ConfirmLoading isLoading={isLoading}>
      <Notice text={t("check_your_information_carefully")} />

      <div className='flex flex-col px-[10px] gap-[25px] mb-[30px]'>
        <div className='flex flex-col gap-[10px]'>
          {phoneNumberInfo.map(({ label, value }) => (
            <div key={value} className='flex flex-col gap-[1.5px]'>
              <p className='text-[#9D9D9D] md:text-fs12 text-fs14'>{label}</p>
              <p className='font-semibold text-[#3A5E66] md:text-fs12 text-fs14 break-words'>{value}</p>
            </div>
          ))}
        </div>
        <div className='w-full'>
          <Commissions {...commissionsProps} />
        </div>
      </div>

      <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />
    </ConfirmLoading>
  );
};

export default WithdrawConfirmPhoneNumber;
