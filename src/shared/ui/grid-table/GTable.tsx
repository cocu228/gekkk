import React, {FC} from "react";

import GTCol from '@/shared/ui/grid-table/table-column/GTCol';
import GTRow from "@/shared/ui/grid-table/table-row/GTRow";
import GTBody from "@/shared/ui/grid-table/table-body/GTBody";
import GTHead from "@/shared/ui/grid-table/table-head/GTHead";

interface IParams {
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const GTable: FC<IParams> & {
    Body: typeof GTBody;
    Row: typeof GTRow;
    Col: typeof GTCol;
    Head: typeof GTHead;
} = ({children, style, className}) => {
    return (
        <div style={style} className={`grid ${className}`}>
            {children}
        </div>
    )
}


GTable.Row = GTRow
GTable.Col = GTCol
GTable.Body = GTBody
GTable.Head = GTHead

export default GTable
