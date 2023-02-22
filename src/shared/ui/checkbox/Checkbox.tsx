import React from 'react';
import styles from './style.module.scss';

interface Props {
    onChange: () => void;
    children: React.ReactElement;
    className: string;
    name: string;
    defaultChecked: boolean;
}

const Checkbox = ({
                      onChange,
                      children,
                      className = "",
                      name = undefined,
                      defaultChecked = false
                  }: Partial<Props>) => {
    return (
        <label className={styles.Label}>
            <input
                type="checkbox"
                className={styles.Input}
                name={name}
                onChange={onChange}
                defaultChecked={defaultChecked}
            />
            <span className={`${styles.Checkbox} ${className}`}/>
            {children}
        </label>
    );
};

export default Checkbox;
