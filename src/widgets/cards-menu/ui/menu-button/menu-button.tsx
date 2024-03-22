import { forwardRef, ForwardedRef, ChangeEvent, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useLayoutEffect, MouseEventHandler } from 'react';
import { ButtonTypes, ButtonVariants } from './types';
import styles from './style.module.scss';

interface Props {
    wrapperClassName?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    placeholder?: string;
    type?: ButtonTypes;
    children?: ReactNode;
    varitant?: ButtonVariants;
    dataItem?: string;
}

export const MenuButton =  (props: Props) => {
    

    const variantSelector = (variant: string | undefined) => {
        return styles[variant ?? 'default'];
    };
    return (
        <div
            data-item={props.dataItem || null}
            // type={props.type}
            className={`${styles.button} typography-ui-button-badge ${variantSelector(props.varitant)} ${props.className}`}
            onClick={props.onClick}
            // disabled={props.varitant === 'disabeled'}
        >
            {props.children}
        </div>
    );
};

