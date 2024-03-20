import styles from './style.module.scss';
import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
import IconDropdownArrow from '../icons/IconDropdownArrow';

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    name?: string;
    isMobile?: boolean;
}

const Select = memo<Props>(({prefixIcon: Icon, ...props}): JSX.Element | null => {
    return (
        <div className={styles.Select}>
            <SelectAntd
                {...props}
                dropdownStyle={{
                    padding: 0,
                    border: '1px solid #285E69',
                    textAlign: 'center'
                }}
                suffixIcon={
                    <div className={styles.DropdownIcon}>
                        <IconDropdownArrow/>
                    </div>
                }
            />
        </div>
    );
});

export default Select;
