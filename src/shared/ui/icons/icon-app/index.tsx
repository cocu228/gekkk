import { FC } from "react";

interface IProps {
  code: string;
  className?: string;
  onClick?: () => void;
  size: number | string;
  color?: string;
  lib?: number;
}

export const IconApp: FC<IProps> = ({ code, size, color, className = "", onClick }) => (
  <svg width={size} onClick={onClick} className={`${className && className}`} fill={color} stroke={color} height={size}>
    <use href={`/img/gek_icons_lib2.svg?v#${code}`} />
  </svg>
);
