import React, { useContext, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { Select, SelectProps } from 'antd';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import { CtxRootData, ICtxCurrencyData } from '@/app/RootContext';
import { IconCoin } from '../icons/icon-coin';
import { CurrencyFlags, maskCurrencyFlags } from '@/shared/config/mask-currency-flags';
import { getFlagsFromMask } from '@/shared/lib/helpers';

const { Option } = Select;

interface IParams {
    allowedFlags?: Array<CurrencyFlags>;
    disabledCurrencies?: Array<string>;
}

function TokenSelect({ disabledCurrencies, allowedFlags, ...props }: IParams & SelectProps) {
    const {
        currencies
    } = useContext(CtxRootData);
    const [value, setValue] = useState<string>(props.value);

    const assetsFilter = (asset: ICtxCurrencyData) => {
        if (allowedFlags) {
            const flags = getFlagsFromMask(asset.flags, maskCurrencyFlags);
            return Object.values(allowedFlags).some(f => flags[f]);
        }

        return true;
    }

    const handleChange = (val, option) => {
        setValue(val);

        if (props.onChange) props.onChange(val, option);
    };

    const selectedToken: ICtxCurrencyData = useMemo(() => {
        return currencies.get(value);
    }, [currencies, value]);

    return (
        <div className={styles.Select}>
            {selectedToken && (
                <IconCoin className={styles.SelectIcon} code={selectedToken.currency} />
            )}
            <Select
                showSearch
                className={`${styles.SelectSearch} ${selectedToken ? styles.SelectSearchActive : ''}`}
                popupClassName={styles.SelectPopup}
                style={{width: '100%'}}
                optionLabelProp="label"
                filterOption={(input, option) =>  
                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 
                    || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={handleChange}
                suffixIcon={<IconDoubleArrows />}
                {...props}
            >
                {Array.from(currencies.values())
                    .filter(assetsFilter)
                    .map(item => (
                    <Option
                        className={styles.Option}
                        value={item.currency}
                        label={item.name}
                        disabled={disabledCurrencies?.includes(item.currency)}
                    >
                        <span className={styles.OptionIcon} role="img" aria-label={item.name}>
                            <IconCoin code={item.currency} />
                        </span>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

export default TokenSelect;
