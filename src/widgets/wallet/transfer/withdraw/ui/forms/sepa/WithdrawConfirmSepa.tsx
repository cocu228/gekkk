import Button from "@/shared/ui/button/Button";
import { CtxRootData } from "@/processes/RootContext";
import {
  apiPaymentSepa,
  IPaymentDetails,
  IResCommission,
  IResErrors,
  IResResult
} from "@/shared/api";
import { FC, useContext, useEffect, useState } from "react";
import { CtxWalletNetworks, } from "@/widgets/wallet/transfer/model/context";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import axios from "axios";
import useError from "@/shared/model/hooks/useError";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { PaymentDetails } from "@/shared/(orval)api/gek/model";
import { transferDescriptions } from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";
import { UasConfirmCtx } from "@/processes/errors-provider-context";

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

  const { t } = useTranslation();
  const { setRefresh } = useContext(CtxRootData);
  const { setContent } = useContext(CtxGlobalModalContext);
  const { displayHistory } = useContext(CtxDisplayHistory);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const { getAccountDetails } = storeAccountDetails((state) => state);
  const { networkTypeSelect, networksForSelector } = useContext(CtxWalletNetworks);
  const { label } = networksForSelector.find(it => it.value === networkTypeSelect);
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

      apiPaymentSepa(getTransformDetails(), true, {
        Authorization: phone,
        Token: uasToken
      }, cancelTokenSource.token)
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

  return (
    <>
      <div className="row mb-5 md:mb-0">
        <div className="col">
          <div className={`wrapper ${styles.ModalInfo}`}>
            <div className={styles.ModalInfoIcon}>
              <div className="col">
                <IconApp color="#8F123A" size={15} code="t27" />
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

      <div className={`${styles.ModalRows} p-[0_20px] mt-[15px]`}>
        <div className="row mb-1">
          <div className="col">
            <span className={styles.ModalRowsTitle}>
              {t("type_transaction")}
            </span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col text-[#3A5E66] font-semibold">
            <span className={styles.ModalRowsValue}>{label}</span>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col">
            <span className={styles.ModalRowsTitle}>IBAN</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col text-[#3A5E66] font-semibold ">
            <span
              className={
                styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"
              }
            >
              {iban}
            </span>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col">
            <span className={styles.ModalRowsTitle}>{t("recipient")}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col text-[#3A5E66] font-semibold">
            <span className={styles.ModalRowsValue}>{beneficiaryName}</span>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col">
            <span className={styles.ModalRowsTitle}>{t("description")}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col text-[#3A5E66] font-semibold">
            <span className={styles.ModalRowsValue}>{purpose}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Commissions
          isLoading={loading}
          youWillPay={total?.total || 0}
          youWillGet={amount}
          fee={total?.commission || 0}
        />
      </div>

      <div className="mt-2">{localErrorInfoBox}</div>

      <div className="row mt-4">
        <div className="col relative">
          <div className={styles.ButtonContainer + " px-4"}>
            <Button
              size="lg"
              onClick={onConfirm}
              className={styles.ButtonTwo}
              disabled={!!localErrorInfoBox || !total || loading}
            >
              {t("confirm")}
            </Button>

            <Button
              skeleton
              size="lg"
              className={styles.ButtonTwo}
              onClick={() => {
                handleCancel();
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawConfirmSepa;
