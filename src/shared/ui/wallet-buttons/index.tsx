import { memo } from "react";
import styles from "./style.module.scss";


interface IParams {
    isMainWallet?: boolean;
    children: React.ReactNode;
}

const WalletButtons = memo(({children, isMainWallet}: IParams) => {
    return(
        <div className={`${styles.WalletButtons} ${isMainWallet ? styles.MainWallet : ''}`}> 
            {children}
        </div>
    )
})

export default WalletButtons;
