import Validator from '../validator/Validator';
import {Input as InputAntd, InputProps} from 'antd';
import {IconCoin} from '@/shared/ui/icons/icon-coin';
import DisplayBalance from '../balance/DisplayBalance';
import {CtxSelectorCurrency} from '../../model/context';
import {ICtxCurrencyData} from '@/processes/RootContext';
import {FC, useContext, useEffect, useState} from 'react';
import PercentSelector from '../percent-selector/PercentSelector';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';
import CurrencySelector from '../currency-selector/CurrencySelector';

interface IParams {
    wrapperClassName?: string;
    currency?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const InputField: FC<IParams & InputProps> & {
    Validator: typeof Validator;
    DisplayBalance: typeof DisplayBalance;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({
                           currency = "",
    wrapperClassName,
                           disabled = false,
    onChange,
    ...props
}) => {

    const selectorCurrency = useContext(CtxSelectorCurrency);

    // useEffect(() => {
    //     setActiveCurrency(selectorCurrency);
    // }, [selectorCurrency]);

    return (
        <div className={wrapperClassName}>
            <InputAntd
                {...props}
                disabled={disabled}
                placeholder='Enter amount'
                onChange={({target}) => {
                    onChange(formatAsNumberAndDot(target.value.toString()))
                }}
                suffix={<>{currency && <><IconCoin width={34} height={34} code={currency}/></>}
                    <span
                        className='text-gray-600 text-sm font-medium mr-[17px] select-none'>{currency}</span></>}
            />
        </div>
    );
}

InputField.Validator = Validator;
InputField.DisplayBalance = DisplayBalance;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
