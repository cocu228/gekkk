import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { TransactionV1 } from "@/shared/(orval)api/gek/model";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import { getMethodTitle, getStatusTitle } from "../../model/helpers";

export type IBankReceipt = TransactionV1 & {
  senderName?: string;
};

const BankReceipt = (data: IBankReceipt) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.HeaderLogo}>
          <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
        </div>

        <div className={styles.HeaderTitle}>Payment Receipt</div>
        <div className={styles.HeaderId}>{data?.id}</div>
        <div className={styles.HeaderDate}>{!data?.date
          ? null
          : formatDateTime(new Date(data.date))
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
            <span className={styles.InformationBlockItemValue}>{data.fromPanDisplay as string}</span>
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
        {!data?.amount?.currency ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("currency")}</span>
            <span className={styles.InformationBlockItemValue}>{data.amount?.currency}</span>
          </div>
        )}

        {/* Amount */}
        {!data?.amount?.amount ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("amount")}</span>
            <span className={styles.InformationBlockItemValue}>{Math.abs(+data.amount.amount)} {data?.amount?.currency ?? null}</span>
          </div>
        )}

        {/* Fee */}
        {!data?.fee ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("fee")}</span>
            <span className={styles.InformationBlockItemValue}>{data.fee} {data?.amount?.currency ?? null}</span>
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
        {!data?.getOpenApiData?.getExternalData?.type ? null : (
          <div className={styles.InformationBlockItem}>
            <span className={styles.InformationBlockItemTitle}>{t("payment_method")}</span>
            <span className={styles.InformationBlockItemValue}>{
              getMethodTitle(data.getOpenApiData.getExternalData.type)}
            </span>
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
