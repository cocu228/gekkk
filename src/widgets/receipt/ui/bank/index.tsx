import { forwardRef } from "react";
import { TFunction } from "i18next";
import styles from "./styles.module.scss";
import { IReceiptData } from "@/shared/api/bank/get-bank-receipt";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import { getMethodTitle, getStatusTitle } from "../../model/helpers";
import { useTranslation } from "react-i18next";

interface IBankReceipt {
  data: IReceiptData;
}

const BankReceipt = ({data}: IBankReceipt) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.HeaderLogo}>
          <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
        </div>

        <div className={styles.HeaderTitle}>Payment Receipt</div>
        <div className={styles.HeaderId}>{data?.id}</div>
        <div className={styles.HeaderDate}>{!data?.executedAt
          ? null
          : formatDateTime(new Date(data.executedAt))
        }</div>
      </div>

      {/* Sender information */}
      <span className={styles.InformationBlockTitle}>Sender information</span>

      <div className={styles.InformationBlock}>
        {/* From name */}
        {!data?.fromName ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("name")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fromName}</span>
          </div>
        )}

        {/* From number */}
        {!data?.fromNumber ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("account_number")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fromNumber}</span>
          </div>
        )}

        {/* From bank */}
        {!data?.fromBank ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("bank_name")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fromBank}</span>
          </div>
        )}

        {/* From pan display */}
        {!data?.fromPanDisplay ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("number")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fromPanDisplay}</span>
          </div>
        )}
      </div>

      {/* Beneficiary information */}
      <span className={styles.InformationBlockTitle}>{t("beneficiary_information")}</span>

      <div className={styles.InformationBlock}>
        {/* To name */}
        {!data?.toName ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("name")}</span>
            <span className={styles.InformationBlockItemValue}>{data.toName}</span>
          </div>
        )}

        {/* To number */}
        {!data?.toNumber ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("account_number")}</span>
            <span className={styles.InformationBlockItemValue}>{data.toNumber}</span>
          </div>
        )}

        {/* To bank */}
        {!data?.toBank ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("bank_name")}</span>
            <span className={styles.InformationBlockItemValue}>{data.toBank}</span>
          </div>
        )}
      </div>

      {/* Payment information */}
      <span className={styles.InformationBlockTitle}>{t("payment_information")}</span>
      
      <div className={styles.InformationBlock}>
        {/* Payment type */}
        {!data?.paymentType ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("payment_type")}</span>
            <span className={styles.InformationBlockItemValue}>{data.paymentType}</span>
          </div>
        )}

        {/* Operation type */}
        {!data?.operationType ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("payment_type")}</span>
            <span className={styles.InformationBlockItemValue}>{data.operationType}</span>
          </div>
        )}

        {/* Currency */}
        {!data?.currency?.code ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("currency")}</span>
            <span className={styles.InformationBlockItemValue}>{data.currency?.code}</span>
          </div>
        )}

        {/* Amount */}
        {!data?.amount ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("amount")}</span>
            <span className={styles.InformationBlockItemValue}>{Math.abs(+data.amount)} {data.currency?.code ?? null}</span>
          </div>
        )}

        {/* Fee */}
        {!data?.fee ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("fee")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fee} {data.currency?.code ?? null}</span>
          </div>
        )}

        {/* Description */}
        {!data?.description ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("description")}</span>
            <span className={styles.InformationBlockItemValue}>{data.description}</span>
          </div>
        )}
        {/* Payment method */}
        {!data?.paymentToRepeat?.type ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("payment_method")}</span>
            <span className={styles.InformationBlockItemValue}>{getMethodTitle(data.paymentToRepeat?.type)}</span>
          </div>
        )}
      </div>
      <div className={styles.Footer}>
        <div className={styles.Status}>
          <span>{!data?.status ? null : getStatusTitle(data.status)}</span>
        </div>
      </div>
    </>
  );
}

export default BankReceipt;
