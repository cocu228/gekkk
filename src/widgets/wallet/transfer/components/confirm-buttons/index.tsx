import { FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";

interface IConfirmButtonsProps {
  isConfirmDisabled?: boolean;
  confirmType?: "button" | "submit" | "reset";
  cancelType?: "button" | "submit" | "reset";
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmButtons: FC<IConfirmButtonsProps> = ({
  isConfirmDisabled,
  confirmTitle,
  cancelTitle,
  confirmType,
  cancelType,
  onConfirm,
  onCancel
}) => {
  const { t } = useTranslation();

  return (
    <div className='w-full flex gap-[20px]'>
      <div className='flex-auto'>
        <Button htmlType={confirmType} size='lg' disabled={isConfirmDisabled} className='w-full' onClick={onConfirm}>
          {confirmTitle ?? t("confirm")}
        </Button>
      </div>
      <div className='flex-auto'>
        <Button htmlType={cancelType} skeleton size='lg' className='w-full' onClick={onCancel}>
          {cancelTitle ?? t("cancel")}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmButtons;
