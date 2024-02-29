import { forwardRef, ForwardedRef, ReactNode, ChangeEvent } from 'react';
import styles from './style.module.scss';

interface Props {
    wrapperClassName?: string;
    className?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const MobileInput =  forwardRef((props: Props, ref:ForwardedRef<HTMLInputElement>) => {
    

    return (
        <div className={`${styles.inputWrapper} ${props.wrapperClassName}`}>
            <input 
                type="text" 
                ref={ref} 
                className={`${styles.input} ${props.className}`}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                disabled={props?.disabled}
            />
        </div>
    );
}, )

