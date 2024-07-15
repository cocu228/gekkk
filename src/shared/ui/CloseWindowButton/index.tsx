import { FC } from "react";

import { IconApp } from "../icons/icon-app";

interface CloseWindowButtonProps {
  onClick: () => void;
}

export const CloseWindowButton: FC<CloseWindowButtonProps> = props => (
  <div onClick={props.onClick} className='text-[#285E69ff] cursor-pointer'>
    <IconApp code='t26' size={20} color='#285E69ff' />
  </div>
);
