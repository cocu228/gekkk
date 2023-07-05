import React from 'react';
import { Input as InputAntd, InputProps, InputRef } from 'antd';
import styles from './style.module.scss';

type IParams = InputProps & {
    wrapperClassName?: string;
}

const Input = React.forwardRef((
    {wrapperClassName, ...props}: IParams,
    ref: React.ForwardedRef<InputRef>
) => {
    return (
        <div className={`${styles.Input} ${wrapperClassName ? wrapperClassName : ''}`}>
            <InputAntd ref={ref} {...props}/>
        </div>
    );
});

export default Input;
