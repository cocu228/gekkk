import React, {useState} from 'react';
import InlineProperty from '@/shared/ui/inline-property';
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import ClosingDepositModal from '@/widgets/deposit/ui/modals/ClosingDepositModal';
import ClosingConditionsModal from '@/widgets/deposit/ui/modals/ClosingConditionsModal';

function DepositFixed() {
    const closingModal = useModal();
    const conditionsModal = useModal();

    return (
        <div className="wrapper flex flex-col flex-1">
            <div className='wrapper flex justify-between mb-10 lg:flex-col md:mb-8'>
                <div className='column flex gap-5 lg:mb-6 md:items-center md:mb-4'>
                    <img className='h-[3.2rem] md:h-[2.6rem]' src="/public/img/icon/DepositGradientIcon.svg" alt="strategy"/>
                    <div className='column'>
                        <p className='font-medium text-gray mb-2 md:font-bold md:text-sm md:mb-1'>Current balance</p>
                        <p className='font-bold text-2xl whitespace-nowrap'>1 000.00 EURG</p>
                    </div>
                </div>
                <div className='column'>
                    <p className='text-3xl font-bold mb-4 md:hidden'>Fixed rate deposit</p>
                    <div className='row flex justify-between lg:justify-start lg:gap-8'>
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

            <div className='wrapper flex-1 bg-white flex justify-between px-10 pt-16 pb-80 rounded-md xxxl:px-8 xxxl:pt-14 xl:px-4 xl:py-6 xl:flex-col xl:gap-10 md:bg-transparent md:p-0'>
                <div className="column w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full">
                    <InlineProperty left="Opened" right="25.01.2023 at 16:04"/>
                    <InlineProperty left="Amount" right="1000 EURG"/>
                    <InlineProperty left="Term" right="360 days (until 22.02.24 at 16:04)"/>
                </div>
                <div className='column flex flex-col items-center w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full'>
                    <Button className="w-full flex-1 mb-4" gray onClick={closingModal.showModal}>Close deposit</Button>
                    <Button text><span className="underline underline-offset-4" onClick={conditionsModal.showModal}>Early closing conditions →</span></Button>
                </div>
            </div>

            <ClosingDepositModal open={closingModal.isModalOpen} onCancel={closingModal.handleCancel}/>
            <ClosingConditionsModal open={conditionsModal.isModalOpen} onCancel={conditionsModal.handleCancel}/>
        </div>
    )
}

export default DepositFixed;
