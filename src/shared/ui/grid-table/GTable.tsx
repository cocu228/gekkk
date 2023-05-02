import {FC} from "react";
import styles from "./style.module.scss";

interface IParams {
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const GTable: FC<IParams> = ({ children, style, className }) => {
    return (
        <div style={style} className={`grid ${className} ${styles.ItemsList}`}>
            {children}
        </div>
    )
}
