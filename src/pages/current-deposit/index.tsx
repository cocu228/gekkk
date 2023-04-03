import React, {useState} from 'react';
import Balance from '@/widgets/deposit/ui/current-deposit/Balance';
import CurrentDepositType from '@/widgets/deposit/ui/current-deposit/CurrentDepositType';
import CurrentDepositProperties from '@/widgets/deposit/ui/current-deposit/CurrentDepositProperties';
import CurrentDepositActionsBlock from '@/widgets/deposit/ui/current-deposit/CurrentDepositActionsBlock';
import DepositStats from '@/widgets/deposit/ui/current-deposit/DepositStats';

function CurrentDeposit() {
    return (
        <div className="wrapper flex flex-col flex-1">
            <div className='wrapper flex justify-between mb-10 lg:flex-col md:mb-8'>
                <Balance balance="100.00" disabled />
                <CurrentDepositType title="Structured deposit" strategy="Safe strategy" percent="16/4" token="Monero (XMR)" />
            </div>

            <div className='wrapper flex-1 bg-white flex flex-wrap justify-between px-10 pt-16 pb-80 rounded-md xxxl:px-8 xxxl:pt-14 xl:px-4 xl:py-6 xl:flex-col xl:gap-10 md:bg-transparent md:p-0'>
                <DepositStats 
                    startingRate="1 XMR ~ 141.68€" 
                    currentRate="1 XMR ~ 185.03€" 
                    course={<>43.35€ <span className="text-green">(30.60%)</span></>} 
                    income={<><span className='text-green mr-4 text-lg'>6.93€</span> 16% from different rates</>}
                    disabled
                />
                <CurrentDepositProperties opened="25.01.2023 at 16:04" amount="100" term="90 days (until 25.04.23 at 16:04)" />
                <CurrentDepositActionsBlock/>
            </div>
        </div>
    )
}

export default CurrentDeposit;