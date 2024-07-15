import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface ShowBarItemProps {
  isSelected: boolean;
  children: ReactNode;
}

export const ShowBarItem: FC<ShowBarItemProps> = ({ isSelected, children }) => (
  <button className={`${styles.btn} ${isSelected && styles.btnSelected}`}>{children}</button>
);
