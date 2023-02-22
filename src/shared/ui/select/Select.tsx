import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
// import {inputIconStyle} from '@/components/icons';

// import ArrowDownIcon from '@/public/next-static/icons/arrow-down.svg';

import styles from './style.module.scss';

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const Select = memo<Props>(({prefixIcon: Icon, ...props}): JSX.Element | null => {
    return (
        <div className={`${styles.Select} position-relative d-flex align-items-center`}>
            {/*<Icon className={styles.SelectPrefixIcon} style={inputIconStyle} />*/}

            {/*<SelectAntd suffixIcon={<ArrowDownIcon />} {...props} />*/}
        </div>
    );
});

export default Select;
