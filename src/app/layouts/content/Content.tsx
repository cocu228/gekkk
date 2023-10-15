import React, {FC, PropsWithChildren} from "react";
import styles from "./style.module.scss";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import {TransactionConfirmationWindow} from "@/widgets/transaction-confirmation-window/TransactionConfirmationWindow";

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <div className="w-full h-full md:mb-3 mb-10">
        <UnconfirmedTransactions/>
        <TransactionConfirmationWindow/>
        <div className={styles.Content}>
            {children}
        </div>
    </div>
}

export default Content
