import React, {FC, PropsWithChildren} from "react";
import styles from "./style.module.scss";
import InfoBox from "@/widgets/info-box";
import UnknownTransactions from "../../../widgets/history/ui/InfoConfirmPartner";

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <div className="w-full h-full md:mb-3 mb-10">
        <div className="negative-margin-content w-[max-content]">
            <InfoBox/>
        </div>
        {/*<UnknownTransactions/>*/}
        <div className={styles.Content}>
            {children}
        </div>
    </div>
}

export default Content