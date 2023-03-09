import {FC, PropsWithChildren, useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import styles from "./main.module.scss"

const Main: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {
    const {sm} = useContext(BreakpointsContext)

    return <>
        <main className={sm ? styles.Mobile : styles.Desktop}>
            {children}
        </main>
    </>
}

export default Main