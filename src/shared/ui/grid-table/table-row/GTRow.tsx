import React from "react";
import {FC} from "react";

interface IParams {
    className: string;
    children: React.ReactNode;
    cols: number;
    onClick: () => void;
}

const GTRow: FC<Partial<IParams>> = ({children, className, onClick, cols = null}) => {

    const gridTemplateColumns = cols ? `repeat(${cols}, minmax(0, 1fr))` : `repeat(${React.Children.toArray(children).length}, minmax(0, 1fr))`

    return (
        <div
            onClick={onClick}
            className={`grid ${className} items-center`}
            style={{
                gridTemplateColumns
            }}
        >
            {children}
        </div>
    )
}

export default GTRow
