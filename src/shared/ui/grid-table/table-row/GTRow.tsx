import React from "react";
import {FC} from "react";

type HideableReactNode = React.ReactNode & {hidden?: boolean};

interface IParams {
    className?: string;
    children: HideableReactNode;
    onClick?: () => void;
}

export const GTRow: FC<IParams> = ({ children, className, onClick }) => {
    let filteredChildren: React.ReactNode = React.Children.toArray(children)
        .filter((child: HideableReactNode) => !child['props'].hidden);

    return (
        <div
            onClick={onClick}
            className={`grid ${className} items-center overflow-hidden`}
            style={{
                gridTemplateColumns: `repeat(${React.Children.toArray(filteredChildren).length}, minmax(0, 1fr))`
            }}
        >
            {filteredChildren}
        </div>
    )
}
