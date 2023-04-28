import {FC} from "react";
import styles from "./style.module.scss";

interface IParams {
    className?: string;
    maxHeight?: number;
    children: React.ReactNode;
}

export const GTable: FC<IParams> = ({ children, maxHeight = 1080, className }) => {
    return (
        <div
            className={`grid ${className} ${styles.ItemsList}`}
            style={{
                maxHeight: maxHeight
            }}
        >
            {children}
        </div>
    )
}
