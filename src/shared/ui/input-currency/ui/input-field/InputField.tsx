import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";

import { IconCoin } from "@/shared/ui/icons/icon-coin";

import Validator from "../validator/Validator";
import DisplayBalance from "../balance/DisplayBalance";
import PercentSelector from "../percent-selector/PercentSelector";
import CurrencySelector from "../currency-selector/CurrencySelector";
import styles from "../style.module.scss";

interface IParams {
  currency?: string;
  disabled?: boolean;
  value: string;
  wrapperClassName?: string;
  className?: string;
  onChange: (value: string) => void;
  transfers?: boolean;
  name?: string;
  placeholder?: string;
}

const InputField: FC<IParams> & {
  Validator: typeof Validator;
  DisplayBalance: typeof DisplayBalance;
  PercentSelector: typeof PercentSelector;
  CurrencySelector: typeof CurrencySelector;
} = ({ currency, value, wrapperClassName, disabled = false, onChange, name, placeholder }) => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClassName ? wrapperClassName : styles.Field}>
      <div className={"display: flex"}>
        <input
          type='text'
          name={name}
          disabled={disabled || !currency}
          className={styles.Input}
          value={value}
          placeholder={!currency ? "" : placeholder && `-${placeholder?.toLowerCase()}-`}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            const value: string = event.target.value;
            onChange(value);
          }}
        />
        <div className={styles.SuffixWrapper}>
          <span className={styles.Token}>{currency ?? t("select_a_token")}</span>

          {currency && <IconCoin width={40} height={40} code={currency} />}
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
