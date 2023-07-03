import React from 'react';
import { Input as InputAntd, InputProps, InputRef } from 'antd';
import styles from './style.module.scss';

interface Props {
    wrapperClassName?: string;
    ref?: React.Ref<InputRef>;
}

function Input({wrapperClassName, ref, ...props}: Props & InputProps) {
    return (
        <div className={`${styles.Input} ${wrapperClassName ? wrapperClassName : ''}`}>
            <InputAntd ref={ref} {...props}/>
        </div>
    );
}

export default Input;
