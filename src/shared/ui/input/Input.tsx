import React, { useState } from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";

type IParams = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    allowDigits?: boolean;
    allowSymbols?: boolean;
    wrapperClassName?: string;
    suffix?: boolean;
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
      wrapperClassName,
      suffix,
      prefix,
      caption,
      value,
      name,
      placeholder,
      size = 'sm',
      ...props
    }: IParams,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {md} = useBreakpoints();

    return (
        <>
        <div
            data-size={size === null ? md : size === 'md'}
            className={`${styles.Input} ${
                wrapperClassName || ""
            } ${
                size === 'sm' ? styles.InputMobileWrapper : styles.InputDesktopWrapper
            }`}>
                <div className={styles.InputWrapper}>
                    <div className={styles.PrefixWrap}>
                        {prefix && (<span className={styles.Prefix}>{prefix}</span>
                        )}
                        <input
                            className={ size === 'sm' ? styles.InputMobile : styles.InputDesktop}
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
