import { memo } from "react";
import styles from "./style.module.scss";


interface IParams {
    children: React.ReactNode;
}

const WalletButtons = memo(({children}: IParams) => {
    return(
        <div className={styles.WalletButtons}> 
            {children}
        </div>
    )
})

export default WalletButtons