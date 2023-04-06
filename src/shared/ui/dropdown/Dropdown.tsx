import React, {PropsWithChildren, useState} from 'react';
import {Dropdown as AntdDropdown} from 'antd';
import type { MenuProps } from 'antd';
import styles from './style.module.scss';
import IconDropdownArrow from '@/shared/ui/icons/IconDropdownArrow';

interface Props {
    trigger: React.ReactNode,
    items?: MenuProps['items'],
}

function Dropdown({trigger, items, children}: PropsWithChildren<Props>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <AntdDropdown
            menu={{ items }}
            dropdownRender={(menu) => (
                <div className={styles.DropdownContent}>
                    {React.cloneElement(menu as React.ReactElement, {style: {boxShadow: 'none'}})}
                    {children}
                </div>
            )}
            trigger={['click']}
            onOpenChange={handleOpenChange}
        >
            <span className="inline-flex items-center gap-1 cursor-pointer">
                {trigger}
                <i className={`inline-flex ${isOpen ? 'rotate-180' : ''}`}>
                    <IconDropdownArrow/>
                </i>
            </span>
        </AntdDropdown>
    );
}

export default Dropdown;