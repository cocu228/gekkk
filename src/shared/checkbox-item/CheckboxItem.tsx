import React from 'react';
import styles from './style.module.scss';

interface Props {
    onChange: (checked: boolean, type: string | null) => void;
    title: string;
    type?: string | null;
    defaultChecked?: boolean;
}

const CheckboxItem = ({onChange, title, type = null, defaultChecked = false}: Props) => {
    return (
        <label className={styles['Checkbox']}>
            <input
                type="checkbox"
                className={styles['Input']}
                onChange={(e) => onChange(e.target.checked, type)}
                defaultChecked={defaultChecked}
            />
            <span className={styles['Title']}>{title}</span>
        </label>
    );
};

export default CheckboxItem;
