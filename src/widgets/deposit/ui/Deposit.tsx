import React, { useState } from 'react';
import DepositChoose from '@/widgets/deposit/ui/deposit-choose/DepositChoose';
import DepositAbout from '@/widgets/deposit/ui/deposit-about/DepositAbout';

function Deposit() {
  const [variant, setVariant] = useState('fixed');

  const handleVariant = () => {
    setVariant(variant === 'fixed' ? 'structured' : 'fixed');
  };

  return (
    <div className="wrapper grid grid-cols-5 h-full mb-8">
      <DepositChoose variant={variant} setVariant={handleVariant} />
      <DepositAbout variant={variant} />
    </div>
  );
}

export default Deposit;
