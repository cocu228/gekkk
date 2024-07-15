import { addDays, format } from "date-fns";

import { DepositType } from "@/shared/config/deposits/types";

export const getTermEnd = (startDate: Date, termDaysCount: number) => {
  if (!termDaysCount) return;

  return format(addDays(startDate, termDaysCount), "dd.MM.yyyy 'at' HH:mm");
};

export const getTypeDescriptions = (isGke?: boolean) => ({
  [DepositType.FIXED]: (
    <p className='leading-6'>
      A deposit with a fixed income allows you to earn <b>{isGke ? "1,6" : "0,8"}% per month</b>. The payments are made{" "}
      <b>every 30 calendar days</b> to your EURG account. Terms of deposit - <b>360 days</b>. The minimum amount of the
      deposit - <b>1000 EURG</b>.
    </p>
  ),

  [DepositType.STRUCTED]: (
    <p className='leading-6'>
      With a stuctured deposit, you can invest in cryptocurrencies and have full or partial capital protection from
      potential losses. You choose the term. You choose the level of risk and return.
    </p>
  )
});
