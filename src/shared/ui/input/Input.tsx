import React from 'react';
import { Input as InputAntd, InputProps } from 'antd';
import styles from './style.module.scss';

interface Props {
    wrapperClassName?: string
}

function Input({wrapperClassName, ...props}: Props & InputProps) {
    return (
        <div className={`${styles.Input} ${wrapperClassName ? wrapperClassName : ''}`}>
            <InputAntd {...props}/>
        </div>
    );
}

export default Input;