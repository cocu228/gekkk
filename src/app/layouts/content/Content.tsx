import React, {FC, PropsWithChildren} from "react";
import styles from "./style.module.scss";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import ActionConfirmationWindow from "@/widgets/action-confirmation-window/ui/ActionConfirmationWindow";

const Content: FC<PropsWithChildren> = ({children}): JSX.Element | null => {

    return (
        <div className="w-full h-full md:mb-3 mb-10">
            <UnconfirmedTransactions/>
            <ActionConfirmationWindow/>
            <div className={styles.Content}>
                {children}
            </div>
        </div>
    )
}

export default Content;
