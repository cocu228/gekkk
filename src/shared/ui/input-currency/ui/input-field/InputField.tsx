import React, {ChangeEventHandler, FC, useContext} from 'react';
import Validator from '../validator/Validator';
import {Input as InputAntd, InputProps} from 'antd';
import {IconCoin} from '@/shared/ui/icons/icon-coin';
import DisplayBalance from '../balance/DisplayBalance';
import PercentSelector from '../percent-selector/PercentSelector';
import CurrencySelector from '../currency-selector/CurrencySelector';
import {CtxInputCurrencyOptions, CtxInputCurrencyValid} from "@/shared/ui/input-currency/model/context";
import { useTranslation } from 'react-i18next';

interface IParams {
    currency?: string;
    disabled?: boolean;
    value: string;
    wrapperClassName?: string;
    className?: string;
    onChange: (value: string) => void;
}

const InputField: FC<IParams & Omit<InputProps, "onChange">> & {
    Validator: typeof Validator;
    DisplayBalance: typeof DisplayBalance;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({currency, value, wrapperClassName, disabled = false, className, onChange, ...props}: IParams) => {

    const inputCurrencyValid = useContext(CtxInputCurrencyValid);
    const {t} = useTranslation();

    return <div className={wrapperClassName}>
        <InputAntd
            {...props}
            className={`${inputCurrencyValid ? "!border-red-800" : "border-gray-400"} ${className}`}
            disabled={disabled || !currency}
            value={value}
            placeholder={t("exchange.enter_amount")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                const value: string = event.target.value
                onChange(value)
            }}
            suffix={<>
                {currency && <IconCoin width={34} height={34} code={currency}/>}
                
                <span className='text-gray-600 text-sm font-medium mr-[17px] select-none'>
                    {currency ?? 'Select a token'}
                </span>
            </>}
        />
    </div>
};

InputField.Validator = Validator;
InputField.DisplayBalance = DisplayBalance;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
