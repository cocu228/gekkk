import React, { useState } from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import { Input as InputAntd, InputProps, InputRef } from "antd";
import { IconApp } from "../icons/icon-app";

type IParams = InputProps & {
  allowDigits?: boolean;
  allowSymbols?: boolean;
  wrapperClassName?: string;
  tranfers?:boolean
  eye?:boolean
};

const Input = React.forwardRef(
  (
    {
      onChange,
      allowDigits,
      allowSymbols,
      wrapperClassName,
      tranfers = false,
      eye,
      ...props
    }: IParams,
    ref: React.ForwardedRef<InputRef>
  ) => {
    const [eyeState, setEyeState] = useState(false)

    return (
      <div 
        className={`${styles.Input} ${
          wrapperClassName ? wrapperClassName : ""
        } ${tranfers && styles.TransfersInput} ${eye && styles.EyeStyles}`}
      >
        <InputAntd
          type={eyeState ? 'password' : ''}
          {...props}
          ref={ref}
          onChange={(event) => {
            if (validateInput(event, allowDigits, allowSymbols)) {
              onChange(event);
            }
          }}
        />
        {
          eye && (
            <div className={styles.EyeBlock} onClick={() => setEyeState(!eyeState)} >
              <IconApp color='#285E69' size={13} code="t41" />
            </div>
          )
        }
      </div>
    );
  }
);

export default Input;
