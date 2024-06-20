import { FC } from "react";

interface IProps {
  code: string;
  className?: string;
  onClick?: () => void;
  size?: number | string;
  color?: string;
  /**
   * @value 1 - old icons library
   * @value 2 - app icons library
   * @value 3 - auth icons library
   * */
  lib?: 1 | 2 | 3;
  width?: number;
  height?: number;
}

export const IconApp: FC<IProps> = ({ code, size, width, height, lib = 2, color, className = "", onClick }) => {
  const widthIco = size ? size : width;
  const heightIco = size ? size : height;

  return (
    <svg
      width={widthIco}
      onClick={onClick}
      className={`${className && className}`}
      fill={color}
      stroke={color}
      height={heightIco}
    >
      <use href={`/img/gek_icons_lib${lib}.svg?#${code}`}></use>
    </svg>
  );
};
