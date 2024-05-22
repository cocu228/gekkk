import { FC } from "react";
import styles from "./style.module.scss";

interface IProps {
    code: string,
    className?: string,
    onClick?: () => void;
    size: number | string,
    color?: string
}

export const IconApp:FC<IProps> = ({code,size,color,className, onClick}) => {
    

    return (
        <svg width={size} onClick={onClick} className={`${className && className}`} fill={color} stroke={color} height={size}><use href={`/img/gek_icons_lib3.svg?v3#${code}`}></use></svg>
    )
}
