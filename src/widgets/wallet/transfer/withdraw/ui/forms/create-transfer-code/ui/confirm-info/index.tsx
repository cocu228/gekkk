import {FC} from "react";
import {IconApp} from "@/shared/ui/icons/icon-app";
import styles from "@/widgets/wallet/transfer/withdraw/ui/forms/styles.module.scss";
import Button from "@/shared/ui/button/Button";
import {Modal} from "@/shared/ui/modal/Modal";
import {useTranslation} from "react-i18next";

interface IConfirmInfoProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ConfirmInfo: FC<IConfirmInfoProps> = ({ isOpen, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal
      isModalOpen={isOpen}
      onCancel={onCancel}
      title={t("use_confirmation")}
    >
      <div className="flex flex-row mt-4 items-center">
        <IconApp code="t27" className="mr-2 min-w-[14px]" color="#2BAB72" size={14} />
        <div className="flex items-center">
          <span>{t("when_using_confirmation_mobile")}</span>
        </div>
      </div>
      <div className={styles.ButtonContainerCenter}>
        <Button size="lg" color="blue" className="w-full mt-5" onClick={onCancel}>
          {t("close")}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmInfo;