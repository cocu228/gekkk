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
        <div className={`wrapper flex justify-between gap-4 rounded p-4 pr-12 flex-wrap xxxl:pr-4 pb-8 mb-10 bg-gray-100 w-full ${disabled ? 'grayscale' : ''} md:flex-col md:gap-8 md:order-1`}>
            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositStartingRateIcon.svg" alt="deposit starting rate"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>Starting rate</p>
                </div>
                <p className='font-bold text-lg'>{startingRate}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentRateIcon.svg" alt="deposit current rate"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>Current rate</p>
                </div>
                <p className='font-bold text-lg'>{currentRate}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCourseDifferenceIcon.svg" alt="course"/>
                    <p className='text-gray-400 font-medium xxxl:text-sm'>Course difference</p>
                </div>
                <p className='font-bold text-lg'>{course}</p>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-3 xxxl:mb-1'>
                    <img width={24} height={24} src="/img/icon/DepositCurrentIncomeIcon.svg" alt="income"/>
                    <p className='text-gray-400 font-medium md:text-sm'>Current income</p>
                </div>
                <p className='font-bold text-sm'>{income}</p>
            </div>
        </div>
    )
}

export default DepositStats;
