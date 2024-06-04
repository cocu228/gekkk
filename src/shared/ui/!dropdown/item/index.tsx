import {FC, ReactNode} from 'react'
import style from './styles.module.scss'

interface DropdownCItemProps {
    className?: string;
    onClick: () => void;
    children: ReactNode;
    icon?: React.ReactNode,
}

export const DropdownCItem:FC<DropdownCItemProps> = ({onClick, className, children, icon}) => {
    return (
        <button
            className={`flex items-center gap-1.5 p-3 text-sm font-medium ${style.DropdownItem} ${className}`}
            onClick={onClick}
        >
            {icon && (
                <i className={"inline-flex"}>{icon}</i>
            )}
            <div className='flex w-full'>
                {children}
            </div>
        </button>
    )
}