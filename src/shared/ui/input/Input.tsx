import React from "react";
import { Input as InputAntd, InputProps, InputRef } from "antd";
import styles from "./style.module.scss";

type IParams = InputProps & {
  wrapperClassName?: string;
  onChange: any;
  onlyLetters?: boolean;
};

const Input = React.forwardRef(
  (
    { wrapperClassName, onChange, onlyLetters, ...props }: IParams,
    ref: React.ForwardedRef<InputRef>
  ) => {
    const checkR = (val: any) => {
      const inpValue = val.target.value;
      const strongPattern = /[а-яА-Я0-9@!#$%^&*()_+-='";:><,./`~]/;
      const lightPattern = /[а-яА-Я]/;

      if (onlyLetters) {
        if (strongPattern.test(inpValue)) {
          return null;
        } else {
          onChange(val);
        }
      } else {
        if (lightPattern.test(inpValue)) {
          return null;
        } else {
          onChange(val);
        }
      }
    };

    return (
      <div
        className={`${styles.Input} ${
          wrapperClassName ? wrapperClassName : ""
        }`}
      >
        <InputAntd
          ref={ref}
          onChange={(value) => {
            checkR(value);
          }}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
