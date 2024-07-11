import { FC } from "react";
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import { Modal } from "@/shared/ui/modal/Modal";

interface IQRCodeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSuccess: (value: string) => void;
}

const QRCodeModal: FC<IQRCodeModalProps> = ({ isOpen, onCancel, onSuccess }) => {
  return (
    <Modal title="&nbsp;" isModalOpen={isOpen} onCancel={onCancel}>
      <QrcodeScanner onSuccess={onSuccess} />
    </Modal>
  )
}

export default QRCodeModal;