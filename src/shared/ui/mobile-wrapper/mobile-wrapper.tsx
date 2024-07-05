import { forwardRef, ForwardedRef, ReactNode } from 'react';
import styles from './style.module.scss';

interface Props {
    children?: ReactNode;
    className?: string 
}

export const BoxWrapper =  forwardRef((props: Props, ref:ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={`${styles.wrapper} ${props.className}`}>
            {props.children}
        </div>
    );
}, )

