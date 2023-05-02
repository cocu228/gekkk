import {FC} from "react";
import Loader from "../../loader";

interface IParams {
    className?: string;
    children: React.ReactNode;
    loading?: boolean;
}

export const GTBody: FC<IParams> = ({ children, className, loading  }) => {
    return (
        <div className={`grid ${className}`}>
            {!loading ? children : (
                <Loader className="relative align-middle"/>
            )}
        </div>
    )
}
