import styles from './style.module.scss';
import {Select, SelectProps} from 'antd';
import {IconCoin} from '../icons/icon-coin';
import {useContext, useMemo, useState} from 'react';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import {CtxRootData, ICtxCurrencyData } from '@/processes/RootContext';

const {Option} = Select;

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
            return Object.values(allowedFlags).some(f => asset.flags[f]);
        }

        return true;
    }

    const handleChange = (val, option) => {
        setValue(val);

        if (props.onChange) props.onChange(val, option);
    };

    const currency: ICtxCurrencyData = useMemo(() => {
        return currencies.get(value);
    }, [currencies, value]);

    return (
        <div className={styles.Select}>
            {currency && (
                <IconCoin className={styles.SelectIcon} code={currency.$const} />
            )}
            <Select
                showSearch
                className={`${styles.SelectSearch} ${currency ? styles.SelectSearchActive : ''}`}
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
                        value={item.$const}
                        label={item.name}
                        disabled={disabledCurrencies?.includes(item.$const)}
                    >
                        <span className={styles.OptionIcon} role="img" aria-label={item.name}>
                            <IconCoin code={item.$const} />
                        </span>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

export default TokenSelect;
