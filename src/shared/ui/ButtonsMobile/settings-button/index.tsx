// import { Typography } from "@mui/material";
import { Typography } from "../../typography/typography";
import { t } from "i18next";
import { FrameItem } from "../../FrameItem";
import { ReactNode, useContext } from "react";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import Arrow from '@/assets/arrow.svg?react';

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
        justifyContent={'space-between'}
      >
        <div className='flex gap-7 items-center'>
          {props.icon}
          <Typography variant="h" color={props.isSelected ? "white" : "dark-green"} className="font-normal">{props.text}</Typography>
        </div>
        {md && <Arrow />}
      </FrameItem>
    );
}
