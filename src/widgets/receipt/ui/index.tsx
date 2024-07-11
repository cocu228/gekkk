import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Loader from "@/shared/ui/loader";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import { AddressTxOut, GetHistoryTrasactionOut, TransactionV1 } from "@/shared/(orval)api/gek/model";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatForFile } from "@/shared/lib/date-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";
import BankReceipt from "./bank";
import { apiTransactionReceipt } from "@/shared/(orval)api";
import GekReceipt, { IGekRecepit } from "./gek";
import { CtxRootData } from "@/processes/RootContext";

interface ReceiptProps {
  /**Bank transaction number */
  txId?: string;

  /**Crypto transaction info */
  txInfo?: GetHistoryTrasactionOut & {
    addressTxInfo?: AddressTxOut | null;
  };
  
  onCancel?: () => void;
}

type IState = TransactionV1 | IGekRecepit;

const Receipt: FC<ReceiptProps> = ({ txId, txInfo, onCancel }) => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const { account } = useContext(CtxRootData);
  const [state, setState] = useState<IState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { handleCancel } = useContext(CtxGlobalModalContext);

  const generatePDF = async () => {
      const pdf = new jsPDF();
      const input = componentRef.current;

      input.style.boxShadow = 'none';

      const canvas = await html2canvas(input);
      
      input.style.boxShadow = '0px -10px 10px -10px rgba(0, 0, 0, 0.15), 0px 15px 10px -10px rgba(0, 0, 0, 0.25)';
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210/3; // 1/3 of A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage({
          x: 0,
          y: 0,
          format: "PNG",
          width: imgWidth,
          height: imgHeight,
          imageData: imgData,
          compression: "NONE"
      });
      
      const pdfBlob = pdf.output('blob');
      const fileName = `${formatForFile(Date.now())}.pdf`;
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

      if (md && navigator?.share && navigator?.canShare({files: [file]})) {
          await navigator.share({
              files: [file],
              title: fileName,
              text: 'Send receipt to...',
          })
      } else {
          window.open(URL.createObjectURL(file));
      }
  };

  const getBankReceipt = async () => {
    const response = await apiTransactionReceipt({referenceId: txId});

    if (response.data) {
      setState({
        ...response.data.result
      });
    }
  }

  useEffect(() => {
    (async () => {
      if (!!txId) {
        await getBankReceipt();
      }

      setLoading(false);
    })();
  }, [account]);

  return loading ? <Loader className="relative my-20"/> : (
    <div className={styles.Wrapper}>
      <div className={styles.Block} ref={componentRef}>
        <div>
          {!!txId
            ? <BankReceipt {...state as TransactionV1}/>
            : <GekReceipt {...txInfo}/>
          }
        </div>
      </div>

      {/* Buttons container */}
      <div className={styles.ButtonContainer}>
        <Button
          skeleton
          className='w-full'
          onClick={generatePDF}
        >
          {(md && navigator.share) ? <>
            <IconApp size={20} code="t38" color="var(--gek-green)"/> {t("share")}
          </> : <>
            {t("download")} <IconApp className="mb-1" size={20} code="t44" color="#2BAB72"/>
          </>}
        </Button>

        <Button
          color="blue"
          className='w-full'
          onClick={onCancel ? onCancel : handleCancel}
        >
          {t("close")}
        </Button>
      </div>
    </div>
  );
};

export default Receipt;
