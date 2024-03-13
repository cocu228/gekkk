import React, {PropsWithChildren, useState} from 'react';
import styles from './style.module.scss';

interface Props {
    className?: string;
    icon?: React.ReactNode,
    onClick: () => void
}

function DropdownItem({className, icon, children, onClick}: PropsWithChildren<Props>) {
    return (
        <button
            className={`flex items-center gap-1.5 p-3 text-sm font-medium ${styles.DropdownItem} ${className}`}
            onClick={onClick}
        >
            {icon && (
                <i className={"inline-flex"}>{icon}</i>
            )}
            <div className='flex w-full'>
                {children}
            </div>
        </button>
    );
}

export default DropdownItem;