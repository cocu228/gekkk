import {FC} from 'react';
import Balance from '../balance/Balance';
import Validator from '../validator/Validator';
import {Input as InputAntd, InputProps} from 'antd';
import {IconCoin} from '@/shared/ui/icons/icon-coin';
import {ICtxCurrencyData} from '@/processes/RootContext';
import PercentSelector from '../percent-selector/PercentSelector';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';
import CurrencySelector from '../currency-selector/CurrencySelector';

interface IParams {
    wrapperClassName?: string;
    currencyData?: ICtxCurrencyData;
    onChange?: (value: string) => void;
}

const InputField: FC<IParams & InputProps> & {
    Balance: typeof Balance;
    Validator: typeof Validator;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({
    currencyData,
    wrapperClassName,
    onChange,
    ...props
}) => {
    return (
        <div className={wrapperClassName}>
            <InputAntd 
                {...props}
                placeholder='Enter amount'
                onChange={({target}) => {
                    onChange(formatAsNumberAndDot(target.value.toString()))
                }}
                suffix={<>
                    {currencyData && <>
                        <IconCoin width={34} height={34} code={currencyData.currency}/>
                    </>}

                    <span className='text-gray-600 text-sm font-medium mr-[17px] select-none'>
                        {!currencyData ? 'Select token' : currencyData.currency}
                    </span>
                </>}
            />
        </div>
    );
}

InputField.Balance = Balance;
InputField.Validator = Validator;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
