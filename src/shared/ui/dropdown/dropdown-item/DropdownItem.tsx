import React, {PropsWithChildren, useState} from 'react';
import styles from './style.module.scss';

interface Props {
    icon?: React.ReactNode,
    onClick: () => void
}

function DropdownItem({icon, children, onClick}: PropsWithChildren<Props>) {
    return (
        <button
            className={`flex items-center gap-1.5 p-3 text-sm font-medium ${styles.DropdownItem}`}
            onClick={onClick}
        >
            {icon && (
                <i className={"inline-flex"}>{icon}</i>
            )}
            <span>
                {children}
            </span>
        </button>
    );
}

export default DropdownItem;