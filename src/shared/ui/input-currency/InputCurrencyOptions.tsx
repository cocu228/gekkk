import React, {useContext, useEffect, useState} from "react";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import {CtxInputCurrencyOptions} from "@/shared/ui/input-currency/model/context";
import Decimal from "decimal.js";
import { CtxCurrencyData } from "@/app/CurrenciesContext";

interface IParams {
    children: React.ReactNode,
    header?: string | JSX.Element,
    availableBalance: number,
    currency: string,
    showWill: boolean,
    disabled: boolean,
    value: string | number,
}

export default ({
    children,
    header,
    disabled,
    availableBalance,
    currency,
    showWill,
    value
}: IParams) => {
    const [will, setWill] = useState("give");
    const [percent, setPercent] = useState<Decimal>(null);
    const {currencies} = useContext(CtxCurrencyData);

    useEffect(() => {
        setPercent(null);
    }, [percent]);

    const onBtnClick = (percent: number) => {
        const value = disabled ? null : (percent / 100) * availableBalance;

        return setPercent(percent === 100 ? new Decimal(value) :
            new Decimal(value.toFixed(currencies.get(currency).roundPrec))
        );
    }

    return <CtxInputCurrencyOptions.Provider value={percent}>
        <div className="row">
            <div className="col">
                <div className="wrapper w-full">
                    <div className="row flex justify-between mb-2 md:mb-1 items-center">
                        {header}
                        {showWill && <div className="wrapper flex text-xs gap-1">
                            <p className="text-gray-400 font-medium md:text-sm sm:text-xs">
                                I want to
                            </p>
                            <PercentBtn active={will === "give"}
                                        onClick={() => setWill("give")}>give</PercentBtn>
                            <PercentBtn active={will === "receive"}
                                        onClick={() => setWill("receive")}>receive</PercentBtn>
                        </div>}

                        <div className="row flex gap-1 text-xs">
                            <PercentBtn onClick={() => onBtnClick(25)}>25%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(50)}>50%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(75)}>75%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(100)}>100%</PercentBtn>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
        {showWill && <div className="row flex gap-4 text-gray-400 font-medium mb-14">
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row">
                    <span>You will pay</span>
                </div>
                <div className="row">
                        <span>
                          You will get
                        </span>
                </div>
            </div>
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row flex items-end">
                    <span className="w-full text-end">{value}</span>
                </div>
                <div className="row flex items-end">
                    <span className="w-full text-end">{value}</span>
                </div>
            </div>
        </div>}
    </CtxInputCurrencyOptions.Provider>
}