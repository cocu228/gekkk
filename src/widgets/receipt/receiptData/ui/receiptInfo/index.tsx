import React, { forwardRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import { isNumber } from "@/shared/lib";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";

import styles from "../../styles.module.scss";

interface IGekPdfProps {
  state:
    | (AddressTxOut & {
        senderName?: string;
      })
    | null;
  txId: string;
  loading: boolean;
}

const ReceiptInfo = forwardRef<HTMLDivElement | null, IGekPdfProps>(({ state, txId, loading }, ref) => {
  // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  // generatePDF(targetRef, {filename: 'page.pdf'}).then((pdf) => pdf.save());
  const refa = React.createRef<any>();

  const generatePDF = async () => {
    const input = document.getElementById("pdf-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfBlob = pdf.output("blob");

    if (navigator.share) {
      const file = new File([pdfBlob], "document.pdf", { type: "application/pdf" });
      navigator
        .share({
          files: [file],
          title: "PDF Document",
          text: "Here is your PDF document."
        })
        .then(() => {
          console.log("Share was successful.");
        })
        .catch(error => {
          console.log("Sharing failed", error);
        });
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  return (
    // <div ref={targetRef}
    <div ref={refa} id='pdf-content' className={styles.Block + (!loading ? "" : " collapse")}>
      <div onClick={generatePDF}>SAVE TO PDF</div>

      <div className={styles.Header}>
        <div className={styles.HeaderLogo}>
          <img src='/img/icon/GekkardLogoReceipt.svg' alt='AlertIcon' />
        </div>

        <div className={styles.HeaderTitle}>Payment Receipt</div>
        <div className={styles.HeaderId}>{txId}</div>
        <div className={styles.HeaderDate}>{!state?.created ? null : formatDateTime(new Date(state.created))}</div>
      </div>

      <span className={styles.InformationBlockTitle} />
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
            <span className={styles.InformationBlockItemTitle}>
              Transaction
              {isNumber(+state.txHash) ? " number" : " hash"}
            </span>
            <span className={styles.InformationBlockItemValue}>{state.txHash}</span>
          </div>
        )}
      </div>

      <span className={styles.InformationBlockTitle} />
    </div>
  );
});

export default ReceiptInfo;
