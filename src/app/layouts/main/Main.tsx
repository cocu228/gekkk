import styles from "./style.module.scss";
import {FC, PropsWithChildren} from "react";

const Main: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {
    return <>
        <main className={styles.Main}>
            {children}
        </main>
        {/* {((sm || md) && !isTransfersPage) && <Footer textAlight={"text-center"}/>} */}
    </>
}

export default Main;
