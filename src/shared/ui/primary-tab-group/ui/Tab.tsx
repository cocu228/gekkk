import {MouseEventHandler} from 'react';
import styles from './style.module.scss';

type TabParams = {
    children: JSX.Element | string | null,
    isActive?: boolean,
    onClick?: MouseEventHandler,
}

const Tab = ({
    children,
    isActive = false,
    onClick = undefined,
}: TabParams) => {
    return (
        <button
            className={`${styles.Tab} ${isActive && styles.ActiveTab}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Tab;
