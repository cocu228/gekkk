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
export const IconCoin = ({code, className = "", width = 50, height = 50, extension = "svg"}: AtLeast<IProps, "code">) =>
    <img
        className={`${styles.Coin} ${className}`}
        width={width}
        height={height}
        src={`/img/tokens/${code?.toLowerCase().capitalize()}Icon.${extension}`}
        onError={({currentTarget}) => {
            if (currentTarget.getAttribute("data-icon") === "empty") return null
            currentTarget.setAttribute("data-icon", "empty")
            currentTarget.src = "/img/icon/HelpIcon.svg"
            currentTarget.onerror = null
        }}
        alt={code}/>
