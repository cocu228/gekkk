import { useEffect, useState } from "react";

import Loader from "@/shared/ui/loader";
import { RateState } from "@/widgets/exchange/model/types";
import { getCurrencyRounding } from "@/shared/lib/number-format-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

interface IParams {
  amount: number;
  loading: boolean;
  currency: string;
}

const DepthPrice = ({ loading, amount }: IParams) => {
  const [{ rateState, displayAmount }, setState] = useState({
    rateState: null,
    displayAmount: null
  });

  useEffect(() => {
    setState(prev => ({
      displayAmount: amount,
      rateState: !amount ? null : prev.displayAmount > amount ? RateState.DOWN : RateState.UP
    }));
  }, [amount]);

  return (
    <div
      className={`flex gap-1 w-full my-[3px] md:my-0 font-semibold text-md lg:text-sm md:text-md
                ${styles.Rate}
                ${
                  rateState === RateState.UP
                    ? styles.RateUp
                    : rateState === RateState.DOWN
                    ? styles.RateDown
                    : "fill-none"
                }`}
    >
      {loading && !displayAmount ? (
        <Loader className='relative h-[25px] w-[25px]' />
      ) : (
        <div className='flex items-center text-[10px] w-full justify-center'>
          {displayAmount ? (
            <>
              ~{getCurrencyRounding(displayAmount)}{" "}
              <IconApp
                code='t59'
                size={20}
                className={`${rateState === RateState.UP ? "rotate-[180deg]" : "rotate-[360deg]"}`}
                color='rgb(var(--green))'
              />
            </>
          ) : (
            <>-</>
          )}
        </div>
      )}
    </div>
  );
};

export default DepthPrice;
