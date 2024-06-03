import {FC, useContext, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import Loader from "@/shared/ui/loader";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { apiAddressTxInfo } from "@/shared/(orval)api";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import ReceiptInfo from "@/widgets/receipt/receiptData/ui/receiptInfo";
import ReceiptButtons from "@/widgets/receipt/receiptData/ui/receiptButtons";

interface BankReceiptProps {
  txId: string;
  isMobile?: boolean
}

type IState = AddressTxOut & {
  senderName?: string;
}

const ReceiptData: FC<BankReceiptProps> = ({ txId, isMobile }) => {
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

  return (
    <div className={styles.Wrapper}>
      {loading && <Loader/>}
      <ReceiptInfo ref={componentRef} state={state} txId={txId} loading={loading} />
      <ReceiptButtons
          componentRef={componentRef.current}
          isMobile={isMobile}
          isLoading={loading}
          onCancel={handleCancel}
      />
    </div>
  );
};

export default ReceiptData;
