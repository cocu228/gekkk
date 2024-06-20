import { forwardRef, ForwardedRef, ChangeEvent } from "react";

import styles from "./style.module.scss";

interface Props {
  wrapperClassName?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MobileInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => (
  <div className={`${styles.inputWrapper} ${props.wrapperClassName}`}>
    <input
      type='text'
      ref={ref}
      className={`${styles.input} ${props.className} typography-b1`}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      disabled={props?.disabled}
    />
  </div>
));
