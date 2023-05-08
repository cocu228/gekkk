import {FC} from "react";
import Loader from "../../loader";
import styles from "./style.module.scss";

interface IParams {
    className?: string;
    children: React.ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
}

export const GTBody: FC<IParams> = ({ children, className, loading, style }) => {
    return (
        <div
            className={`grid ${className} ${styles.ItemsList} overflow-x-hidden overflow-y-auto`}
            style={style}
        >
            {!loading ? children : (
                <Loader className="relative align-middle"/>
            )}
        </div>
    )
}