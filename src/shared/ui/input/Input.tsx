import React, { useState } from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import { IconApp } from "../icons/icon-app";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";

type IParams = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    allowDigits?: boolean;
    allowSymbols?: boolean;
    wrapperClassName?: string;
    eye?: boolean;
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
      eye,
      prefix,
      caption,
      value,
      name,
      placeholder,
      size = 'md',
      ...props
    }: IParams,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [eyeState, setEyeState] = useState(false)
    const {md} = useBreakpoints();

    return (
        <>
        <div
            data-size={size}
            className={`${styles.Input} ${
                wrapperClassName || ""
            } ${eye ? styles.EyeStyles : ""} ${
                size === 'md' ? styles.InputDesktopWrapper : styles.InputMobileWrapper
            }`}>
                <div className={styles.InputWrapper}>
                    <div className={styles.PrefixWrap}>
                        {prefix && (<span className={styles.Prefix}>{prefix}</span>
                        )}
                        <input
                            className={ size === 'md' ? styles.InputDesktop : styles.InputMobile}
                            type={eyeState ? 'password' : ''}
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
                    eye && (
                        <div className={styles.EyeBlock} onClick={() => setEyeState(!eyeState)}>
                            {
                                eyeState ? (
                                    <IconApp color='#285E69' size={13} code="t41"/>
                                ) : (
                                    <IconApp color='#285E69' size={13} code="t71"/>
                                )
                            }
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
