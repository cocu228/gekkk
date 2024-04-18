import { FC } from "react";
import styles from "./style.module.scss";

interface IProps {
    code: string,
    size: number,
    color?: string
}

export const IconApp:FC<IProps> = ({code,size,color}) => {

    return (
        <svg width={size} stroke={color} height={size}><use href={`/img/gek_icons_lib2.svg#t13`}></use></svg>
    )
}