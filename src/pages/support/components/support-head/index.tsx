import { FC } from "react";
import { useTranslation } from "react-i18next";

import { IconApp } from "@/shared/ui/icons/icon-app";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const SupportHead: FC = () => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();

  if (md) {
    return null;
  }

  return (
    <div className='support-header-container'>
      <IconApp code='t25' size={35} color='var(--gek-additional)' className='min-w-[35px]' />
      <div className='support-header-titles'>
        <h3>{t("support.title")}</h3>
        <p>{t("support.subtitle")}</p>
      </div>
    </div>
  );
};

export default SupportHead;
