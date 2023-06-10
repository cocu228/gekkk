import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import ClosingConditionsModal from '@/widgets/new-deposit/ui/modals/ClosingConditionsModal';

interface IParams {
    onCloseClick: () => void;
}

function CurrentDepositActionsBlock({onCloseClick}: IParams) {
    const conditionsModal = useModal();

    return (
        <div className='column flex flex-col items-center w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full md:order-2'>
            <Button className="w-full flex-1 mb-4" gray onClick={onCloseClick}>Close deposit</Button>
            <Button text>
                <span className="underline underline-offset-4" onClick={conditionsModal.showModal}>
                    Early closing conditions →
                </span>
            </Button>

            <ClosingConditionsModal
                open={conditionsModal.isModalOpen}
                onCancel={conditionsModal.handleCancel}
            />
        </div>
    )
}

export default CurrentDepositActionsBlock;
