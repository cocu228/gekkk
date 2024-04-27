import { ReactNode } from "react";
import { FrameItem } from "../../FrameItem";
import Arrow from '@/assets/arrow.svg?react';
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from '../styles.module.scss'

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
        {md && <Arrow />}
      </FrameItem>
    );
}
