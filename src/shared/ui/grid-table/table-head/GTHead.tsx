import React, {FC} from "react";

interface IParams {
    className?: string;
    children?: React.ReactNode;
}

export const GTHead: FC<IParams> = ({ children, className }) => {
    return (
        <div
            className={`grid text-center ${className}`}
            style={{
                gridTemplateColumns: `repeat(${React.Children.toArray(children).length}, minmax(0, 1fr))`
            }}
        >
            {children}
        </div>
    )
}
