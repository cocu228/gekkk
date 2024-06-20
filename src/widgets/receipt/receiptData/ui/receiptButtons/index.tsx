import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
import { IconApp } from "@/shared/ui/icons/icon-app";
import styles from "@/widgets/receipt/receiptData/styles.module.scss";

interface IReceiptButtonsProps {
  componentRef: HTMLDivElement | null;
  isLoading: boolean;
  isMobile?: boolean;
  onCancel: () => void;
}

const ReceiptButtons: FC<IReceiptButtonsProps> = ({ onCancel, isLoading, isMobile, componentRef }) => {
  const { t } = useTranslation();

  const handleOnShare = async () => {
    if (navigator.canShare && navigator.canShare({ text: "hello" }) && navigator.share) {
      console.log("Can Share");
      try {
        await navigator.share({ text: "hello" });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Can`t Share");
    }
  };

  const content = () => componentRef;
  const trigger = useCallback(
    () => (
      <Button skeleton disabled={isLoading} className='w-full'>
        {t("download")} <IconApp size={20} code='t44' color='#2BAB72' />
      </Button>
    ),
    [isLoading]
  );

  return (
    <div className={styles.ButtonContainer}>
      {/* {isMobile ? ( */}
      <Button skeleton disabled={isLoading} className='w-full' onClick={handleOnShare}>
        <div className='w-full flex items-center justify-evenly'>
          <IconApp size={14} code='t38' color='#2BAB72' /> {t("share")}
        </div>
      </Button>
      {/* ) : ( */}
      {/* )} */}
      <Button color='blue' className='w-full' onClick={onCancel}>
        {t("close")}
      </Button>
    </div>
  );
};

export default ReceiptButtons;
