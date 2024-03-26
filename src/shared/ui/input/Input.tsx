import React from "react";
import { Input as InputAntd, InputProps, InputRef } from "antd";
import styles from "./style.module.scss";

type IParams = InputProps & {
  wrapperClassName?: string;
  onChange: any;
};

const Input = React.forwardRef(
  (
    { wrapperClassName, onChange, ...props }: IParams,
    ref: React.ForwardedRef<InputRef>
  ) => {
    const checkR = (val: any) => {
      const inpValue = val.target.value;
      const cyrillicPattern = /[а-яА-Я]/;

      if (cyrillicPattern.test(inpValue)) {
        return null;
      } else {
        onChange(val);
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
