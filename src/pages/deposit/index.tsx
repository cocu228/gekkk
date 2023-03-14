import React, {useState} from 'react';
import ChooseDeposit from "@/widgets/choose-deposit/ui/ChooseDeposit";
import InfoDeposit from "@/widgets/info-deposit/ui/InfoDeposit";


function Deposit() {

    return (

        <div className="wrapper p-4">
            <div className="-mx-4 bg-gray-50 px-4 py-2 mb-10">
                <div className="row mb-2">
                    <h2 className="text-3xl font-bold">
                        New deposit
                    </h2>
                </div>
                <div className="row">
                    <p className="text-sm font-light">
                        A modern alternative to a bank deposit.
                    </p>
                    <p className="text-sm font-light">Invest in a cryptocurrency with full or partial protection of investments</p>
                </div>
            </div>

            <div className='grid grid-cols-5'>
                <ChooseDeposit/>
                <InfoDeposit/>
            </div>
        </div>

    )
}

export default Deposit;
