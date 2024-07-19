import { CSSProperties, FC, ReactNode } from "react";

import Loader from "../../loader";
import styles from "./style.module.scss";

interface IParams {
  className: string;
  children: ReactNode;
  loading: boolean;
  style: CSSProperties;
}

const GTBody: FC<Partial<IParams>> = ({ children, className, loading, style }) => (
  <div className={`grid ${className} ${styles.ItemsList}`} style={style}>
    {!loading ? children : <div className="min-h-[100px]">
      <Loader className='relative align-middle' />
    </div>}
  </div>
);

export default GTBody;
