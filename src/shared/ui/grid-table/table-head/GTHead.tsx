import { Children, FC, ReactNode } from "react";

interface IParams {
  className?: string;
  children?: ReactNode;
}

const GTHead: FC<IParams> = ({ children, className = "" }) => (
  <div
    className={`grid text-center ${className}`}
    style={{
      gridTemplateColumns: `repeat(${Children.toArray(children).length}, minmax(0, 1fr))`
    }}
  >
    {children}
  </div>
);

export default GTHead;
