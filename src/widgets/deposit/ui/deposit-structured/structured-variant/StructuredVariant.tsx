import React, { useContext, useEffect, useState } from 'react';
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import OpenDepositModal from '../../modals/OpenDepositModal';
import ClosingConditionsModal from '../../modals/ClosingConditionsModal';
import ChooseButton from '../choose-button/ChooseButton';
import ChooseTokenModal from '../../modals/choose-token-modal/ChooseTokenModal';
import TokenButton from '../token-button/TokenButton';
import StructuredProperties from '@/widgets/deposit/ui/deposit-structured/structured-properties/StructuredProperties';
import {CtxNewDeposit} from '@/widgets/deposit/model/context';
import StructedDepositStrategies from '@/shared/config/deposits/structed-strategies';
import {IResMarketAsset} from '@/shared/api';

const StructuredVariant = () => {
  const openDepositModal = useModal();
  const conditionsModal = useModal();
  const chooseTokenModal = useModal();
  const context = useContext(CtxNewDeposit);
  const {structedStrategy, onRiskLevelChange} = useContext(CtxNewDeposit);
  const [validated, setValidated] = useState<boolean>(false);

  const depositParams = {
    deposit: 'Safe strategy 16/4 XMR',
    opened: '25.01.2023 at 16:04',
    amount: '100 EURG',
    startingRate: '1 XMR ~ 141.68 EUR',
    term: '90 days (until 25.04.2023 at 16:04)',
  };

  useEffect(() => {
    const {
      amount,
      minAmount,
    } = context;

    setValidated(amount >= minAmount);
  }, [context]);

  return (
    <div className="wrapper w-full">
      {context.step >= 1 && (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the risk level
          </p>

          <div className="flex">
            {StructedDepositStrategies.map((strategy) => (
              <ChooseButton
                key={`STRATEGY_${strategy.id}`}
                isSelected={structedStrategy === strategy}
                onClick={() => onRiskLevelChange(strategy)}
              >
                <div className="flex flex-col items-start text-start gap-3 justify-between h-full w-full md:items-center">
                  <div>
                    <p className="font-medium text-xl mb-1 md:text-sm md:text-center">{strategy.name} strategy</p>
                    <p className="text-gray-400 text-sm md:hidden">
                      {strategy.descriptionShort}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between w-full md:flex-col gap-2 xxl:gap-1">
                    <div className="flex items-center gap-2 md:flex-col">
                      <p className="text-gray-400 text-sm">Risk</p>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((_, index) => ( 
                          <div className={`${index >= strategy.riskPoints ? 'bg-gray-200' : 'bg-red-800'} w-[0.5rem] h-[0.5rem] rounded-full`}/>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:flex-col">
                      <p className="text-gray-400 text-sm">Return</p>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((_, index) => (
                          <div className={`${index >= strategy.returnPoints ? 'bg-gray-200' : 'bg-green'} w-[0.5rem] h-[0.5rem] rounded-full`}/>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ChooseButton>
            ))}
          </div>
        </div>
      )}

      {context.step >= 2 && (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the rate of return
          </p>

          <div className="flex">
            {context.structedStrategy.percentageTypes.map((percentageType) => (
              <ChooseButton
                isSelected={context.percentageType === percentageType}
                onClick={() => context.onPersentageTypeChange(percentageType)}
              >{percentageType.risePercentage}/{percentageType.dropPercentage}</ChooseButton>
            ))}
          </div>
        </div>
      )}

      {context.step >= 3 && (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the deposit term (in days)
          </p>

          <div className="flex">
            {[90, 180, 270, 360].map((term => (
              <ChooseButton
                key={`TERM_IN_DAYS_${term}`}
                isSelected={context.term_in_days === term}
                onClick={() => context.onTermChange(term)}
              >{term} days</ChooseButton>
            )))}
          </div>
        </div>
      )}

      {context.step >= 4 && (
        <div className="wrapper w-full mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose a token to invest
          </p>

          <TokenButton token={context.token} onClick={chooseTokenModal.showModal} />
        </div>
      )}

      <div className="hidden w-full md:flex md:mb-8">
        <StructuredProperties/>
      </div>

      <div className="wrapper">
        <Button
          disabled={!validated}
          className="w-full mb-5 md:mb-3"
          onClick={context.step >= 5 ? openDepositModal.showModal : context.onNextStep}
        >
          {context.step >= 5 ? 'Open Deposit' : 'Next step'}
        </Button>
      </div>

      <div className="row mb-20">
        <p className="text-gray-500 text-center text-xs">
          The deposit services are provided by Adventarium PTE.LTD. By pressing
          button "Open deposit" I confirm that I have read carefully and fully
          accepted{' '}
          <a
            className="font-inherit text-blue-300 underline"
            href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms and Conditions with Risk Disclosure here
          </a>
        </p>
      </div>

      <Button text onClick={conditionsModal.showModal}>
        <span className="underline underline-offset-4 text-gray-400 md:text-sm">
          Early closing conditions →
        </span>
      </Button>

      <ChooseTokenModal
        open={chooseTokenModal.isModalOpen}
        onSelect={(value: IResMarketAsset) => {
          context.onTokenChange(value);
          chooseTokenModal.handleCancel();
        }}
        onCancel={chooseTokenModal.handleCancel}
      />
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

export default StructuredVariant;
