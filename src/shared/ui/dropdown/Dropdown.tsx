import React, {PropsWithChildren} from 'react';
import {Dropdown as AntdDropdown} from 'antd';
import type { MenuProps } from 'antd';
import styles from './style.module.scss';
import IconDropdownArrow from '@/shared/ui/icons/IconDropdownArrow';

interface Props {
    className?: string,
    isOpen?: boolean,
    onOpen?: (value: boolean) => void | undefined,
    trigger: React.ReactNode,
    items?: MenuProps['items'],
}

function Dropdown({className, trigger, items, children, onOpen, isOpen}: PropsWithChildren<Props>) {

    const onOpenChange = (value: boolean) => {
        onOpen(value)
    }

    return (
        <AntdDropdown
            className={className}
            menu={{ items }}
            dropdownRender={(menu) => (
                <div className={styles.DropdownContent}>
                    {React.cloneElement(menu as React.ReactElement, {style: {boxShadow: 'none'}})}
                    {children}
                </div>
            )}
            onOpenChange={onOpen !== undefined ? onOpenChange : () => null}
            trigger={['click']}
        >
            <span className="inline-flex items-center gap-1 cursor-pointer">
                {trigger}
                {onOpen !== undefined && <i className={`inline-flex ${isOpen ? 'rotate-180' : ''}`}>
                    <IconDropdownArrow/>
                </i>}
            </span>
        </AntdDropdown>
    );
}

export default Dropdown;
