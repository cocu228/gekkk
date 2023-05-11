import {apiGetRates} from "@/shared/api";
import styles from "./styles.module.scss";
import {useContext, useEffect, useState} from "react";
import constants from "@/shared/config/coins/constants";
import InlineProperty from "@/shared/ui/inline-property";
import {CtxNewDeposit} from "@/widgets/deposit/model/context";
import Loader from "@/shared/ui/loader";

const StructuredProperties = () => {
    const context = useContext(CtxNewDeposit);
    const [rates, setRates] = useState<Record<constants, number>>();

    useEffect(() => {
        if (!context.token) return;

        (async () => {
            const {data} = await apiGetRates();

            setRates(data.result);
        })()
    }, [context.token])

    if (!rates) return <Loader className="relative mt-10"/>;

    return (
        <div className="wrapper w-full">
            <div className={`wrapper ${styles.InvestBlock} mb-3 w-full`}>
                <p className='text-lg font-bold mb-5'>You invest {context.amount} EURG
                in {context.token.name} ({context.token.code}) for {context.term_in_days} days</p>
                <div className="flex flex-col gap-3 md:gap-2">
                    <InlineProperty left="Current rate" right={`1 ${context.token.code} ~ ${rates[context.token.code].toFixed(2)} EUR`}/>
                    <InlineProperty left="Risk level" right={`${context.riskLevel} strategy`}/>
                    <InlineProperty left="Returns" right="16% rates growth XMR or 4% p.a"/>
                </div>
                <p className="text-gray-400 text-xs text-end">(The biggest is chosen)</p>
            </div>

            <p className="text-gray-400 text-sm md:text-xs">We use the crypto broker AtlantEX exchange rates to open and close structured deposits.</p>
        </div>
    )
}

export default StructuredProperties