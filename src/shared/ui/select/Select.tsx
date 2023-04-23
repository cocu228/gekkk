import styles from './style.module.scss';
import { DefaultOptionType } from 'antd/es/select';
import {ComponentType, memo, SVGProps} from 'react';
import {Select as SelectAntd, SelectProps} from 'antd';
import IconDropdownArrow from '../icons/IconDropdownArrow';
const {Option} = SelectAntd;

interface Props extends SelectProps {
    prefixIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    options?: Array<DefaultOptionType>;
}

const Select = memo<Props>(({prefixIcon: Icon, options, ...props}): JSX.Element | null => {
    return (
        <div className={styles.Select}>
            <SelectAntd
                {...props}
                dropdownStyle={{
                    padding: 0,
                    border: '1px solid var(--color-gray-400)',
                    textAlign: 'center'
                }}
                suffixIcon={
                    <div className={styles.DropdownIcon}>
                        <IconDropdownArrow/>
                    </div>
                }
            >
                {options.map((option) => (
                    <Option
                        key={option.value}
                        value={option.value}
                    >
                            {option.label}
                    </Option>
                ))}
            </SelectAntd>
        </div>
    );
});

export default Select;
