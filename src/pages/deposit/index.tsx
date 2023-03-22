import React, {useState} from 'react';
import ChooseDeposit from "@/widgets/deposit/ui/deposit-choose/DepositChoose";
import DepositInfo from "@/widgets/deposit/ui/deposit-info/DepositInfo";

function Deposit() {

    return (

        <div className="wrapper flex-1 flex flex-col pb-14">
            <div className="wrapper -mx-4 px-4 mb-10">
                <h2 className="text-3xl font-bold mb-4">New deposit</h2>
                <p className="text-sm">
                    A modern alternative to a bank deposit.<br/>
                    Invest in a cryptocurrency with full or partial protection of investments
                </p>
            </div>

            <div className='wrapper grid grid-cols-5 h-full'>
                <ChooseDeposit/>
                <DepositInfo/>
            </div>
        </div>

    )
}

export default Deposit;
