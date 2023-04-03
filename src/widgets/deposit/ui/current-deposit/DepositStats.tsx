import React, {ReactNode} from 'react';

interface IDepositStats {
    startingRate: string;
    currentRate: string;
    course: ReactNode | ReactNode[];
    income: ReactNode | ReactNode[];
    disabled?: boolean;
} 

function DepositStats({startingRate, currentRate, course, income, disabled}: IDepositStats) {
    return (
        <div className={`wrapper flex justify-between rounded p-4 pr-12 pb-8 mb-10 bg-gray-100 w-full ${disabled ? 'grayscale' : ''}`}>
            <div>
                <div className='flex gap-3 items-center mb-3'>
                    <img width={24} height={24} src="/img/icon/DepositStartingRateIcon.svg" alt="deposit starting rate"/>
                    <p className='text-gray-400 font-medium'>Starting rate</p>
                </div>
                <p className='font-bold text-lg'>{startingRate}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentRateIcon.svg" alt="deposit current rate"/>
                    <p className='text-gray-400 font-medium'>Current rate</p>
                </div>
                <p className='font-bold text-lg'>{currentRate}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3'>
                    <img width={24} height={24} src="/img/icon/DepositCourseDifferenceIcon.svg" alt="course"/>
                    <p className='text-gray-400 font-medium'>Course difference</p>
                </div>
                <p className='font-bold text-lg'>{course}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentIncomeIcon.svg" alt="income"/>
                    <p className='text-gray-400 font-medium'>Current income</p>
                </div>
                <p className='font-bold text-sm'>{income}</p>
            </div>
        </div>
    )
}

export default DepositStats;
