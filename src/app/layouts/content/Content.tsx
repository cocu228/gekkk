import React, {FC, PropsWithChildren} from "react";
import styles from "./style.module.scss";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <div className="w-full h-full md:mb-3 mb-10">
        <UnconfirmedTransactions/>
        <div className={styles.Content}>
            {children}
        </div>
    </div>
}

export default Content