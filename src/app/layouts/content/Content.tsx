import {FC, PropsWithChildren, useContext} from "react";
import styles from "./style.module.scss"
import InfoBox from "@/widgets/info-box";

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <>
        <div className={styles.Content}>
            <InfoBox/>
            {children}
        </div>
    </>
}

export default Content