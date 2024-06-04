import {memo} from "react";
import styles from "./style.module.scss";
import {IS_GEKKWALLET_APP} from "@/shared/lib";

interface IParams {
    isMainWallet?: boolean;
    children: React.ReactNode;
}

const WalletButtons = memo(({children, isMainWallet}: IParams) => {
    return(
        <div className={`
            ${styles.WalletButtons}
            ${isMainWallet ? styles.MainWallet : ''}
            ${IS_GEKKWALLET_APP() && styles.Gekwallet}
        `}> 
            {children}
        </div>
    )
})

export default WalletButtons;
