import React from 'react';
import InlineProperty from '@/shared/ui/inline-property';

interface IOpenDepositProperties {
  opened: string;
  amount: string;
  term: string;
} 

function CurrentDepositProperties({opened, amount, term}) {
    return (
      <div className="column w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full">
        <InlineProperty left="Opened" right={opened}/>
        <InlineProperty left="Amount" right={`${amount} EURG`}/>
        <InlineProperty left="Term" right={term}/>
      </div>
    )
}

export default CurrentDepositProperties;
