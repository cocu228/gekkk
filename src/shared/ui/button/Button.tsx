import React, {memo} from 'react';
import styles from './style.module.scss';
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)

interface Props {
    htmlType: "button" | "submit" | "reset";
    disabled: boolean;
    text: boolean;
    custom: boolean;
    program: boolean;
    gray: boolean;
    red: boolean;
    darkBlue: boolean;
    whiteGreenTransfer:boolean;
    greenTransfer:boolean;
    blueTransfer:boolean;
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
         program = false,
         gray = false,
         red = false,
         darkBlue = false,
         custom = false,
         text = false,
         whiteGreenTransfer = false,
         greenTransfer = false,
         blueTransfer = false,
         ...props
     }): JSX.Element | null => {
        return (
            <button data-size={size} className={hClassName
                .while(!!className).do(className)
                .while(gray).do("Gray")
                .while(red).do("Red")
                .while(text).do("Text")
                .while(darkBlue).do("darkBlue")
                .while(whiteGreenTransfer).do("whiteGreenTransfer")
                .while(greenTransfer).do("GreenTransfer")
                .while(blueTransfer).do("blueTransfer")
                .while(program).do("Program")
                .scss(custom ? "" : "Button")}
                    type={htmlType}
                    {...props}
            >
                {children}
            </button>
        );
    },
);

export default Button;
