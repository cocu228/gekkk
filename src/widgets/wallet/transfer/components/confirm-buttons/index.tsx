import { FC } from "react";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";

interface IConfirmButtonsProps {
  isConfirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmButtons: FC<IConfirmButtonsProps> = ({ isConfirmDisabled, onConfirm, onCancel }) => {
  const {t} = useTranslation();

  return (
    <div className="w-full flex gap-[20px]">
      <div className="flex-auto">
        <Button
          size="lg"
          disabled={isConfirmDisabled}
          className="w-full"
          onClick={onConfirm}
        >
          {t("confirm")}
        </Button>
      </div>
      <div className="flex-auto">
        <Button
          skeleton
          size="lg"
          className="w-full"
          onClick={onCancel}
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  )
}

export default ConfirmButtons;