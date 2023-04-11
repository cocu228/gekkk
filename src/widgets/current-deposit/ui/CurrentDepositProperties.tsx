import React from 'react';
import InlineProperty from '@/shared/ui/inline-property';

interface IOpenDepositProperties {
  opened: string;
  amount: string;
  term: string;
} 

function CurrentDepositProperties({opened, amount, term}:IOpenDepositProperties) {
    return (
      <div className="flex flex-col gap-3 md:gap-2 column w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full">
        <InlineProperty left="Opened" right={opened}/>
        <InlineProperty left="Amount" right={`${amount} EURG`}/>
        <InlineProperty left="Term" right={term}/>
      </div>
    )
}

export default CurrentDepositProperties;
