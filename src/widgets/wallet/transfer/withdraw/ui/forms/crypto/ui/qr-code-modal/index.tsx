import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from '../../styles.module.scss'
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import { Modal } from "@/shared/ui/modal/Modal";

interface IQRCodeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSuccess: (value: string) => void;
}

const QRCodeModal: FC<IQRCodeModalProps> = ({ isOpen, onCancel, onSuccess }) => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState<boolean>(false)

  return (
    <Modal title={t("scan_qr")} isModalOpen={isOpen} onCancel={onCancel}>
      <>
        {
          isScanning && (
            <span className={styles.QRcodeModalTitle}>Point the camera at the QR code</span>
          )
        }
        <QrcodeScanner setIsScanning={setIsScanning} onSuccess={onSuccess} />
      </>
    </Modal>
  );
};

export default QRCodeModal;
