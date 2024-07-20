import { ReactElement } from "react";

import styles from "./style.module.scss";
import { IconApp } from "../icons/icon-app";

interface Props {
  onChange: (v: any) => void;
  children: ReactElement;
  className: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  onChange,
  children,
  className = "",
  name = undefined,
  checked = false,
  disabled = false
}: Partial<Props>) => (
  <label className={`${styles.Label} ${disabled ? styles.disabled : ""}`}>
    <input
      type='checkbox'
      className={styles.Input}
      name={name}
      onChange={onChange}
      defaultChecked={checked}
      disabled={disabled}
    />
    <span className={`${styles.Checkbox} ${className}`}>
      {checked ? <IconApp code='t47' size={12} color='#2BAB72' /> : null}
    </span>
    {children}
  </label>
);

export default Checkbox;
