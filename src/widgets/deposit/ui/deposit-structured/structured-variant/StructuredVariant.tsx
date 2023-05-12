import {addDays, format} from 'date-fns';
import {IResMarketAsset} from '@/shared/api';
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import {useContext, useEffect, useState} from 'react';
import TokenButton from '../token-button/TokenButton';
import ChooseButton from '../choose-button/ChooseButton';
import OpenDepositModal from '../../modals/OpenDepositModal';
import {CtxNewDeposit} from '@/widgets/deposit/model/context';
import ClosingConditionsModal from '../../modals/ClosingConditionsModal';
import ChooseTokenModal from '../../modals/choose-token-modal/ChooseTokenModal';
import StructedDepositStrategies from '@/shared/config/deposits/structed-strategies';
import StructuredProperties from '@/widgets/deposit/ui/deposit-structured/structured-properties/StructuredProperties';

const StructuredVariant = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const openDepositModal = useModal();
  const conditionsModal = useModal();
  const chooseTokenModal = useModal();

  const {
    step,
    rate,
    token,
    amount,
    minAmount,
    term_in_days,
    percentageType,
    structedStrategy,
    onNextStep,
    onTermChange,
    onTokenChange,
    onRiskLevelChange,
    onPersentageTypeChange,
  } = useContext(CtxNewDeposit);
  
  const depositParams = step < 5 ? null : {
    deposit: `${structedStrategy.name} strategy
      ${percentageType.risePercentage}/${percentageType.dropPercentage} XMR`,
    opened: format(new Date(), "MM.dd.yyyy 'at' HH:mm"),
    amount: amount,
    startingRate: `1 ${token.code} ~ ${rate.toFixed(2)} EURG`,
    term: `${term_in_days} days (until ${
      format(addDays(new Date(), term_in_days), "MM.dd.yyyy 'at' HH:mm")
    })`
  };

  useEffect(() => {
    setValidated(amount >= minAmount);
  }, [amount, minAmount]);

  return (
    <div className="wrapper w-full">
      {step >= 1 && (
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

      {step >= 2 && (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the rate of return
          </p>

          <div className="flex">
            {structedStrategy.percentageTypes.map((pt) => (
              <ChooseButton
                isSelected={pt === percentageType}
                onClick={() => onPersentageTypeChange(pt)}
              >{pt.risePercentage}/{pt.dropPercentage}</ChooseButton>
            ))}
          </div>
        </div>
      )}

      {step >= 3 && (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the deposit term (in days)
          </p>

          <div className="flex">
            {[90, 180, 270, 360].map((term => (
              <ChooseButton
                key={`TERM_IN_DAYS_${term}`}
                isSelected={term_in_days === term}
                onClick={() => onTermChange(term)}
              >{term} days</ChooseButton>
            )))}
          </div>
        </div>
      )}

      {step >= 4 && (
        <div className="wrapper w-full mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose a token to invest
          </p>

          <TokenButton token={token} onClick={chooseTokenModal.showModal} />
        </div>
      )}

      <div className="hidden w-full md:flex md:mb-8">
        <StructuredProperties/>
      </div>

      <div className="wrapper">
        <Button
          disabled={!validated}
          className="w-full mb-5 md:mb-3"
          onClick={step >= 5 ? openDepositModal.showModal : onNextStep}
        >
          {step >= 5 ? 'Open Deposit' : 'Next step'}
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
          onTokenChange(value);
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
