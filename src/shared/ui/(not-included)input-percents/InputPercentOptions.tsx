import Decimal from "decimal.js";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import React, {useContext, useEffect, useState} from "react";
import {CtxRootData, ICtxCurrencyData} from "@/processes/RootContext";
import {CtxInputCurrencyOptions} from "@/shared/ui/(not-included)input-percents/model/context";

interface IParams {
    children: React.ReactNode,
    header?: string | JSX.Element,
    currencyData: ICtxCurrencyData | null,
    showWill: boolean,
    disabled: boolean,
    value: string | number,
}

export default ({
    children,
    header,
    disabled,
    currencyData,
    showWill,
    value
}: IParams) => {

    const [will, setWill] = useState("give");
    const [percent, setPercent] = useState<Decimal>(null);
    const {currencies} = useContext(CtxRootData);

    useEffect(() => {
        setPercent(null);
    }, [percent]);

    const onBtnClick = (percent: Decimal) => {
        const value = disabled ? null : percent.div(new Decimal(100)).mul(currencyData.availableBalance);

        return setPercent(new Decimal(!percent.comparedTo(100) ? value :
            value.toFixed(currencies.get(currencyData.currency).roundPrec)
        ));
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

                        <div className={`row flex gap-1 text-xs ${disabled || !currencyData ? 'pointer-events-none' : ''}`}>
                            <PercentBtn onClick={() => onBtnClick(new Decimal(25))}>25%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(new Decimal(50))}>50%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(new Decimal(75))}>75%</PercentBtn>
                            <PercentBtn onClick={() => onBtnClick(new Decimal(100))}>100%</PercentBtn>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
        {showWill && <div className="row flex gap-4 text-gray-400 font-medium mb-14 mt-6 text-sm">
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
                    <span className="w-full text-end font-bold">{value !== null && value.toString()}</span>
                </div>
                <div className="row flex items-end">
                    <span className="w-full text-end font-bold">{value !== null && value.toString()}</span>
                </div>
            </div>
        </div>}
    </CtxInputCurrencyOptions.Provider>
}