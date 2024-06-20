import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Loader from "@/shared/ui/loader";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { apiGetBankReceipt, IReceiptData } from "@/shared/api/bank/get-bank-receipt";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatForFile } from "@/shared/lib/date-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";
import BankReceipt from "./bank";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { apiAddressTxInfo, apiGetUas } from "@/shared/(orval)api";
import GekReceipt from "./gek";
import { isGekTxId } from "../model/helpers";

interface BankReceiptProps {
  txId: string | number;
  onCancel?: () => void;
}

type IState = AddressTxOut | IReceiptData & {
  senderName?: string;
}

const Receipt: FC<BankReceiptProps> = ({ txId, onCancel }) => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const [state, setState] = useState<IState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { handleCancel } = useContext(CtxGlobalModalContext);
  const { getAccountDetails } = storeAccountDetails(state => state);

  const generatePDF = async () => {
      const pdf = new jsPDF();
      const input = componentRef.current;
      const canvas = await html2canvas(input);
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
      const fileName = formatForFile(Date.now());

      if (md && navigator.share) {
          const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
          navigator.share({
              files: [file],
              title: fileName,
              text: 'Send receipt to...',
          })
      } else {
          window.open(URL.createObjectURL(pdfBlob));
      }
  };

  const getBankReceipt = async () => {
    const {data} = await apiGetUas();
    const {phone} = await getAccountDetails();

    const response = await apiGetBankReceipt(txId as string, {
      headers: {
        Authorization: phone,
        Token: data.result.token,
      },
    });

    if (response.data) {
      setState({
        ...response.data
      });
    }
  }

  const getGekReceipt = async () => {
    const response = await apiAddressTxInfo({
      tx_id: +txId
    });

    if (response.data) {
      setState({
        ...response.data.result
      });
    }
  }

  useEffect(() => {
    (async () => {
      await (isGekTxId(txId)
        ? getGekReceipt()
        : getBankReceipt());

      setLoading(false);
    })();
  }, []);

  return loading ? <Loader className="relative my-20"/> : (
    <div className={styles.Wrapper}>
      <div className={styles.Block} ref={componentRef}>
        {isGekTxId(txId)
          ? <GekReceipt data={state as AddressTxOut} txId={txId as number}/>
          : <BankReceipt data={state as IReceiptData}/>
        }
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
