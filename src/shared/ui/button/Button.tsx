import React, {memo} from 'react';
import styles from './style.module.scss';


interface Props {
    htmlType: "button" | "submit" | "reset";
    disabled: boolean;
    tabIndex: number;
    onClick: React.MouseEventHandler;
    onSubmit: React.FormEventHandler;
    children: React.ReactNode;
    className: string
}

const Button = memo<Partial<Props>>(
    ({
         children,
         htmlType = "button",
         className = '',
         ...props
     }): JSX.Element | null => {
        return (
            <button className={`${className} ${styles.Button}`}
                    type={htmlType}
                    {...props}
            >
                {children}
            </button>
        );
    },
);

export default Button;
