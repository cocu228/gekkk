import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

import { FrameItem } from "../../FrameItem";
import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface Props {
  onClick?: () => void;
  isSelected?: boolean;
  icon: ReactNode;
  text: string;
  isLang?: boolean;
}

export function SettingsButton(props: Props) {
  const { md } = useBreakpoints();
  const { t } = useTranslation();

  return (
    <FrameItem onClick={props.onClick} isSelected={props.isSelected}>
      <div className={styles.itemBody}>
        {props.icon}
        <h4 className={`${styles.itemTitle} ${props.isSelected && styles.itemTitleSelected}`}>{props.text}</h4>
      </div>
      <div className={"flex gap-[10px] items-center"}>
        {md && props?.isLang ? <p className={"text-fs10 text-[var(--gek-dark-grey)]"}>{t("language_name")}</p> : null}
        {md && <IconApp size={13} code='t08' color='#B9B9B5' className='min-w-[13px]' />}
      </div>
    </FrameItem>
  );
}
