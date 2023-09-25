import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import IconArrow from "@/shared/ui/icons/IconArrow";
import {useContext, useEffect, useState} from "react";
import {RateState} from "@/widgets/exchange/model/types";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {getCurrencyRounding} from "@/shared/lib/helpers";

interface IParams {
    amount: number;
    loading: boolean;
    currency: string;
}

const DepthPrice = ({loading, currency, amount}: IParams) => {
    const {currencies} = useContext(CtxCurrencies);
    const [{
        rateState,
        displayAmount
    }, setState] = useState({
        rateState: null,
        displayAmount: null
    });
    
    useEffect(() => {
        setState(prev => ({
            displayAmount: amount,
            rateState: !amount
                ? null
                : prev.displayAmount > amount
                    ? RateState.DOWN
                    : RateState.UP
        }));
    }, [amount]);
    
    return (
        <div
            className={`flex items-center gap-1 my-4 md:my-3.5 font-semibold text-md lg:text-sm md:text-md
                ${styles.Rate}
                ${rateState === RateState.UP ? styles.RateUp :
                rateState === RateState.DOWN ? styles.RateDown : 'fill-none'}`
            }
        >
            {loading ? (
                <Loader className='relative h-[25px] w-[25px]' />
            ) : (
                <>
                    <IconArrow/> {displayAmount
                        ? `~${getCurrencyRounding(displayAmount)}`
                        : '-'
                    }
                </>
            )}
        </div>
    )
}

export default DepthPrice;
