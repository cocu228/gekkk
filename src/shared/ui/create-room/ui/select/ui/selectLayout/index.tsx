import { FC, ReactNode } from "react";

import styles from "../../style.module.scss";

interface ISelectLayoutProps {
  children: ReactNode;
  label?: string;
}

const SelectLayout: FC<ISelectLayoutProps> = ({ children, label }) => (
  <div className={styles.SelectLayout}>
    {label ? (
      <label className={styles.SelectLayoutTitle} htmlFor={label}>
        {label}
      </label>
    ) : null}
    {children}
  </div>
);

export default SelectLayout;
