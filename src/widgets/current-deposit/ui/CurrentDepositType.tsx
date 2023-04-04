import React from 'react';

interface ICurrentDepositType {
  title: string;
  strategy: string;
  percent: string; 
  token?: string;
} 

function CurrentDepositType({title, strategy, percent, token}:ICurrentDepositType) {
    return (
      <div className='column'>
        <p className='text-3xl text-end font-bold mb-4 md:hidden'>{title}</p>
        <div className='row flex justify-between gap-6 lg:justify-start'>
            <div className='flex gap-2 items-center'>
                <img width={24} height={24} src="/img/icon/DepositStrategyIcon.svg" alt="strategy"/>
                <p className='font-medium'>{strategy}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <img width={24} height={24} src="/img/icon/DepositPercentIcon.svg" alt="percent"/>
                <p className='font-medium'>{percent}</p>
            </div>
            {
            token && 
            <div className='flex gap-2 items-center'>
                <img className='grayscale' width={24} height={24} src="/img/tokens/XmrIcon.svg" alt="strategy"/>
                <p className='font-medium'>{token}</p>
            </div>
            }
        </div>
      </div>
    )
}

export default CurrentDepositType;
