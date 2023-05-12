import {apiGetRates} from "@/shared/api";
import styles from "./styles.module.scss";
import {useContext, useEffect, useState} from "react";
import InlineProperty from "@/shared/ui/inline-property";
import {CtxNewDeposit} from "@/widgets/deposit/model/context";
import Loader from "@/shared/ui/loader";

const StructuredProperties = () => {
    const {
        step,
        rate,
        token,
        amount,
        term_in_days,
        percentageType,
        structedStrategy
    } = useContext(CtxNewDeposit);

    if (step < 5) return;

    if (!rate)
        return <Loader className="relative mt-10"/>;

    return (
        <div className="wrapper w-full">
            <div className={`wrapper ${styles.InvestBlock} mb-3 w-full`}>
                <p className='text-lg font-bold mb-5'>You invest {amount} EURG
                in {token.name} ({token.code}) for {term_in_days} days</p>
                <div className="flex flex-col gap-3 md:gap-2">
                    <InlineProperty left="Current rate" right={`1 ${token.code} ~ ${rate.toFixed(2)} EURG`}/>
                    <InlineProperty left="Risk level" right={`${structedStrategy.name} strategy`}/>
                    <InlineProperty left="Return rate" right={`
                    ${percentageType.risePercentage}% rates growth 
                    ${token.code} or ${percentageType.dropPercentage}% p.a`}/>
                </div>
                <p className="text-gray-400 text-xs text-end">(The biggest is chosen)</p>
            </div>

            <p className="text-gray-400 text-sm md:text-xs">We use the crypto broker AtlantEX exchange rates to open and close structured deposits.</p>
        </div>
    )
}

export default StructuredProperties;
