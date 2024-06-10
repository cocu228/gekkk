import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import { CtxRootData } from "@/processes/RootContext";
import { apiPaymentSepa, IResCommission, IResErrors, IResResult } from "@/shared/api";
import { useContext, useEffect, useRef, useState } from "react";
import { transferDescriptions } from "../../../model/transfer-descriptions";
import {
  CtxWalletData,
  CtxWalletNetworks,
} from "@/widgets/wallet/transfer/model/context";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import BankReceipt from "@/widgets/receipt/bank";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import axios from "axios";
import useError from "@/shared/model/hooks/useError";

interface IState {
  loading: boolean;
  total: IResCommission;
}

const WithdrawConfirmSepa = ({
  amount,
  comment,
  accountNumber,
  beneficiaryName,
  transferDescription,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { $const } = useContext(CtxWalletData);
  const {setRefresh} = useContext(CtxRootData);
  const [uasToken, setUasToken] = useState<string>(null);
  const { setContent } = useContext(CtxGlobalModalContext);
  const { displayHistory } = useContext(CtxDisplayHistory);
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const { getAccountDetails } = storeAccountDetails((state) => state);
  const { networkTypeSelect, networksForSelector } = useContext(CtxWalletNetworks);
  const { label } = networksForSelector.find(it => it.value === networkTypeSelect);

  const [{ total, loading }, setState] = useState<IState>({
    loading: true,
    total: undefined,
  });

  const details = useRef({
    purpose: comment,
    iban: accountNumber,
    account: account.account_id,
    beneficiaryName: beneficiaryName,
    transferDetails: transferDescriptions.find(
      (d) => d.value === transferDescription
    )?.label,
    amount: {
      sum: {
        currency: {
          code: $const,
        },
        value: amount,
      },
    },
  });

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      const { data } = await apiGetUas(null, {
        cancelToken: cancelTokenSource.token
      });
      const { phone } = await getAccountDetails();

      setUasToken(data.result.token);

      apiPaymentSepa(details.current, true, {
        Authorization: phone,
        Token: data.result.token
      }, cancelTokenSource.token)
        .then(({ data }) => {
          if ((data as IResErrors).errors) {
            localErrorHunter({
              code: 0,
              message: "Something went wrong..."
            });
          }

          setState((prev) => ({
            ...prev,
            loading: false,
            total: data as IResCommission,
          }))
        })
        .catch((err) => {
          if (err.code === "ERR_CANCELED") {
            return;
          }
          handleCancel();
          setContent({ content: <ModalTrxStatusError /> });
        });
    })();

    return () => cancelTokenSource.cancel();
  }, []);

  const onConfirm = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const {phone} = await getAccountDetails();

    await apiPaymentSepa(details.current, false, {
      Authorization: phone,
      Token: uasToken,
    }).then(async (response) => {
      // @ts-ignore
      const confToken = response.data.errors[0].properties.confirmationToken;
      const headers = await signHeadersGeneration(phone, confToken);

      await apiPaymentSepa(details.current, false, {
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
                onReceipt={() => getReceipt((data as IResResult).referenceNumber)}
              />
            )
          });
        })
        .catch(() => {
          handleCancel();
          setContent({ content: <ModalTrxStatusError /> });
        });
    });
  };

  const getReceipt = async (referenceNumber: string) => {
    setContent({
        content: <BankReceipt referenceNumber={referenceNumber} uasToken={uasToken}/>,
        title: 'Transaction receipt'
    });
  };

  return <>
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
                styles.ModalRowsValue +
                " break-keep text-nowrap text-ellipsis"
              }
            >
              {accountNumber}
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
            <span className={styles.ModalRowsValue}>
              {transferDescription}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className={`${styles.ModalPayInfo} w-full max-w-[230px]`}>
          <div className={`${styles.ModalPayInfoCol}`}>
            <div className="row">
              <span className={styles.ModalPayInfoText}>
                {t("you_will_pay")}:
              </span>
            </div>
            <div className="row">
              <span className={styles.ModalPayInfoText}>
                {t("you_will_get")}:
              </span>
            </div>
            <div className="row">
              <span className={styles.ModalPayInfoTextFee}>{t("fee")}:</span>
            </div>
          </div>
          <div className={styles.ModalPayInfoColValue}>
            <div className={styles.ModalPayInfoCol}>
              <div className={styles.ModalPayInfoValueFlex}>
                <span className={styles.ModalPayInfoValueFlexText}>
                  {/* Total amount, that user pays */}
                  {total?.total ?? `${t("loading")}`}
                </span>
              </div>
              <div className={styles.ModalPayInfoValueFlex}>
                <span className={`${styles.ModalPayInfoValueFlexText}`}>
                  {/* Amount, that recipient recieve */}
                  {amount}
                </span>
              </div>
              <div className={styles.ModalPayInfoValueFlex}>
                <span className={styles.ModalPayInfoValueFlexTextFee}>
                  {/* Fee amount */}
                  {total?.commission ?? `${t("loading")}`}
                </span>
              </div>
            </div>

            <div className={styles.ModalPayInfoCol}>
              <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                {$const}
              </span>
              <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                {$const}
              </span>
              <span className={styles.ModalPayInfoValueFlexTextFee}>
                {$const}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">{localErrorInfoBox}</div>

      <div className="row mt-4">
        <div className="col relative">
          <div className={styles.ButtonContainer + " px-4"}>
            <Button
              size="lg"
              onClick={onConfirm}
              className={styles.ButtonTwo}
              disabled={!total || loading}
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
};

export default WithdrawConfirmSepa;
