import { memo, ReactNode } from "react";

import { IS_GEKKWALLET_APP } from "@/shared/lib";

import styles from "./style.module.scss";

interface IParams {
  isMainWallet?: boolean;
  children: ReactNode;
}

const WalletButtons = memo(({ children, isMainWallet }: IParams) => (
  <div
    className={`
            ${styles.WalletButtons}
            ${isMainWallet ? styles.MainWallet : ""}
            ${IS_GEKKWALLET_APP() ? styles.Gekwallet : ""}
        `}
  >
    {children}
  </div>
));

export default WalletButtons;
