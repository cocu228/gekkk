import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface FrameItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
}

export const FrameItem: FC<FrameItemProps> = ({ children, onClick, isSelected }) => (
  <div onClick={onClick} className={`${styles.frameItem} ${isSelected && styles.frameItemSelected}`}>
    {children}
  </div>
);
