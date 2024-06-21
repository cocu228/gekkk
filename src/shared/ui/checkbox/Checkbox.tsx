import { ReactElement } from "react";

import styles from "./style.module.scss";

interface Props {
  onChange: (v) => void;
  children: ReactElement;
  className: string;
  name: string;
  defaultChecked: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  onChange,
  children,
  className = "",
  name = undefined,
  defaultChecked = false,
  disabled = false
}: Partial<Props>) => (
  <label className={`${styles.Label} ${disabled ? styles.disabled : ""}`}>
    <input
      type='checkbox'
      className={styles.Input}
      name={name}
      onChange={onChange}
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
    <span className={`${styles.Checkbox} ${className}`} />
    {children}
  </label>
);

export default Checkbox;
