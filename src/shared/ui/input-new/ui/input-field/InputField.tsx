import {FC} from 'react';
import Balance from '../balance/Balance';
import Validator from '../validator/Validator';
import {Input as InputAntd, InputProps} from 'antd';
import PercentSelector from '../percent-selector/PercentSelector';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';
import CurrencySelector from '../currency-selector/CurrencySelector';

interface IParams {
    wrapperClassName?: string;
    onChange?: (value: string) => void;
}

const InputField: FC<IParams & InputProps> & {
    Balance: typeof Balance;
    Validator: typeof Validator;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({wrapperClassName, onChange, ...props}) => {
    return (
        <div className={wrapperClassName}>
            <InputAntd 
                {...props}
                onChange={({target}) => {
                    onChange(formatAsNumberAndDot(target.value.toString()))
                }}
                placeholder='Enter amount'
            />
        </div>
    );
}

InputField.Balance = Balance;
InputField.Validator = Validator;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
