import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { getGkePercent } from "@/shared/config/deposits/helpers";

import { IDepositStrategyData } from "../model/helpers";

interface ICurrentDepositType {
  isGke?: boolean;
  isFixed?: boolean;
  isClosed?: boolean;
  token?: ICtxCurrency;
  strategyData?: IDepositStrategyData;
}

function CurrentDepositType({ isGke, token, strategyData, isFixed = false, isClosed = false }: ICurrentDepositType) {
  const { strategy, percentageType } = strategyData;

  const { risePercent, dropPercent } = getGkePercent(percentageType, isGke);

  const title = isFixed ? "Fixed rate" : "Structed";

  return (
    <div className='column'>
      <p className='text-3xl text-end font-bold mb-4 lg:hidden'>
        {isClosed ? `Closed ${title.toLowerCase()}` : title} deposit
      </p>

      <div className='row flex justify-end gap-4'>
        {isGke && (
          <div className='flex gap-2 items-center'>
            <img width={24} height={24} className='grayscale' src='/img/tokens/GkeIcon.svg' alt='strategy' />
            <p className='font-medium'>GKE-increased</p>
          </div>
        )}

        <div className='flex gap-2 items-center'>
          <img width={24} height={24} src='/img/icon/DepositIcon.svg' alt='strategy' />

          <p className='font-medium'>{isFixed ? "Fixed rate" : `${strategy.name} strategy`}</p>
        </div>

        <div className='flex gap-2 items-center'>
          <img width={24} height={24} src='/img/icon/DepositPercentIcon.svg' alt='percent' />

          <p className='font-medium'>
            {isFixed ? `${isGke ? "1,6" : "0,8"}% per month` : `${risePercent}/${dropPercent}`}
          </p>
        </div>

        {!isFixed && token && (
          <div className='flex gap-2 items-center'>
            <IconCoin width={24} code={token.$const} className={isClosed ? "grayscale" : ""} />

            <p className='font-medium'>
              {token.name} ({token.$const})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentDepositType;
