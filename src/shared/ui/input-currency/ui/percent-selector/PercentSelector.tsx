import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Decimal } from "decimal.js";

import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";

import { CtxInputCurrencyOptions } from "../../model/context";
import style from "../style.module.scss";

interface IParams {
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  header?: string | JSX.Element;
  currency: ICtxCurrency | null;
  onSelect?: (value: string) => void;
  mobileSecHidden?: boolean;
}

const PercentSelector: FC<IParams> = ({
  header,
  children,
  disabled,
  currency,
  onSelect,
  className,
  mobileSecHidden
}: IParams) => {
  const { currencies } = useContext(CtxCurrencies);
  const [percent, setPercent] = useState<Decimal>(null);

  useEffect(() => {
    setPercent(null);
  }, [percent]);

  const onBtnClick = (percent: Decimal) => {
    const value = disabled ? null : percent.div(new Decimal(100)).mul(currency.balance?.free_balance);

    const result = new Decimal(
      !percent.comparedTo(100) ? value : value.toFixed(currencies.get(currency.$const).roundPrec)
    );

    onSelect(result.toString());

    return setPercent(result);
  };

  return (
    <CtxInputCurrencyOptions.Provider value={percent}>
      <div className={`wrapper ${className}`}>
        <div className='row flex justify-between items-end'>
          {header}

          <div
            className={`row mb-[3px] flex gap-1 text-xs
                        ${disabled || !currency || !currency.balance?.free_balance ? "pointer-events-none" : ""} ${
                          mobileSecHidden && style.PercentSelector
                        }
                    `}
          >
            <PercentBtn onClick={() => onBtnClick(new Decimal(25))}>25%</PercentBtn>
            <PercentBtn onClick={() => onBtnClick(new Decimal(50))}>50%</PercentBtn>
            <PercentBtn onClick={() => onBtnClick(new Decimal(75))}>75%</PercentBtn>
            {/*TODO  Recalculate 100% taking fee*/}
            <PercentBtn onClick={() => onBtnClick(new Decimal(100))}>100%</PercentBtn>
          </div>
        </div>

        {children}
      </div>
    </CtxInputCurrencyOptions.Provider>
  );
};

export default PercentSelector;
