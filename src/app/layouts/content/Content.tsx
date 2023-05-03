import React, {FC, PropsWithChildren, useContext, useState} from "react";
import styles from "./style.module.scss";
import InfoBox from "@/widgets/info-box";
import UnknownTransactions from "@/widgets/unknown-transactions";

const CtxInfoBox = React.createContext([])

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <div className="w-full h-full">
        <InfoBox/>
        <UnknownTransactions/>
        <div className={styles.Content}>
            {children}
        </div>
    </div>
}

export default Content