import React from "react";
import {FC} from "react";

interface IParams {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export const GTRow: FC<IParams> = ({ children, className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`grid ${className} items-center overflow-hidden`}
            style={{
                gridTemplateColumns: `repeat(${React.Children.toArray(children).length}, minmax(0, 1fr))`
            }}
        >
            {children}
        </div>
    )
}
