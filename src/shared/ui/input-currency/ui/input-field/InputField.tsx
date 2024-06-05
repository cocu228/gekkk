import React, { FC, useContext} from 'react';
import Validator from '../validator/Validator';
import {IconCoin} from '@/shared/ui/icons/icon-coin';
import DisplayBalance from '../balance/DisplayBalance';
import PercentSelector from '../percent-selector/PercentSelector';
import CurrencySelector from '../currency-selector/CurrencySelector';
import {CtxInputCurrencyValid} from "@/shared/ui/input-currency/model/context";
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import styles from "../style.module.scss"

interface IParams {
    currency?: string;
    disabled?: boolean;
    value: string;
    wrapperClassName?: string;
    className?: string;
    onChange: (value: string) => void;
    transfers?: boolean;
    name?:string;
}

const InputField: FC<IParams> & {
    Validator: typeof Validator;
    DisplayBalance: typeof DisplayBalance;
    PercentSelector: typeof PercentSelector;
    CurrencySelector: typeof CurrencySelector;
} = ({ currency, value, wrapperClassName, disabled = false, className, onChange, name }) => {
    const inputCurrencyValid = useContext(CtxInputCurrencyValid);
    const { t } = useTranslation();
    const { md } = useBreakpoints();

    return (
        <div className={wrapperClassName ? wrapperClassName : styles.Field}>
            <div className={'display: flex'}>
                <input
                    type="text"
                    name={name}
                    disabled={disabled || !currency}
                    className={styles.Input}
                    value={value}
                    placeholder={!currency ? '' : t("exchange.enter_amount")}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        const value: string = event.target.value
                        onChange(value)
                    }}

                />
                <div className={styles.SuffixWrapper}>
                    <span className={styles.Token}>
                        {currency ?? t("select_a_token")}
                    </span>

                    {currency && <IconCoin width={40} height={40} code={currency}/>}
                </div>
            </div>
        </div>
    );
};

InputField.Validator = Validator;
InputField.DisplayBalance = DisplayBalance;
InputField.PercentSelector = PercentSelector;
InputField.CurrencySelector = CurrencySelector;

export default InputField;
