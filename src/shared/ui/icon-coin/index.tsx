import styles from "./style.module.scss";

export const ParentClassForCoin = styles.ParentClassForCoin
export const IconCoin = ({iconName, coinName, className = ""}) => <img className={`${styles.Coin} ${className}`}
                                                                       width={50}
                                                                       src={`/img/tokens/${iconName}`}
                                                                       onError={({currentTarget}) => {
                                                                           if (currentTarget.getAttribute("data-icon") === "empty") return null
                                                                           currentTarget.setAttribute("data-icon", "empty")
                                                                           currentTarget.src = "/img/icon/HelpIcon.svg"
                                                                           currentTarget.onerror = null
                                                                       }}
                                                                       alt={coinName}/>
