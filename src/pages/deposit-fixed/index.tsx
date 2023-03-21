import React, {useState} from 'react';
import Parameter from '@/shared/ui/parameter';
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import ClosingDepositModal from '@/widgets/deposit/ui/modals/ClosingDepositModal';
import ClosingConditionsModal from '@/widgets/deposit/ui/modals/ClosingConditionsModal';

function DepositFixed() {
    const closingModal = useModal();
    const conditionsModal = useModal();

    return (
        <div className="wrapper flex flex-col flex-1 pb-14">
            <div className='row flex justify-between mb-10'>
                <div className='column flex gap-5'>
                    <img className='h-[3.2rem]' src="/public/img/icon/DepositGradientIcon.svg" alt="strategy"/>
                    <div className='column'>
                        <p className='font-medium text-gray mb-2'>Current balance</p>
                        <p className='font-bold text-2xl whitespace-nowrap'>1 000.00 EURG</p>
                    </div>
                </div>
                <div className='column'>
                    <p className='text-3xl font-bold mb-4'>Fixed rate deposit</p>
                    <div className='row flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <img src="/public/img/icon/DepositStrategyIcon.svg" alt="strategy"/>
                            <p className='font-medium'>Fixed rate</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <img src="/public/img/icon/DepositPercentIcon.svg" alt="percent"/>
                            <p className='font-medium'>0,8% per month</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row flex-1 bg-white flex justify-between px-10 py-16 rounded-md'>
                <div className="column w-[26rem] h-[6rem]">
                    <Parameter left="Opened" right="25.01.2023 at 16:04"/>
                    <Parameter left="Amount" right="1000 EURG"/>
                    <Parameter left="Term" right="360 days (until 22.02.24 at 16:04)"/>
                </div>
                <div className='column flex flex-col items-center w-[26rem] h-[6rem]'>
                    <Button className="w-full flex-1 mb-4" gray onClick={closingModal.showModal}>Close deposit</Button>
                    <Button text><span className="underline underline-offset-4" onClick={conditionsModal.showModal}>Early closing conditions →</span></Button>
                </div>
            </div>

            <ClosingDepositModal isModalOpen={closingModal.isModalOpen} handleCancel={closingModal.handleCancel}/>
            <ClosingConditionsModal isModalOpen={conditionsModal.isModalOpen} handleCancel={conditionsModal.handleCancel}/>
        </div>
    )
}

export default DepositFixed;
