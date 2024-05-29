import React, { useState } from "react";
import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";
import { IconApp } from "../icons/icon-app";

type IParams = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    allowDigits?: boolean;
    allowSymbols?: boolean;
    wrapperClassName?: string;
    tranfers?: boolean;
    eye?: boolean;
    caption?: string;
    prefix?: React.ReactNode
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
      prefix,
      caption,
      ...props
    }: IParams,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [eyeState, setEyeState] = useState(false)

    return (
        <>
            <div
                className={`${styles.Input} ${
                    wrapperClassName ? wrapperClassName : ""
                } ${tranfers && styles.TransfersInput} ${eye && styles.EyeStyles}`}
            >
                <div className={styles.InputWrapper}>
                    <div className={styles.PrefixWrap}>
                        {prefix && (<span className={styles.Prefix}>{prefix}</span>
                        )}
                        <input
                            className={styles.InputWrap}
                            type={eyeState ? 'password' : ''}
                            {...props}
                            ref={ref}
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
