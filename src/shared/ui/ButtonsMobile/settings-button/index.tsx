import { ReactNode } from "react";
import { FrameItem } from "../../FrameItem";
import Arrow from '@/assets/arrow.svg?react';
import { Typography } from "../../typography/typography";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import s from '../styles.module.scss'

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
        <div className={s.itemBody}>
          {props.icon}
          <h4
            className={`${s.itemTitle} ${props.isSelected && s.itemTitleSelected}`}
          >{props.text}</h4>
        </div>
        {md && <Arrow />}
      </FrameItem>
    );
}
