import React from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';

const CryptoDeposits = () => {

    return (
        <div className="wrapper">
            <PageHead
                subtitle={"A modern alternative to a bank deposit. Invest in the Gekkoin virtual products with full or partial protection of capital. \n" +
                    "Return is calculated at the end of the deposits term. The most profitable for you value will be chosen."}
                title={"Crypto deposits"}/>

            <div className="substrate flex flex-col">
                <div className="row flex flex-wrap gap-8">
                    <div className="col w-25 flex flex-col">
                        <h2>Fixed rate deposits</h2>
                    </div>
                </div>
                <div className="row mt-6">
                    <div className="col">
                        <h4>0,8% per month</h4>
                    </div>
                </div>
                <div className="row mt-6">
                    <div className="col">
                        <p>The fixed rate deposit allows you to know exactly how much interest you'll earn on your
                            savings over a specific period</p>
                    </div>
                </div>
                <div className="row flex flex-wrap mt-6">
                    <div className="col">
                        <div className="flex items-center gap-2 md:flex-col">
                            <p className="text-gray-400 text-sm">Return</p>
                            <div className="flex gap-1">
                                <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full"/>
                                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="flex items-center gap-2 md:flex-col">
                            <p className="text-gray-400 text-sm">Risk</p>
                            <div className="flex gap-1">
                                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CryptoDeposits