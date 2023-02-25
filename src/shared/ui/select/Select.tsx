import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
import ArrowDown from '@public/img/icon/ArrowDown.svg';
// import ArrowDownIcon from '@/public/next-static/icons/arrow-down.svg';
import styles from './style.module.scss';

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const Select = memo<Props>(({prefixIcon: Icon, ...props}): JSX.Element | null => {
    return (
        <div className={`${styles.Select} relative flex items-center`}>
            {/*<Icon className={styles.SelectPrefixIcon} style={ArrowDown} />*/}

            <SelectAntd suffixIcon={ArrowDown} {...props} />
        </div>
    );
});

export default Select;
