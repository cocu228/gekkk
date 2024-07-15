import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  leftColumn?: ReactNode;
  rightColumn?: ReactNode;
}

function SplitGrid({ leftColumn, rightColumn }: Props) {
  return (
    <div className={`flex xxxl:flex-col ${styles.SplitGrid}`}>
      {leftColumn && <div className={`flex-1 ${styles.Left}`}>{leftColumn}</div>}
      {rightColumn && <div className='flex-1'>{rightColumn}</div>}
    </div>
  );
}

export default SplitGrid;
