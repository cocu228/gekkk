import {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import ReactToPrint from "react-to-print";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { apiAddressTxInfo } from "@/shared/(orval)api";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import {IconApp} from "@/shared/ui/icons/icon-app";
import Gek from "@/widgets/wallet/transfer/components/receipt/gek/ui/Gek/Gek";

interface BankReceiptProps {
  txId: string;
}

type IState = AddressTxOut & {
  senderName?: string;
}

const GekReceipt: FC<BankReceiptProps> = ({ txId }) => {
  const { t } = useTranslation();
  const componentRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<IState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { handleCancel } = useContext(CtxGlobalModalContext);
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

  const content = () => componentRef.current;
  const trigger = useCallback(() => (
      <Button skeleton disabled={loading} className='w-full'>
        {t("download")} <IconApp size={20} code="t44" color="#2BAB72" />
      </Button>
  ), [loading]);

  return (
    <div className={styles.Wrapper}>
      {loading && <Loader/>}
      <Gek ref={componentRef} state={state} txId={txId} loading={loading} />
      {handleCancel === null ? null : (
        <div className={styles.ButtonContainer}>
          <ReactToPrint
              trigger={trigger}
              content={content}
              documentTitle={txId}
          />
          <Button
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
