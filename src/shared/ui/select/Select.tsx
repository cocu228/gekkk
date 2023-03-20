import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
import styles from './style.module.scss';

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const Select = memo<Props>(({prefixIcon: Icon, ...props}): JSX.Element | null => {
    return (
        <div className={`${styles.Select} ${!!Icon ? styles.withPrefix : ''} relative flex items-center`}>
            {/*<Icon className={styles.SelectPrefixIcon} style={ArrowDown} />*/}

            <SelectAntd suffixIcon={<img src={'/img/icon/ArrowDown.svg'} alt=""/>} {...props} />
        </div>
    );
});

export default Select;
