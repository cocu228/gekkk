import React from 'react';
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import ClosingDepositModal from '@/widgets/deposit/ui/modals/ClosingDepositModal';
import ClosingConditionsModal from '@/widgets/deposit/ui/modals/ClosingConditionsModal';

function CurrentDepositActionsBlock() {
    const closingModal = useModal();
    const conditionsModal = useModal();

    return (
      <div className='column flex flex-col items-center w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full'>
        <Button className="w-full flex-1 mb-4" gray onClick={closingModal.showModal}>Close deposit</Button>
        <Button text><span className="underline underline-offset-4" onClick={conditionsModal.showModal}>Early closing conditions →</span></Button>

        <ClosingDepositModal open={closingModal.isModalOpen} onCancel={closingModal.handleCancel}/>
        <ClosingConditionsModal open={conditionsModal.isModalOpen} onCancel={conditionsModal.handleCancel}/>
      </div>
    )
}

export default CurrentDepositActionsBlock;