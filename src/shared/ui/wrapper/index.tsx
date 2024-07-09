import {FC, PropsWithChildren} from "react";

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full min-w-[290px] max-w-[414px] mx-auto">
            {children}
        </div>
    )
}

export default Wrapper;
