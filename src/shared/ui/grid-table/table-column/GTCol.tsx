import React, { FC } from "react";

interface IParams {
  className?: string;
  children?: React.ReactNode;
  hidden?: boolean;
}

const GTCol: FC<IParams> = ({ children, className = "" }) => <div className={className}>{children}</div>;

export default GTCol;
