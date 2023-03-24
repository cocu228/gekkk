import {FC, PropsWithChildren, useContext} from "react";
import styles from "./style.module.scss"

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <>
        <div className={styles.Content}>
            {children}
        </div>
    </>
}

export default Content