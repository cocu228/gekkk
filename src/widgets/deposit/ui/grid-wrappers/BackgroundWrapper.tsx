import { useContext } from "react";
import RowWrapper from "./ColumnWrapper";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

interface IParams {
    children?: React.ReactNode
}

const BackgroundWrapper = ({ children }: IParams) => {
    const { xl } = useContext(BreakpointsContext);

    return (
        <div className="wrapper relative">
            <div className="wrapper grid w-full z-20 relative">
                {children}
            </div>

            <RowWrapper className="wrapper absolute top-0 w-full left-0 h-full">
                <div className="substrate z-10 w-inherit relative" />

                {!xl && (
                    <div className="substrate z-0 -ml-4 h-full" />
                )}
            </RowWrapper>
        </div>
    )
}

export default BackgroundWrapper;
