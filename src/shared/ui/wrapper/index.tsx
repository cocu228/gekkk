import {FC, PropsWithChildren} from "react";

interface IWrapperProps extends PropsWithChildren {
    className?: string;
}

const Wrapper: FC<IWrapperProps> = ({ children, className = "" }) => {
    return (
        <div className={`md:w-full md:min-w-[290px] md:max-w-[414px] md:mx-auto ${className}`}>
            {children}
        </div>
    )
}

export default Wrapper;
