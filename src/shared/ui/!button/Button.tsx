import React, {memo} from "react";
import styles from "./style.module.scss";
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles);

interface Props {
    color: "green"
        | "gray"
        | "red"
        | "blue"
        | null;
    custom: boolean;
    disabled: boolean;
    skeleton: boolean;
    size: "sm" | "md" | "lg";
    text: string | undefined;
    className: string | undefined;
    onClick: React.MouseEventHandler;
    onSubmit: React.FormEventHandler;
    children: React.ReactNode | undefined;
    htmlType: 'button' | 'submit' | 'reset';
}

const Button = memo<Partial<Props>>(({
    text,
    children,
    className,
    size = "md",
    color="green",
    custom = false,
    skeleton = false,
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
                .while(color !== null).do(color?.charAt(0).toUpperCase() + color?.slice(1))
                .while(skeleton).do("Skeleton")
                .scss(custom ? "" : "Button")
            }
        >
            {text ? text : children}
        </button>
    );
});

export default Button;
