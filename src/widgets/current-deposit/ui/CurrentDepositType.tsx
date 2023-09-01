import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { IDepositStrategyData } from "../model/helpers";

interface ICurrentDepositType {
    isClosed?: boolean;
    isFixed?: boolean;
    strategyData?: IDepositStrategyData;
    currency?: ICtxCurrency;
}

function CurrentDepositType({
    isClosed = false,
    isFixed = false,
    strategyData,
    currency
}: ICurrentDepositType) {
    const {
        strategy,
        percentageType
    } = strategyData
    const title = isFixed ? 'Fixed rate' : 'Structed';

    return (
        <div className='column'>
            <p className='text-3xl text-end font-bold mb-4 lg:hidden'>
                {isClosed ? `Closed ${title.toLowerCase()}` : title} deposit
            </p>
            
            <div className='row flex justify-end gap-4'>
                <div className='flex gap-2 items-center'>
                    <img width={24} height={24} src="/img/icon/DepositStrategyIcon.svg" alt="strategy" />
                    <p className='font-medium'>
                        {isFixed ? 'Fixed rate' : `${strategy.name} strategy`}
                    </p>
                </div>
                
                <div className='flex gap-2 items-center'>
                    <img width={24} height={24} src="/img/icon/DepositPercentIcon.svg" alt="percent" />
                    <p className='font-medium'>
                        {isFixed ? '0,8% per month' : `${percentageType.risePercentage}/${percentageType.dropPercentage}`}
                    </p>
                </div>

                {!isFixed && (
                    <div className='flex gap-2 items-center'>
                        <IconCoin width={24} code={currency.$const} className={isClosed ? 'grayscale' : ''} />
                        <p className='font-medium'>{currency.name} ({currency.$const})</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CurrentDepositType;
