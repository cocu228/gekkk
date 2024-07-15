import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface SelectorButtonProps {
  isSelected: boolean;
  children: ReactNode;
}

export const SelectorButton: FC<SelectorButtonProps> = ({ isSelected, children }) => (
  <button className={`${styles.btn} ${isSelected && styles.btnSelected}`}>{children}</button>
);
