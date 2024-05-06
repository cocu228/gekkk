import { FC } from "react";
import styles from "./style.module.scss";

interface IProps {
    code: string,
    size: number
}

export const IconFlag:FC<IProps> = ({code,size}) => {

    const height = (size / 7) * 5

    return (
        <svg width={size} height={height} >
            <use href={`/img/gek_flags_lib.svg#${code}`}/>
        </svg>
    )
}