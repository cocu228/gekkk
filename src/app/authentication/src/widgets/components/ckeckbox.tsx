import { IconApp } from './IconApp';
import styles from './checkbox.module.css';
import { Checkbox as HeadlessCheckbox } from '@headlessui/react';

interface IParams {
    id?: string;
    name?: string;
    checked?: boolean;
    className?: string;
    onChange?: (checked: boolean) => void;
}

const Checkbox = ({id, name, className, checked, onChange}: IParams) => {
    return (
        <HeadlessCheckbox
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className={`${styles.Checkbox} ${className}`}
        >
            <IconApp
                lib={2}
                code='t47'
                color='var(--gek-additional)'
                className={checked ? styles.IconActive : styles.Icon}
            />
        </HeadlessCheckbox>
    );
}

export default Checkbox;
