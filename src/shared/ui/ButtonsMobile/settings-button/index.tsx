import { ReactNode } from "react";
import { FrameItem } from "../../FrameItem";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from '../styles.module.scss'
import { IconApp } from "../../icons/icon-app";

interface Props {
    onClick?: () => void;
    isSelected?: boolean;
    icon: ReactNode;
    text: string;

}

export function SettingsButton(props: Props ) {
    const {md} = useBreakpoints();
    
    return (
        <FrameItem
          onClick={props.onClick}
          isSelected={props.isSelected}
      >
        <div className={styles.itemBody}>
          {props.icon}
          <h4
            className={`${styles.itemTitle} ${props.isSelected && styles.itemTitleSelected}`}
          >{props.text}</h4>
        </div>
        {md && <IconApp size={13} code="t08" color="#B9B9B5" className="min-w-[13px]" />}
      </FrameItem>
    );
}
