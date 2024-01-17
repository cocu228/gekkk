import { memo } from "react";
import styles from "./style.module.scss";


interface IParams {
    children: React.ReactNode,
    crypto?: boolean,
}

const WalletButtons = memo(({children, crypto}: IParams) => {
    return(
        <div className={crypto?styles.CryptoWalletButtons:styles.WalletButtons}> 
            {children}
        </div>
    )
})

export default WalletButtons