import React from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import { Input as InputAntd, InputProps, InputRef } from "antd";

type IParams = InputProps & {
  allowDigits?: boolean;
  allowSymbols?: boolean;
  wrapperClassName?: string;
  tranfers?:boolean
};

const Input = React.forwardRef(
  (
    {
      onChange,
      allowDigits,
      allowSymbols,
      wrapperClassName,
      tranfers = false,
      ...props
    }: IParams,
    ref: React.ForwardedRef<InputRef>
  ) => {
    return (
      <div 
        className={`${styles.Input} ${
          wrapperClassName ? wrapperClassName : ""
        } ${tranfers && styles.TransfersInput}`}
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
