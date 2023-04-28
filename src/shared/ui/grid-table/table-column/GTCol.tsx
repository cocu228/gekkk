import React from "react";
import {FC} from "react";

interface IParams {
    className?: string;
    children: React.ReactNode;
}

export const GTCol: FC<IParams> = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
