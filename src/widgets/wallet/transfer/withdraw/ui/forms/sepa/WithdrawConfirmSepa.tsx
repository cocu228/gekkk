import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import { CtxRootData } from "@/processes/RootContext";
import { apiPaymentSepa, IResCommission, IResResult } from "@/shared/api";
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
import { CtxModalTrxResult } from "../../../model/context";
import ModalTrxStatusError from "../../modals/ModalTrxStatusError";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import BankReceipt from "@/widgets/wallet/transfer/components/bank-receipt";
import { IconApp } from "@/shared/ui/icons/icon-app";

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
  const { setContent } = useContext(CtxModalTrxResult);
  const [uasToken, setUasToken] = useState<string>(null);
  const { getAccountDetails } = storeAccountDetails((state) => state);
  const { networkTypeSelect, networksForSelector } =
    useContext(CtxWalletNetworks);
  const { label } = networksForSelector.find(
    (it) => it.value === networkTypeSelect
  );

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
    (async () => {
      const { data } = await apiGetUas();
      const { phone } = await getAccountDetails();

      setUasToken(data.result.token);

      apiPaymentSepa(details.current, true, {
        Authorization: phone,
        Token: data.result.token,
      })
        .then(({ data }) =>
          setState((prev) => ({
            ...prev,
            loading: false,
            total: data as IResCommission,
          }))
        )
        .catch(() => {
          handleCancel();
          setContent({ content: <ModalTrxStatusError /> });
        });
    })();
  }, []);

  const onConfirm = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const { phone } = await getAccountDetails();

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

  return (
    <div className="-md:px-4">
      {loading && <Loader className="justify-center" />}

      <div className={loading ? "collapse" : ""}>
        <div className="row mb-5 md:mb-0">
          <div className="col">
            <div className="p-4">
              <div className={`wrapper ${styles.ModalInfo}`}>
                <div className={styles.ModalInfoIcon}>
                  <div className="col">
                    <IconApp color="#8F123A" size={22} code="t27" />
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
        </div>

        <div className={styles.ModalRows}>
          <div className="row mb-2 md:mb-1">
            <div className="col">
              <span className={styles.ModalRowsTitle}>
                {t("type_transaction")}
              </span>
            </div>
          </div>
          <div className="row mb-4 md:mb-2">
            <div className="col text-[#3A5E66] font-semibold">
              <span className={styles.ModalRowsValue}>{label}</span>
            </div>
          </div>
          <div className="row mb-2 md:mb-1">
            <div className="col">
              <span className={styles.ModalRowsTitle}>IBAN</span>
            </div>
          </div>
          <div className="row mb-4 md:mb-2">
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
          <div className="row mb-2 md:mb-1">
            <div className="col">
              <span className={styles.ModalRowsTitle}>{t("recipient")}</span>
            </div>
          </div>
          <div className="row mb-4 md:mb-2">
            <div className="col text-[#3A5E66] font-semibold">
              <span className={styles.ModalRowsValue}>{beneficiaryName}</span>
            </div>
          </div>
          <div className="row mb-2 md:mb-1">
            <div className="col">
              <span className={styles.ModalRowsTitle}>{t("description")}</span>
            </div>
          </div>
          <div className="row mb-4 md:mb-2">
            <div className="col text-[#3A5E66] font-semibold">
              <span className={styles.ModalRowsValue}>
                {t(`${transferDescription}`)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ModalPayInfo}>
          <div className={styles.ModalPayInfoCol}>
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
                  {total?.total ?? "-"}
                </span>
              </div>
              <div className={styles.ModalPayInfoValueFlex}>
                <span className={styles.ModalPayInfoValueFlexText}>
                  {amount}
                </span>
              </div>
              <div className={styles.ModalPayInfoValueFlex}>
                <span className={styles.ModalPayInfoValueFlexTextFee}>
                  {total?.commission ?? "-"}
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

        <div className="row mt-4">
          <div className="col relative">
            <div className={styles.ButtonContainer + " px-4"}>
              <Button
                size={"xl"}
                variant='greenTransfer'
                disabled={!total}
                onClick={onConfirm}
                className={styles.ButtonTwo}
              >
                {t("confirm")}
              </Button>

              <Button
                size={"xl"}
                variant='whiteGreenTransfer'
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
      </div>
    </div>
  );
};

export default WithdrawConfirmSepa;
