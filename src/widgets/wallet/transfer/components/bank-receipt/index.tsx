import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { apiGetBankReceipt, IReceiptData } from "@/shared/api/bank/get-bank-receipt";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { getMethodTitle, getStatusTitle } from "./model/helpers";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import { CtxModalTrxResult } from "../../withdraw/model/context";

interface BankReceiptProps {
  referenceNumber: string;
  uasToken: string;
}

const BankReceipt: FC<BankReceiptProps & any> = ({ referenceNumber, uasToken }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<IReceiptData>(null);
  const { handleCancel } = useContext(CtxModalTrxResult);
  const { getAccountDetails } = storeAccountDetails((state) => state);

  useEffect(() => {
    (async () => {
      const { phone } = await getAccountDetails();

      const result = await apiGetBankReceipt(
        referenceNumber,
        {
          headers: {
            Authorization: phone,
            Token: uasToken,
          },
      });

      if (result.data) {
        setState(result.data);
        setLoading(false);
      }
      else {

      }
    })();
  }, []);

  return (
    <div className={styles.Wrapper}>
      {loading && <Loader/>}
      
      <div className={styles.Block + (!loading ? '' : ' collapse')}>
        <div className={styles.Header}>
          <div className={styles.HeaderLogo}>
            <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
          </div>

          <div className={styles.HeaderTitle}>Payment Receipt</div>
          <div className={styles.HeaderId}>{state?.id}</div>
          <div className={styles.HeaderDate}>{!state?.executedAt
            ? null
            : formatDateTime(new Date(state.executedAt))
          }</div>
        </div>

        {/* Sender information */}
        <span className={styles.InformationBlockTitle}>Sender information</span>
        <div className={styles.InformationBlock}>
          {/* From name */}
          {!state?.fromName ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Name</span>
              <span className={styles.InformationBlockItemValue}>{state.fromName}</span>
            </div>
          )}

          {/* From number */}
          {!state?.fromNumber ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Account number</span>
              <span className={styles.InformationBlockItemValue}>{state.fromNumber}</span>
            </div>
          )}

          {/* From bank */}
          {!state?.fromBank ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Bank name</span>
              <span className={styles.InformationBlockItemValue}>{state.fromBank}</span>
            </div>
          )}

          {/* From pan display */}
          {!state?.fromPanDisplay ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Number</span>
              <span className={styles.InformationBlockItemValue}>{state.fromPanDisplay}</span>
            </div>
          )}
        </div>

        {/* Beneficiary information */}
        <span className={styles.InformationBlockTitle}>Beneficiary information</span>
        <div className={styles.InformationBlock}>
          {/* To name */}
          {!state?.toName ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Name</span>
              <span className={styles.InformationBlockItemValue}>{state.toName}</span>
            </div>
          )}

          {/* To number */}
          {!state?.toNumber ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Account number</span>
              <span className={styles.InformationBlockItemValue}>{state.toNumber}</span>
            </div>
          )}

          {/* To bank */}
          {!state?.toBank ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Bank name</span>
              <span className={styles.InformationBlockItemValue}>{state.toBank}</span>
            </div>
          )}
        </div>

        {/* Payment information */}
        <span className={styles.InformationBlockTitle}>{t("payment_information")}</span>
        <div className={styles.InformationBlock}>
          {/* Payment type */}
          {!state?.paymentType ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Payment type</span>
              <span className={styles.InformationBlockItemValue}>{state.paymentType}</span>
            </div>
          )}

          {/* Operation type */}
          {!state?.operationType ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Payment type</span>
              <span className={styles.InformationBlockItemValue}>{state.operationType}</span>
            </div>
          )}

          {/* Currency */}
          {!state?.currency?.code ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Currency</span>
              <span className={styles.InformationBlockItemValue}>{state.currency?.code}</span>
            </div>
          )}

          {/* Amount */}
          {!state?.amount ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Amount</span>
              <span className={styles.InformationBlockItemValue}>{Math.abs(+state.amount)} {state.currency?.code ?? null}</span>
            </div>
          )}

          {/* Fee */}
          {!state?.fee ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Fee</span>
              <span className={styles.InformationBlockItemValue}>{state.fee} {state.currency?.code ?? null}</span>
            </div>
          )}
          
          {/* Description */}
          {!state?.description ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Description</span>
              <span className={styles.InformationBlockItemValue}>{state.description}</span>
            </div>
          )}

          {/* Payment method */}
          {!state?.paymentToRepeat?.type ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Payment method</span>
              <span className={styles.InformationBlockItemValue}>{getMethodTitle(state.paymentToRepeat?.type)}</span>
            </div>
          )}
        </div>

        <div className={styles.Footer}>
          <div className={styles.Status}>
            <span>{!state?.status ? null : getStatusTitle(state.status)}</span>
          </div>
        </div>
      </div>

      {handleCancel === null ? null : (
        <div className={styles.ButtonContainer}>
          <Button
            size='xl'
            variant="blueTransfer"
            className='w-full'
            onClick={handleCancel}
          >
              {t("close")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BankReceipt;
