import { Children, FC, ReactNode } from "react";

interface IParams {
  cols: number;
  className: string;
  children: ReactNode;
  customTemplateColumns?: string;
  onClick: () => void;
}

const GTRow: FC<Partial<IParams>> = ({ onClick, children, className, cols = null, customTemplateColumns }) => {
  const standartColumnsTemplate = cols
    ? `repeat(${cols}, minmax(0, 1fr))`
    : `repeat(${Children.toArray(children).length}, minmax(0, 1fr))`;

  return (
    <div
      onClick={onClick}
      className={`grid ${className} items-center`}
      style={{
        gridTemplateColumns: customTemplateColumns ?? standartColumnsTemplate
      }}
    >
      {children}
    </div>
  );
};

export default GTRow;
