import Button from "@/shared/ui/button/Button";
import { GetDepositOut } from "@/shared/(orval)api/gek/model";
import useModal from "@/shared/model/hooks/useModal";
import { IDepositStrategyData } from "@/widgets/current-deposit/model/helpers";
import ClosingDepositModal from "@/widgets/current-deposit/ui/ClosingDepositModal";
import ClosingConditionsModal from "@/widgets/new-deposit/ui/modals/ClosingConditionsModal";

interface IParams {
  isFixed: boolean;
  investment: GetDepositOut & { isGke: boolean };
  strategyData: IDepositStrategyData;
}

function CurrentDepositActionsBlock({ isFixed, investment, strategyData }: IParams) {
  const closingModal = useModal();
  const conditionsModal = useModal();

  return (
    <div className='column flex flex-col items-center w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full md:order-2'>
      {/*<Button className="w-full flex-1 mb-4" gray onClick={closingModal.showModal}>Close deposit</Button>*/}
      <Button className='w-full flex-1 mb-4' onClick={closingModal.showModal}>
        Close deposit
      </Button>

      {/*<Button text>*/}
      <Button>
        <span className='underline underline-offset-4' onClick={conditionsModal.showModal}>
          Early closing conditions →
        </span>
      </Button>

      <ClosingDepositModal
        isFixed={isFixed}
        investment={investment}
        strategyData={strategyData}
        open={closingModal.isModalOpen}
        onCancel={closingModal.handleCancel}
      />

      <ClosingConditionsModal open={conditionsModal.isModalOpen} onCancel={conditionsModal.handleCancel} />
    </div>
  );
}

export default CurrentDepositActionsBlock;
