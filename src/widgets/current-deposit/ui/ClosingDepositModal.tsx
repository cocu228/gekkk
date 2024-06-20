import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { formatForCustomer } from "@/shared/lib/date-helper";
import { apiReturnInvestment } from "@/shared/(orval)api/gek";
import { GetDepositOut } from "@/shared/(orval)api/gek/model";
import Button from "@/shared/ui/button/Button";
import { Modal } from "@/shared/ui/modal/Modal";
import Loader from "@/shared/ui/loader";
import useError from "@/shared/model/hooks/useError";
import { storeInvestments } from "@/shared/store/investments/investments";

import { IDepositStrategyData } from "../model/helpers";

type IParams = {
  isFixed: boolean;
  open: boolean;
  onCancel: () => void;
  strategyData: IDepositStrategyData;
  investment: GetDepositOut & { isGke: boolean };
};

const ClosingDepositModal = ({ open, isFixed, onCancel, investment, strategyData, ...props }: IParams) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const removeInvestment = storeInvestments(state => state.removeInvestment);

  const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();

  const { strategy, percentageType } = strategyData;

  const { risePercentage, dropPercentage } = percentageType ?? {};

  function closeDeposit() {
    setLoading(true);
    localErrorClear();

    (async () => {
      const { data } = await apiReturnInvestment({ depositId: investment.id.toString() });

      if (data.error) {
        setLoading(false);
        localErrorHunter(data.error);
        return;
      }

      await removeInvestment(investment.id);
      navigate("/");
      onCancel();
    })();
  }

  return (
    <Modal title='&nbsp;' isModalOpen={open} onCancel={onCancel}>
      <div className={loading ? "collapse" : ""}>
        <p className='font-bold text-xl mb-6 md:text-lg md:mb-5'>Closing your deposit</p>
        <div className='mb-4'>
          <p className='font-medium text-gray-500 mb-1'>Deposit:</p>
          <p className='font-medium'>
            {isFixed ? (
              <span>Fixed rate deposit: {investment.isGke ? "1,6" : "0,8"}% per month</span>
            ) : (
              <span>
                Structed {strategy.name.toLowerCase()} strategydeposit {risePercentage}/{dropPercentage}
              </span>
            )}
          </p>
        </div>

        <div className='mb-4 flex justify-between'>
          <div>
            <p className='font-medium text-gray-500 mb-1'>Amount:</p>
            <p className='font-medium'>
              {investment.amount} {investment.currency_id}
            </p>
          </div>
          <div>
            <p className='font-medium text-gray-500 mb-1'>Until:</p>
            <p className='font-medium'>{formatForCustomer(investment.date_end)}</p>
          </div>
        </div>

        <div className='mb-8 md:mb-4'>
          <p className='font-medium text-gray-500 mb-1'>Your balance if you close the deposit now:</p>
          <p className='font-medium'>
            {investment.amount} {investment.currency_id}
          </p>
        </div>

        {localIndicatorError && <div className='mb-4'>{localErrorInfoBox}</div>}

        <Button className='w-full rounded-b disabled:opacity-50' onClick={closeDeposit}>
          Confirm
        </Button>
      </div>

      {loading && <Loader />}
    </Modal>
  );
};

export default ClosingDepositModal;
