import React from 'react';
import styles from './style.module.scss';
import { IconApp } from '../icons/icon-app';

interface Props {
    onChange: (v) => void;
    children: React.ReactElement;
    className: string;
    name: string;
    defaultChecked: boolean;
    disabled?: boolean;
}

const Checkbox = ({
                      onChange,
                      children,
                      className = "",
                      name = undefined,
                      defaultChecked = false,
                      disabled = false
                  }: Partial<Props>) => {
    return (
        <label className={`${styles.Label} ${disabled ? styles.disabled : ''}`}>
            <input
                type="checkbox"
                className={styles.Input}
                name={name}
                onChange={onChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
            />
            <span className={`${styles.Checkbox} ${className}`}>
                {
                    defaultChecked && (
                        <IconApp code='t47' size={12} color='#2BAB72' />
                    )
                }
            </span>
            {children}
        </label>
    );
};

export default Checkbox;
