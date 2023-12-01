import {FC, PropsWithChildren, useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import styles from "./style.module.scss"
import Footer from "@/widgets/footer";

const Main: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {
    const {md, sm} = useContext(BreakpointsContext)
    console.log('(8) Main')

    return <>
        <main className={styles.Main}>
            {children}
        </main>
        {(sm || md) && <Footer textAlight={"text-center"}/>}
    </>
}

export default Main