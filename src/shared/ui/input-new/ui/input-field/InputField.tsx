import {FC} from 'react';
import {Input as InputAntd, InputProps} from 'antd';
import PercentSelector from '../percent-selector/PercentSelector';
import CurrencySelector from '../currency-selector/CurrencySelector';

interface IParams {
    wrapperClassName?: string
}

const InputField: FC<IParams & InputProps> & {
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({wrapperClassName, ...props}) => {
    return (
        <div className={wrapperClassName}>
            <InputAntd {...props}/>
        </div>
    );
}

InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
