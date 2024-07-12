import { FC, PropsWithChildren } from "react";

interface IWrapperProps extends PropsWithChildren {
  isWeb?: boolean;
  className?: string;
}

const Wrapper: FC<IWrapperProps> = ({ children, isWeb = false, className = "" }) => {
  const defaultStyle = isWeb
    ? "w-full min-w-[290px] max-w-[414px] mx-auto"
    : "md:w-full md:min-w-[290px] md:max-w-[414px] md:mx-auto";

  return <div className={`${defaultStyle} ${className}`}>{children}</div>;
};

export default Wrapper;
