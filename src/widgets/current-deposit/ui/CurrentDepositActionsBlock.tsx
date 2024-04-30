import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import ClosingConditionsModal from '@/widgets/new-deposit/ui/modals/ClosingConditionsModal';
import { useTranslation } from "react-i18next";

interface IParams {
    onCloseClick: () => void;
}

function CurrentDepositActionsBlock({onCloseClick}: IParams) {
    const conditionsModal = useModal();
    const {t} = useTranslation()

    return (
        <div className='column flex flex-col items-center w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full md:order-2'>
            <Button className="w-full flex-1 mb-4" variant="gray" onClick={onCloseClick}>{t("close_deposit")}</Button>
            <Button variant='text'>
                <span className="underline underline-offset-4" onClick={conditionsModal.showModal}>
                    {t("early_closing_conditions")} →
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
