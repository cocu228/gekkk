import styles from "./style.module.scss";

interface IProps {
    code: string;
    width: number;
    height: number;
    extension: string;
    className: string;
}

export const ParentClassForCoin = styles.ParentClassForCoin

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
export const IconCoin = ({code, className = "", width, height = 50}: AtLeast<IProps, "code">) =>
    <svg width={width ?? height} height={height} className={`${styles.Coin} ${className}`}><use href={"/img/tokens.svg?v3#" + code} /></svg>

        
