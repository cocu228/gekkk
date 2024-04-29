import React from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import { Input as InputAntd, InputProps, InputRef } from "antd";

type IParams = InputProps & {
  allowDigits?: boolean;
  allowSymbols?: boolean;
  wrapperClassName?: string;
};

const Input = React.forwardRef(
  (
    {
      onChange,
      allowDigits,
      allowSymbols,
      wrapperClassName,
      ...props
    }: IParams,
    ref: React.ForwardedRef<InputRef>
  ) => {
    return (
      <div 
        className={`${styles.Input} ${
          wrapperClassName ? wrapperClassName : ""
        }`}
      >
        <InputAntd
          {...props}
          ref={ref}
          onChange={(event) => {
            if (validateInput(event, allowDigits, allowSymbols)) {
              onChange(event);
            }
          }}
        />
      </div>
    );
  }
);

export default Input;
