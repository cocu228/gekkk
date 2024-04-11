import { ReactNode } from "react";
import { FrameItem } from "../../FrameItem";
import Arrow from '@/assets/arrow.svg?react';
import { Typography } from "../../typography/typography";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

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
        <div className='flex gap-7 items-center w-full'>
          {props.icon}
          <h4
            className={`
              font-medium ${props.isSelected ? 'text-[#fff]' : "text-[#1F3446]"} font-[Inter] text-[14px]
            `}
          >{props.text}</h4>
        </div>
        {md && <Arrow />}
      </FrameItem>
    );
}
