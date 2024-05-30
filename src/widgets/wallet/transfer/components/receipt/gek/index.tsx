import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import {GlobalCtxModalContext} from "@/app/providers/GlobalCtxModalProvider";
import { apiAddressTxInfo } from "@/shared/(orval)api";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { isNumber } from "@/shared/lib";

interface BankReceiptProps {
  txId: string;
}

type IState = AddressTxOut & {
  senderName?: string;
}

const GekReceipt: FC<BankReceiptProps> = ({ txId }) => {
  const { t } = useTranslation();
  const [state, setState] = useState<IState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { handleCancel } = useContext(GlobalCtxModalContext);
  const { getAccountDetails } = storeAccountDetails((state) => state);

  useEffect(() => {
    (async () => {
      const {name} = await getAccountDetails();
      const result = await apiAddressTxInfo({
        tx_id: +txId
      });

      if (result.data) {
        setState({
          senderName: name,
          ...result.data.result
        });
        setLoading(false);
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
          <div className={styles.HeaderId}>{txId}</div>
          <div className={styles.HeaderDate}>{!state?.created
            ? null
            : formatDateTime(new Date(state.created))
          }</div>
        </div>

        <span className={styles.InformationBlockTitle}/>
        <div className={styles.InformationBlock}>
          {/* TODO: text description Transaction type */}
          {!state?.txType ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Transaction type</span>
              <span className={styles.InformationBlockItemValue}>{state.txType}</span>
            </div>
          )}

          {/* Currency */}
          {!state?.currency ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Currency</span>
              <span className={styles.InformationBlockItemValue}>{state.currency}</span>
            </div>
          )}

          {/* Amount */}
          {!state?.amount ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Amount</span>
              <span className={styles.InformationBlockItemValue}>{state.amount}</span>
            </div>
          )}

          {/* Fee */}
          {!state?.fee ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Fee</span>
              <span className={styles.InformationBlockItemValue}>{state.fee}</span>
            </div>
          )}

          {/* Status */}
          {!state?.state_text ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Status</span>
              <span className={styles.InformationBlockItemValue}>{state.state_text}</span>
            </div>
          )}

          {/* Sender name */}
          {!state?.senderName ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Sender name</span>
              <span className={styles.InformationBlockItemValue}>{state.senderName}</span>
            </div>
          )}

          {/* Address from */}
          {!state?.addressFrom ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Address from</span>
              <span className={styles.InformationBlockItemValue}>{state.addressFrom}</span>
            </div>
          )}
          
          {/* Address to */}
          {!state?.addressTo ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Address to</span>
              <span className={styles.InformationBlockItemValue}>{state.addressTo}</span>
            </div>
          )}

          {/* Token network */}
          {!state?.tokenNetwork ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Token network</span>
              <span className={styles.InformationBlockItemValue}>{state.tokenNetwork}</span>
            </div>
          )}

          {/* Tx hash */}
          {!state?.txHash ? null : (
            <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Transaction
                {isNumber(+state.txHash)
                  ? " number"
                  : " hash"
                }
              </span>
              <span className={styles.InformationBlockItemValue}>{state.txHash}</span>
            </div>
          )}
        </div>
        
        <span className={styles.InformationBlockTitle}/>
      </div>

      {handleCancel === null ? null : (
        <div className={styles.ButtonContainer}>
          <Button
            size='lg'
            color="blue"
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

export default GekReceipt;
