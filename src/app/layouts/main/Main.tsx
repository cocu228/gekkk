import {FC, PropsWithChildren} from "react";
// import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import styles from "./style.module.scss"

const Main: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {
    // const {md} = useContext(BreakpointsContext)
    return <>
        <main className={styles.Main}>
            {children}
        </main>
    </>
}

export default Main