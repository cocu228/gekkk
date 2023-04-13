import styles from "./style.module.scss";

export const ParentClassForCoin = styles.ParentClassForCoin
export const IconCoin = ({iconName, coinName, className = "", width = 50, height = 50}) => <img
    className={`${styles.Coin} ${className}`}
    width={width}
    height={height}
    src={`/img/tokens/${iconName}`}
    onError={({currentTarget}) => {
        if (currentTarget.getAttribute("data-icon") === "empty") return null
        currentTarget.setAttribute("data-icon", "empty")
        currentTarget.src = "/img/icon/HelpIcon.svg"
        currentTarget.onerror = null
    }}
    alt={coinName}/>
