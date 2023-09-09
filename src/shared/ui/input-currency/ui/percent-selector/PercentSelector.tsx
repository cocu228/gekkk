import Decimal from "decimal.js";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import {CtxInputCurrencyOptions} from "../../model/context";
import React, {FC, useContext, useEffect, useState} from "react";
import {CtxCurrencies, ICtxCurrency} from "@/processes/CurrenciesContext";

interface IParams {
    disabled?: boolean,
    children?: React.ReactNode,
    header?: string | JSX.Element,
    currency: ICtxCurrency | null,
    onSelect?: (value: string) => void
}

const PercentSelector: FC<IParams> = ({
    header,
    children,
    disabled,
    currency,
    onSelect
}: IParams) => {
    const {currencies} = useContext(CtxCurrencies);
    const [percent, setPercent] = useState<Decimal>(null);

    useEffect(() => {
        setPercent(null);
    }, [percent]);

    const onBtnClick = (percent: Decimal) => {
        const value = disabled ? null : percent.div(new Decimal(100)).mul(currency.availableBalance);

        const result = new Decimal(!percent.comparedTo(100) ? value :
            value.toFixed(currencies.get(currency.$const).roundPrec)
        );

        onSelect(result.toString());

        return setPercent(result);
    }

    return <CtxInputCurrencyOptions.Provider value={percent}>
        <div className="wrapper w-full">
            <div className="row flex justify-between mb-2 md:mb-1 items-center">
                {header}

                <div className={`row flex gap-1 text-xs 
                        ${disabled || !currency || !currency.availableBalance
                            ? 'pointer-events-none'
                            : ''
                        }
                    `}
                >
                    <PercentBtn onClick={() => onBtnClick(new Decimal(25))}>25%</PercentBtn>
                    <PercentBtn onClick={() => onBtnClick(new Decimal(50))}>50%</PercentBtn>
                    <PercentBtn onClick={() => onBtnClick(new Decimal(75))}>75%</PercentBtn>
                    <PercentBtn onClick={() => onBtnClick(new Decimal(100))}>100%</PercentBtn>
                </div>
            </div>

            {children}
        </div>
    </CtxInputCurrencyOptions.Provider>
}

export default PercentSelector;