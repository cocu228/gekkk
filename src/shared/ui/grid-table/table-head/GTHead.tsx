import {FC} from "react";

interface IParams {
    className?: string;
    children: React.ReactNode;
}

export const GTHead: FC<IParams> = ({ children, className }) => {
    return (
        <div className={`grid text-center ${className}`}>
            {children}
        </div>
    )
}
