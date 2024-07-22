import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IconApp } from "@/shared/ui/icons/icon-app";
import Button from "@/shared/ui/button/Button";
import { Modal } from "@/shared/ui/modal/Modal";

interface IConfirmInfoProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ConfirmInfo: FC<IConfirmInfoProps> = ({ isOpen, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal isModalOpen={isOpen} onCancel={onCancel} title={t("use_confirmation")}>
      <div className='flex flex-row mt-4 items-start'>
        <IconApp code='t27' className='mr-2 min-w-[15px] mt-[2px]' color='#2BAB72' size={15} />
        <div className='flex items-center'>
          <span className="text-[#7B797C] text-fs12 font-normal">{t("when_using_confirmation_mobile")}</span>
        </div>
      </div>
      <div className='flex justify-center w-full mt-[10px]'>
        <Button size='md' color='blue' className='w-full mt-5' onClick={onCancel}>
          {t("close")}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmInfo;
