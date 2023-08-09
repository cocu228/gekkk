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
    currencyData?: ICtxCurrencyData;
    onChange: (value: string) => void;
}

const InputField: FC<IParams & InputProps> & {
    Validator: typeof Validator;
    DisplayBalance: typeof DisplayBalance;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({
    currencyData,
    wrapperClassName,
    onChange,
    ...props
}) => {

    const selectorCurrency = useContext(CtxSelectorCurrency);

    const [activeCurrency, setActiveCurrency] = useState(currencyData);

    useEffect(() => {
        setActiveCurrency(selectorCurrency);
    }, [selectorCurrency]);

    useEffect(() => {
        setActiveCurrency(currencyData);
    }, [currencyData])

    return (
        <div className={wrapperClassName}>
            <InputAntd
                {...props}
                disabled={!activeCurrency}
                placeholder='Enter amount'
                onChange={({target}) => {
                    onChange(formatAsNumberAndDot(target.value.toString()))
                }}
                suffix={<>{activeCurrency && <><IconCoin width={34} height={34} code={activeCurrency.currency}/></>}
                    <span
                        className='text-gray-600 text-sm font-medium mr-[17px] select-none'>{!activeCurrency ? 'Select token' : activeCurrency.currency}</span></>}
            />
        </div>
    );
}

InputField.Validator = Validator;
InputField.DisplayBalance = DisplayBalance;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
