import React, {memo} from 'react';
import styles from './style.module.scss';
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)

interface Props {
    htmlType: "button" | "submit" | "reset";
    disabled: boolean;
    text: boolean;
    gray: boolean;
    size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    tabIndex: number;
    onClick: React.MouseEventHandler;
    onSubmit: React.FormEventHandler;
    children: React.ReactNode;
    className: string | undefined
}

const Button = memo<Partial<Props>>(
    ({
         children,
         htmlType = "button",
         className,
         size,
         gray = false,
         text = false,
         ...props
     }): JSX.Element | null => {
        return (
            <button data-size={size} className={hClassName
                .while(!!className).do(className)
                .while(gray).do("Gray")
                .while(text).do("Text")
                .scss("Button")}
                    type={htmlType}
                    {...props}
            >
                {children}
            </button>
        );
    },
);

export default Button;
