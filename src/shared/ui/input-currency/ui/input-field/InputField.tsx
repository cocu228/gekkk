import {FC} from 'react';
import Validator from '../validator/Validator';
import {Input as InputAntd, InputProps} from 'antd';
import {IconCoin} from '@/shared/ui/icons/icon-coin';
import DisplayBalance from '../balance/DisplayBalance';
import PercentSelector from '../percent-selector/PercentSelector';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';
import CurrencySelector from '../currency-selector/CurrencySelector';

interface IParams {
    currency?: string;
    disabled?: boolean;
    wrapperClassName?: string;
    onChange?: (value: string) => void;
}

const InputField: FC<IParams & InputProps> & {
    Validator: typeof Validator;
    DisplayBalance: typeof DisplayBalance;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({
    currency,
    wrapperClassName,
    disabled = false,
    onChange,
    ...props
}) => (
    <div className={wrapperClassName}>
        <InputAntd
            {...props}
            disabled={disabled || !currency}
            placeholder='Enter amount'
            onChange={({target}) => onChange(formatAsNumberAndDot(target.value as string))}
            suffix={<>
                {currency && <IconCoin width={34} height={34} code={currency}/>}

                <span className='text-gray-600 text-sm font-medium mr-[17px] select-none'>{currency ?? 'Select token'}</span>
            </>}
        />
    </div>
);

InputField.Validator = Validator;
InputField.DisplayBalance = DisplayBalance;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
