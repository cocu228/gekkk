import { FC, PropsWithChildren } from "react";

import styles from "./style.module.scss";

const Main: FC<PropsWithChildren<unknown>> = ({ children }): JSX.Element | null => (
  <>
    <main className={styles.Main}>{children}</main>
    {/* {((sm || md) && !isTransfersPage) && <Footer textAlight={"text-center"}/>} */}
  </>
);

export default Main;
