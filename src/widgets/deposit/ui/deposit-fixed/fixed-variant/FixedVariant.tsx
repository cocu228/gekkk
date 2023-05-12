import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import {useContext, useEffect, useState} from 'react';
import {CtxNewDeposit} from '@/widgets/deposit/model/context';
import OpenDepositModal from '@/widgets/deposit/ui/modals/OpenDepositModal';
import ClosingConditionsModal from '@/widgets/deposit/ui/modals/ClosingConditionsModal';

const FixedVariant = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const openDepositModal = useModal();
  const conditionsModal = useModal();

  const {
    amount,
    minAmount,
  } = useContext(CtxNewDeposit);

  const depositParams = {
    deposit: 'Fixed rate deposit: 0,8% per month',
    opened: '25.01.2023 at 16:04',
    amount: '1000 EURG',
    payments: 'Every 30 days',
    term: '360 days (until 22.02.2024 at 16:04)'
  }

  useEffect(() => {
    setValidated(amount >= minAmount);
  }, [amount, minAmount]);
  
  return (
    <div className="wrapper w-full">
      <Button
        disabled={!validated}
        className="w-full mb-5 md:mb-3"
        onClick={openDepositModal.showModal}
      >
        Open deposit
      </Button>

      <div className="row mb-20 xxl:mb-40 xl:mb-8 md:mb-6">
        <p className="text-gray-500 text-center text-xs">
          The deposit services are provided by Adventarium PTE.LTD. By pressing
          button "Open deposit" I confirm that I have read carefully and fully
          accepted.{' '}
          <a
            className="font-inherit text-blue-300 underline"
            href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms and Conditions with Risk Disclosure
          </a>
        </p>
      </div>

      <Button text>
        <span
          className="underline underline-offset-4 text-gray-400 md:text-sm"
          onClick={conditionsModal.showModal}
        >
          Early closing conditions →
        </span>
      </Button>

      <OpenDepositModal
        open={openDepositModal.isModalOpen}
        onCancel={openDepositModal.handleCancel}
        depositParams={depositParams}
      />
      <ClosingConditionsModal
        open={conditionsModal.isModalOpen}
        onCancel={conditionsModal.handleCancel}
      />
    </div>
  );
};

export default FixedVariant;
