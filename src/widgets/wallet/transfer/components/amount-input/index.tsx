import {FC} from "react";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {IValidatorCreator} from "@/shared/config/validators";
import {useTranslation} from "react-i18next";
import {ICtxCurrency} from "@/processes/CurrenciesContext";

interface IBrokerAmountContainerProps {
  value: number;
  inputValue: string;
  currency: ICtxCurrency
  validators:  IValidatorCreator[];
  transfers?: boolean;
  description?: string;
  textClassname?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onError?: (value: boolean) => void;
  onSelect?: (value: string) => void;
}

const AmountInput: FC<IBrokerAmountContainerProps> = ({
  transfers,
  value,
  inputValue,
  currency,
  description,
  validators,
  textClassname,
  placeholder,
  onError,
  onSelect,
  onChange
}) => {
  const {t} = useTranslation();

  const header = (
    <span
      className={textClassname ? textClassname : "font-bold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]"}
    >
      {t("amount")}:
    </span>
  )

  return (
    <InputCurrency.Validator value={value} description={description} validators={validators} onError={onError}>
      <InputCurrency.PercentSelector header={header} currency={currency} onSelect={onSelect}>
        <InputCurrency.DisplayBalance currency={currency}>
          <InputCurrency
            transfers={transfers}
            placeholder={placeholder}
            value={inputValue}
            currency={currency.$const}
            onChange={onChange}
          />
        </InputCurrency.DisplayBalance>
      </InputCurrency.PercentSelector>
    </InputCurrency.Validator>
  )
}

export default AmountInput;