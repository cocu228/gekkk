import React, {memo} from "react";
import styles from "./style.module.scss";
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)

interface Props {
    htmlType: "button" | "submit" | "reset";
    disabled: boolean;
    variant:
        "gray"
        | "text"
        | "decline"
        | "darkBlue"
        | "blueTransfer"
        | "greenTransfer"
        | "whiteGreenTransfer"
        | undefined;
    custom: boolean;
    size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    onClick: React.MouseEventHandler;
    onSubmit: React.FormEventHandler;
    children: React.ReactNode;
    className: string | undefined
}

const Button = memo<Partial<Props>>(({
    size,
    variant,
    children,
    className,
    custom = false,
    htmlType = "button",
    ...props
}): JSX.Element | null => {
    return (
        <button
            {...props}    
            type={htmlType}
            data-size={size}
            className={hClassName
                .while(!!className).do(className)
                .while(variant==="gray").do("Gray")
                .while(variant==="text").do("Text")
                .while(variant==="decline").do("Decline")
                .while(variant==="darkBlue").do("DarkBlue")
                .while(variant==="whiteGreenTransfer").do("WhiteGreenTransfer")
                .while(variant==="greenTransfer").do("GreenTransfer")
                .while(variant==="blueTransfer").do("BlueTransfer")
                .scss(custom ? "" : "Button")
            }
        >
            {children}
        </button>
    );
});

export default Button;
