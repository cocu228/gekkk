import { FC } from "react";
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import { Modal } from "@/shared/ui/modal/Modal";
import { useTranslation } from "react-i18next";

interface IQRCodeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSuccess: (value: string) => void;
}

const QRCodeModal: FC<IQRCodeModalProps> = ({ isOpen, onCancel, onSuccess }) => {
  const {t} = useTranslation()
  
  return (
    <Modal title={t('scan_qr')} isModalOpen={isOpen} onCancel={onCancel}>
      <QrcodeScanner onSuccess={onSuccess} />
    </Modal>
  )
}

export default QRCodeModal;