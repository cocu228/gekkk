import {FC, PropsWithChildren, useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import styles from "./style.module.scss"
import Footer from "@/widgets/footer";
import { useMatch } from "react-router-dom";

const Main: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {
    const {md, sm} = useContext(BreakpointsContext)
    const isTransfersPage = !!useMatch("/transfers")

    return <>
        <main className={styles.Main}>
            {children}
        </main>
        {((sm || md) && !isTransfersPage) && <Footer textAlight={"text-center"}/>}
    </>
}

export default Main