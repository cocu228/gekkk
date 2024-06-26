import { CtxRootData } from "@/processes/RootContext";
import {
  apiPaymentSepa,
  IPaymentDetails,
  IResCommission,
  IResErrors,
  IResResult
} from "@/shared/api";
import {FC, useContext, useEffect, useState} from "react";
import {CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import {useTranslation} from "react-i18next";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import axios from "axios";
import useError from "@/shared/model/hooks/useError";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Loader from "@/shared/ui/loader";
import Notice from "@/shared/ui/notice";

interface IState {
  loading: boolean;
  total: IResCommission;
}

interface IWithdrawConfirmSepaProps {
  details: PaymentDetails;
  handleCancel: () => void;
}

const WithdrawConfirmSepa: FC<IWithdrawConfirmSepaProps> = ({
  details,
  handleCancel,
}) => {
  const {
    iban,
    purpose,
    beneficiaryName,
    amount: {
      sum: {
        value: amount
      }
    }
  } = details;

  const {t} = useTranslation();
  const {setRefresh} = useContext(CtxRootData);
  const {setContent} = useContext(CtxGlobalModalContext);
  const {displayHistory} = useContext(CtxDisplayHistory);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const {getAccountDetails} = storeAccountDetails((state) => state);
  const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
  const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
  const {uasToken} = useContext(UasConfirmCtx)


  const [{ total, loading }, setState] = useState<IState>({
    loading: true,
    total: undefined,
  });

  const getTransformDetails = (): IPaymentDetails => {
    const { purpose, ...others } = details
    return {
      ...others,
      transferDetails: transferDescriptions.find((d) => d.value === purpose)?.label
    } as IPaymentDetails
  }

  useEffect(() => {
    localErrorClear();
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      const { phone } = await getAccountDetails();

      apiPaymentSepa(
        getTransformDetails(),
        true,
        {
          Authorization: phone,
          Token: uasToken
        },
        cancelTokenSource.token,
      )
        .then(({ data }) => {
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
        })
        .catch((err) => {
          if (err.code === "ERR_CANCELED") {
            return;
          }
          localErrorHunter({
            code: 0,
            message: "Something went wrong...",
          });
        });
    })();

    return () => cancelTokenSource.cancel();
  }, []);

  const onConfirm = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const { phone } = await getAccountDetails();

    await apiPaymentSepa(getTransformDetails(), false, {
      Authorization: phone,
      Token: uasToken,
    }).then(async (response) => {
      // @ts-ignore
      const confToken = response.data.errors[0].properties.confirmationToken;
      const headers = await signHeadersGeneration(phone, confToken);

      await apiPaymentSepa(getTransformDetails(), false, {
        ...headers,
        Authorization: phone,
        Token: uasToken,
      })
        .then(({ data }) => {
          handleCancel();
          setRefresh();
          displayHistory();
          setContent({
            content: (
              <ModalTrxStatusSuccess
                onReceipt={() =>
                  getReceipt((data as IResResult).referenceNumber)
                }
              />
            ),
          });
        })
        .catch(() => {
          handleCancel();
          setContent({ content: <ModalTrxStatusError /> });
        });
    });
  };

  const getReceipt = async (referenceNumber: string) => {
    // setContent({
    //     content: <BankReceipt referenceNumber={referenceNumber} uasToken={uasToken}/>,
    //     title: 'Transaction receipt'
    // });
  };

  const sepaInfo: { label: string, value: string }[] = [
    {
      label: t("type_transaction"),
      value: label
    },
    {
      label: "IBAN",
      value: iban
    },
    {
      label: t("recipient"),
      value: beneficiaryName
    },
    {
      label: t("description"),
      value: purpose
    },
  ]

  return (
    <>
      {loading && <Loader className='justify-center' />}
      <div className={loading ? "collapse" : ""}>
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
            <Commissions
              isLoading={loading}
              youWillPay={total?.total || 0}
              youWillGet={amount}
              fee={total?.commission || 0}
            />
          </div>
        </div>

        {localErrorInfoBox ? <div className="w-full mb-[30px]">{localErrorInfoBox}</div> : null}

        <ConfirmButtons
          isConfirmDisabled={!!localErrorInfoBox || !total || loading}
          onConfirm={onConfirm}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default WithdrawConfirmSepa;
