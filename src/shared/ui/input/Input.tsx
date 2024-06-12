import React, {MutableRefObject, useState} from "react";
import styles from "./style.module.scss";
import {validateInput} from "./model/helpers";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";

type IParams = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    allowDigits?: boolean,
    allowSymbols?: boolean,
    className?: string,
    suffix?: React.ReactNode,
    caption?: string,
    size?: 'md' | 'sm',
    value?: string,
    name?: string,
    placeholder?: string,
    prefix?: React.ReactNode,
    disabled?: boolean,
    type?: string,
    onInput?: (event: React.FormEvent) => void
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
            disabled,
            type,
            onInput,
            ...props
        }: IParams,
        ref: MutableRefObject<any>
    ) => {
        const {md} = useBreakpoints();
        const inputSize = size || (md ? 'sm' : 'md');

        const [showCaption, setShowCaption] = useState(true);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (validateInput(event, allowDigits, allowSymbols)) {
                onChange(event);
                setShowCaption(event.target.value.length === 0);
            }
        };
        return (
            <>
                <div
                    data-size={inputSize}
                    className={`${styles.Input} ${
                        className || ""
                    }${inputSize === 'md' ? styles.InputDesktopWrapper : styles.InputMobileWrapper}`}>
                    <div className={styles.PrefixWrap}>
                        {prefix && (<span className={styles.Prefix}>{prefix}</span>
                        )}
                        <input
                            className={inputSize === 'md' ? styles.InputDesktop : styles.InputMobile}
                            {...props}
                            type={type}
                            onInput={onInput}
                            ref={ref}
                            disabled={disabled}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={handleChange}
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
                {caption && showCaption ? <div className='display: flex ml-[10px]'>
                    <text className={styles.Caption}>*{caption}</text>
                </div> : ''}
            </>
        );
    }
);

export default Input;
