import React, { useState } from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";

type IParams = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    allowDigits?: boolean;
    allowSymbols?: boolean;
    className?: string;
    suffix?: React.ReactNode;
    caption?: string;
    size?: 'sm' | 'md';
    value?: string;
    name?: string;
    placeholder?: string;
    prefix?: React.ReactNode;
};

const Input = React.forwardRef(
  (
    {
      onChange,
      allowDigits,
      allowSymbols,
      className,
      suffix,
      prefix,
      caption,
      value,
      name,
      placeholder,
      size,
      ...props
    }: IParams,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {md} = useBreakpoints();
    const inputSize = size || (md ? 'md' : 'sm');
    return (
        <>
        <div
            data-size={inputSize}
            className={`${styles.Input} ${
                className || ""
            }${inputSize === 'sm' ? styles.InputDesktopWrapper : styles.InputMobileWrapper}`}>
                    <div className={styles.PrefixWrap}>
                        {prefix && (<span className={styles.Prefix}>{prefix}</span>
                        )}
                        <input
                            className={ inputSize === 'sm' ? styles.InputDesktop : styles.InputMobile}
                            {...props}
                            ref={ref}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={(event) => {
                                if (validateInput(event, allowDigits, allowSymbols)) {
                                    onChange(event);
                                }
                            }}
                        />
                    </div>
                {
                    suffix && (
                        <div className={styles.SuffixBlock}>
                            {suffix}
                        </div>
                    )
                }
            </div>
            {caption && (<text className={styles.Caption}>{caption}</text>)}
        </>
    );
  }
);

export default Input;
