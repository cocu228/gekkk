import React, {useState} from 'react';
import DepositChoose from "@/widgets/deposit/ui/deposit-choose/DepositChoose";
import DepositAbout from "@/widgets/deposit/ui/deposit-about/DepositAbout";

function Deposit() {
    const [type, setType] = useState('fixed');

    const handleType = () => {
        (type === 'fixed') ? setType('structured') : setType('fixed')
    }

    return (
      <div className='wrapper grid grid-cols-5 h-full mb-8'>
        <DepositChoose type={type} setType={handleType}/>
        <DepositAbout type={type}/>
      </div>
    )
}

export default Deposit;
