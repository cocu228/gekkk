import {memo, useMemo} from 'react';
import {Button as ButtonAntd, ButtonProps} from 'antd';
import styles from './style.module.scss';

export interface Props extends ButtonProps {
    cancel?: boolean;
    ghost?: boolean;
    gradient?: boolean;
    light?: boolean;
    gray?: boolean;
}

const Button = memo<Props>(
    ({
        type: typeProp,
        size,
        cancel = false,
        ghost = false,
        gradient = false,
        light = false,
        gray = false,
        children,
        className = '',
        ...props
    }): JSX.Element | null => {
        const type = useMemo(() => (cancel ? 'default' : typeProp), [cancel, typeProp]);

        return (
            <ButtonAntd
                className={`${className} ${styles.Button} ${
                    typeof props.icon !== 'undefined' && type !== 'link' ? styles.WithIcon : ''
                } ${
                    cancel
                        ? styles.Cancel
                        : ghost
                        ? styles.Ghost
                        : gradient
                        ? styles.Gradient
                        : light
                        ? styles.Light
                        : gray
                        ? styles.Gray
                        : ''
                }`}
                type={type}
                size={size}
                {...props}
            >
                {children}
            </ButtonAntd>
        );
    },
);

export default Button;
