import {FC, PropsWithChildren, useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Content: FC<PropsWithChildren<unknown>> = ({children}): JSX.Element | null => {

    return <>
        <div className="flex">
            {children}
        </div>
    </>
}

export default Content