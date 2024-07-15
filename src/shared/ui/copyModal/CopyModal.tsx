import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useCopyStore from "@/shared/store/useCopy/useCopyStore";

import s from "./styles.module.scss";
import { IconApp } from "../icons/icon-app";

interface CopyModalProps {}

export const CopyModal: FC<CopyModalProps> = () => {
  const { isCopied, setIsCopied } = useCopyStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  return (
    <div className={`${s.Modal} ${isCopied && s.ModalActive}`}>
      <div className={s.ModalBody}>
        <IconApp code='t83' color='#2BAB72' className='min-w-[24px]' size={24} />
        <span className={s.ModalBodyTitle}>{t("copied")}</span>
      </div>
    </div>
  );
};
