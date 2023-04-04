import React from 'react';

interface IBalance {
  balance: string,
  disabled?: boolean
}

function Balance({balance, disabled}: IBalance) {

    return (
      <div className='column flex gap-5 lg:mb-6 md:items-center md:mb-4'>
        <img className='h-[3.2rem] md:h-[2.6rem]' src={`/img/icon/${disabled ? 'DepositIcon.svg' : 'DepositGradientIcon.svg'}`} alt="percent"/>
        <div className='column'>
            <p className='font-medium text-gray-500 mb-2 md:font-bold md:text-sm md:mb-1'>{disabled ? 'Total balance' : 'Current balance'}</p>
            <p className='font-bold text-2xl whitespace-nowrap'>{balance} EURG</p>
        </div>
      </div>
    )
}

export default Balance;
