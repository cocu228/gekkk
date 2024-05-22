import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

interface IParams {
    children?: React.ReactNode;
    className?: string;
}

const RowWrapper = ({ children, className }: IParams) => {
    const {xl} = useContext(BreakpointsContext);

    return (
        <div
            className={className}
            style={{
                display: 'grid',
                gridTemplateColumns: `${xl ? '1fr' : '60% 40%'}`
            }}
        >
            {children}
        </div>
    )
}

export default RowWrapper;
