import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
import styles from './style.module.scss';
import IconDropdownArrow from '../icons/IconDropdownArrow';

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const Select = memo<Props>(({prefixIcon: Icon, ...props}): JSX.Element | null => {
    return (
        <div className={styles.Select}>
            <SelectAntd
                {...props}
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
