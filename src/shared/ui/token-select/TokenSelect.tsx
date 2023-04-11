import React, {useMemo, useState} from 'react';
import styles from './style.module.scss';
import {Select, SelectProps} from 'antd';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';

const {Option} = Select;

interface Props {
    tokens: {
        value: string,
        label: string,
        icon: string,
        disabled?: boolean
    }[]
}

function TokenSelect({tokens, ...props}: Props & SelectProps) {
    const [value, setValue] = useState<string>(props.defaultValue || '');

    const handleChange = (val, option) => {
        setValue(val);

        if (typeof props.onChange === 'function') {
            props.onChange(val, option);
        }
    };

    const selectedToken = useMemo(() => {
        return tokens.find(item => item.value === value);
    }, [tokens, value]);




    return (
        <div className={styles.Select}>
            {selectedToken && (
                <img className={styles.SelectIcon} src={selectedToken.icon} alt={selectedToken.label}/>
            )}
            <Select
                popupClassName={styles.SelectPopup}
                style={{width: '100%'}}
                optionLabelProp="label"
                onChange={handleChange}
                suffixIcon={<IconDoubleArrows />}
                {...props}
            >
                {tokens.map(item => (
                    <Option
                        className={styles.Option}
                        value={item.value}
                        label={item.label}
                        disabled={item.disabled}
                    >
                        <span className={styles.OptionIcon} role="img" aria-label={item.label}>
                          <img src={item.icon} alt={item.label}/>
                        </span>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

export default TokenSelect;