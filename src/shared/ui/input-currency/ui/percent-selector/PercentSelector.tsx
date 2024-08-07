import { FC, ReactNode, useContext, useEffect, useState } from "react";

import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";

import { CtxInputCurrencyOptions } from "../../model/context";
import style from "../style.module.scss";

interface IParams {
  disabled?: boolean;
  className?: string;
  fees?: {
    percentFee: number;
    amountFee: number;
  } | null;
  children?: ReactNode;
  header?: string | JSX.Element;
  currency: ICtxCurrency | null;
  onSelect?: (value: string) => void;
  mobileSecHidden?: boolean;
}

const PercentSelector: FC<IParams> = ({
  fees,
  header,
  children,
  disabled,
  currency,
  onSelect,
  className,
  mobileSecHidden
}: IParams) => {
  const { currencies } = useContext(CtxCurrencies);
  const [percent, setPercent] = useState<number | null>(null);

  useEffect(() => {
    setPercent(null);
  }, [currency]);

  const onBtnClick = (percent: number) => {
    if (disabled || !currency || !currency.balance?.free_balance) {
      return;
    }

    const value =
      fees && percent === 100
        ? currency.balance.free_balance - currency.balance.free_balance * (fees.percentFee / 100) - fees.amountFee
        : (percent / 100) * currency.balance.free_balance;
    const roundPrec = currencies.get(currency.$const).roundPrec;
    const result = Math.round(value * Math.pow(10, roundPrec)) / Math.pow(10, roundPrec);

    let hundredRes = currency.balance.free_balance;

    if (fees?.amountFee) {
      hundredRes = hundredRes - fees.amountFee;
    }

    if (onSelect) {
      percent === 100 ? onSelect(hundredRes.toString()) : onSelect(result.toString());
    }

    percent === 100 ? setPercent(hundredRes) : setPercent(result);
  };

  return (
    <CtxInputCurrencyOptions.Provider value={percent}>
      <div className={`wrapper ${className}`}>
        <div className='row flex justify-between items-end'>
          {header}

          <div
            className={`row flex gap-1 text-xs pb-[2px] mr-[7px]
                        ${disabled || !currency || !currency.balance?.free_balance ? "pointer-events-none" : ""} ${
                          mobileSecHidden && style.PercentSelector
                        }
                    `}
          >
            <PercentBtn onClick={() => onBtnClick(25)}>25%</PercentBtn>
            <PercentBtn onClick={() => onBtnClick(50)}>50%</PercentBtn>
            <PercentBtn onClick={() => onBtnClick(75)}>75%</PercentBtn>
            <PercentBtn onClick={() => onBtnClick(100)}>100%</PercentBtn>
          </div>
        </div>

        {children}
      </div>
    </CtxInputCurrencyOptions.Provider>
  );
};

export default PercentSelector;
