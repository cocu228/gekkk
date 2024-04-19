import React, {memo} from 'react';
import styles from './style.module.scss';
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)

interface Props {
    htmlType: "button" | "submit" | "reset";
    disabled: boolean;
    variant: "gray" | "darkBlue" | "whiteGreenTransfer" | "text" | "greenTransfer" | "blueTransfer" | "decline" | "program" | undefined;
    custom: boolean;
    size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
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
         variant,
         custom = false,
         ...props
     }): JSX.Element | null => {

        return (
            <button data-size={size} className={hClassName
                .while(!!className).do(className)
                .while(variant==='gray').do("Gray")
                .while(variant==='text').do("Text")
                .while(variant==='decline').do("Decline")
                .while(variant==='darkBlue').do("darkBlue")
                .while(variant==='whiteGreenTransfer').do("whiteGreenTransfer")
                .while(variant==='greenTransfer').do("GreenTransfer")
                .while(variant==='blueTransfer').do("blueTransfer")
                .while(variant==='program').do("Program")
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
