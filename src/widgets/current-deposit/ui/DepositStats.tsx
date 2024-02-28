import {Skeleton} from 'antd';
import {useEffect, useState} from 'react';
import {apiGetRates} from '@/shared/(orval)api/gek';
import {IDepositStrategyData, getDepositCurrentProfit} from '../model/helpers';
import {getCurrencyRounding} from '@/shared/lib/number-format-helper';
import Decimal from 'decimal.js';

interface IDepositStats {
    days: number;
    amount: number;
    isClosed?: boolean;
    startingRate: number;
    linkedCurrency: string;
    strategyData?: IDepositStrategyData;
}

interface IDepositState {
    rate: number;
    income: number;
    rateDiff: number;
    annualProfit: number;
    rateDiffPercent: number;
}

function DepositStats({
    days,
    amount,
    isClosed,
    startingRate,
    strategyData,
    linkedCurrency
}: IDepositStats) {
    const initialState = {
        rate: null,
        income: null,
        rateDiff: null,
        annualProfit: null,
        rateDiffPercent: null
    }

    const [state, setState] = useState<IDepositState>(initialState)

    const {
        risePercentage,
        dropPercentage
    } = strategyData.percentageType;

    useEffect(() => {
        setState(prev => ({
            ...prev,
            rate: null
        }));

        (async () => {
            const {data} = await apiGetRates({
                to: 'EUR'
            });
            
            const rate = data.result[linkedCurrency];

            setState(prev => ({
                ...prev,
                rate: rate
            }));
        })()
    }, [linkedCurrency]);

    useEffect(() => {
        if (!state.rate) {
            setState(prev => ({
                ...prev,
                rateDiff: 0,
                rateDiffPercent: 0,
                income: 0
            }));
        }

        const diff = state.rate - startingRate;
        const max = Math.max(state.rate, startingRate);
        const min = Math.min(state.rate, startingRate);
        const diffPerc = diff >= 0 ? 
            max / min * 100 - 100 :
            (max - min) / max * -100;
        
        const annual = (amount * (dropPercentage / 100) * days) / 360;

        setState(prev => ({
            ...prev,
            rateDiff: diff,
            rateDiffPercent: diffPerc,
            annualProfit: annual,
            income: getDepositCurrentProfit(
                annual,
                new Decimal(amount),
                new Decimal(diffPerc),
                strategyData
            )
        }))
    }, [startingRate, state.rate]);

    return (
        <div className={`wrapper flex justify-between gap-4 rounded p-4 pr-12 flex-wrap xxxl:pr-4 pb-8 mb-10 bg-gray-100 w-full ${isClosed ? 'grayscale' : ''} md:flex-col md:gap-8 md:order-1`}>
            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositStartingRateIcon.svg" alt="deposit starting rate"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>Starting rate</p>
                </div>
                <p className='font-bold text-lg'>1 {linkedCurrency} ~ {startingRate} €</p>
            </div>

            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentRateIcon.svg" alt="deposit current rate"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>
                        {isClosed ? 'Closing' : 'Current'} rate
                    </p>
                </div>
                {!state.rate ? (
                    <Skeleton.Input style={{height: 22}} active/>
                ) : (
                    <p className='font-bold text-lg'>1 {linkedCurrency} ~ {getCurrencyRounding(state.rate)} €</p>
                )}
            </div>

            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCourseDifferenceIcon.svg" alt="course"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>Course difference</p>
                </div>
                {!state.rate ? (
                    <Skeleton.Input style={{height: 22}} active/>
                ) : (
                    <p className='font-bold text-lg'>
                        {+state.rateDiff.toFixed(2)} € <span className={state.rateDiff >= 0 ? 'text-green' : 'text-red-800'}>
                            ({state.rateDiffPercent.toFixed(2)}%)
                        </span>
                    </p>
                )}
            </div>

            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentIncomeIcon.svg" alt="income"/>
                    <p className='text-gray-400 font-medium md:text-sm'>{isClosed ? 'Total' : 'Current'} income</p>
                </div>
                {!state.rate ? (
                    <Skeleton.Input style={{height: 22}} active/>
                ) : (
                    <p className='font-bold text-sm'>
                        <span className={`${state.income >= 0 ? 'text-green' : 'text-red-800'} mr-1 text-lg`}>
                            {+state.income.toFixed(2)} €
                        </span> {state.rateDiff > 0 && state.annualProfit !== state.income ? risePercentage : dropPercentage}% from different rates
                    </p>
                )}
            </div>
        </div>
    )
}

export default DepositStats;
