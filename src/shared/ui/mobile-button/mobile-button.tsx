import { forwardRef, ForwardedRef, ChangeEvent, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useLayoutEffect, MouseEventHandler } from 'react';
import { ButtonTypes, ButtonVariants } from './types';
import styles from './style.module.scss';

interface Props {
    wrapperClassName?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    placeholder?: string;
    type?: ButtonTypes;
    children?: ReactNode;
    varitant?: ButtonVariants;
    dataItem?: string;
}

export const MobileButton =  forwardRef((props: Props, ref:ForwardedRef<HTMLButtonElement>) => {
    const onButtonClick = (e) => {
        props.onClick(e);
    };

    const variantSelector = (variant: string | undefined) => {
        return styles[variant ?? 'default'];
    };
    return (
        <button
            data-item={props.dataItem && null}
            type={props.type}
            ref={ref} 
            className={`${styles.button} typography-ui-button-badge ${variantSelector(props.varitant)} ${props.className}`}
            onClick={onButtonClick}
            disabled={props.varitant === 'disabeled'}
        >
            {props.children}
        </button>
    );
}, )

