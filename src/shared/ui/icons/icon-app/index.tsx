import {FC} from "react";
import styles from "./style.module.scss";

interface IProps {
    code: string,
    className?: string,
    onClick?: () => void;
    size: number | string,
    color?: string,
    lib?: number
}

export const IconApp: FC<IProps> = ({code, size, color, className="", onClick, lib = 3}) => {


    return (
        <svg width={size} onClick={onClick} className={`${className && className}`} fill={color} stroke={color}
             height={size}>
            <use href={`/img/gek_icons_lib${lib}.svg?v${lib}#${code}`}></use>
        </svg>
    )
}
