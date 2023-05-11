import React, { useContext, useEffect, useState } from 'react';
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import OpenDepositModal from '../../modals/OpenDepositModal';
import ClosingConditionsModal from '../../modals/ClosingConditionsModal';
import ChooseButton from '../choose-button/ChooseButton';
import ChooseTokenModal from '../../modals/choose-token-modal/ChooseTokenModal';
import TokenButton from '../token-button/TokenButton';
import StructuredProperties from '@/widgets/deposit/ui/deposit-structured/structured-properties/StructuredProperties';
import { CtxNewDeposit } from '@/widgets/deposit/model/context';
import { PercentageType } from '@/widgets/deposit/model/types';
import { IResMarketAsset } from '@/shared/api';
import { RiskLevel } from '@/shared/config/deposits/risk-level';

const StructuredVariant = () => {
  const openDepositModal = useModal();
  const conditionsModal = useModal();
  const chooseTokenModal = useModal();
  const context = useContext(CtxNewDeposit);
  const {riskLevel, riskLevelChange} = useContext(CtxNewDeposit);
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
      token,
      amount,
      minAmount,
      riskLevel,
      term_in_days,
      percentageType
    } = context;

    setValidated(
      riskLevel !== null &&
      amount >= minAmount &&
      percentageType !== null &&
      term_in_days !== null &&
      token !== null
    );
  }, [context])

  return (
    <div className="wrapper w-full">
      <div className="wrapper mb-8">
        <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
          Choose the risk level
        </p>

        <div className="flex">
          <ChooseButton
            isSelected={riskLevel === RiskLevel.SAFE}
            onClick={() => riskLevelChange(RiskLevel.SAFE)}
          >
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full w-full md:items-center">
              <div>
                <p className="font-medium text-xl mb-1 md:text-sm md:text-center">Safe strategy</p>
                <p className="text-gray-400 text-sm md:hidden">
                  Guaranteed profit and risk protection
                </p>
              </div>
              <div className="flex flex-wrap justify-between w-full md:flex-col gap-2 xxl:gap-1">
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Return</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </ChooseButton>
          <ChooseButton
            isSelected={context.riskLevel === RiskLevel.BALANCED}
            onClick={() => context.riskLevelChange(RiskLevel.BALANCED)}
          >
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full w-full md:items-center">
              <div>
                <p className="font-medium text-xl mb-1 md:text-sm md:text-center">Balanced strategy</p>
                <p className="text-gray-400 text-sm md:hidden">Minimal risk</p>
              </div>
              <div className="flex flex-wrap justify-between w-full md:flex-col gap-2 xxl:gap-1">
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-red-800 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Return</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </ChooseButton>
          <ChooseButton
            isSelected={context.riskLevel === RiskLevel.DYNAMIC}
            onClick={() => context.riskLevelChange(RiskLevel.DYNAMIC)}
          >
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full w-full md:items-center">
              <div>
                <p className="font-medium text-xl mb-1 md:text-sm md:text-center">Dynamic strategy</p>
                <p className="text-gray-400 text-sm md:hidden">
                  Good percentage and perdectible risk
                </p>
              </div>
              <div className="flex flex-wrap justify-between w-full md:flex-col gap-2 xxl:gap-1">
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-red-800 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-red-800 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 md:flex-col">
                  <p className="text-gray-400 text-sm">Return</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </ChooseButton>
        </div>
      </div>

      {context.riskLevel === null ? null : (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the rate of return
          </p>

          <div className="flex">
            <ChooseButton
              isSelected={context.percentageType === PercentageType.MIN}
              onClick={() => context.persentageTypeChange(PercentageType.MIN)}
            >16/4</ChooseButton>
            <ChooseButton
              isSelected={context.percentageType === PercentageType.MID}
              onClick={() => context.persentageTypeChange(PercentageType.MID)}
            >17/3</ChooseButton>
            <ChooseButton
              isSelected={context.percentageType === PercentageType.MAX}
              onClick={() => context.persentageTypeChange(PercentageType.MAX)}
            >18/2</ChooseButton>
          </div>
        </div>
      )}

      {context.percentageType === null ? null :  (
        <div className="wrapper mb-8">
          <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
            Choose the deposit term (in days)
          </p>

          <div className="flex">
            <ChooseButton
              isSelected={context.term_in_days === 90}
              onClick={() => context.termChange(90)}
            >90 days</ChooseButton>
            <ChooseButton
              isSelected={context.term_in_days === 180}
              onClick={() => context.termChange(180)}
            >180 days</ChooseButton>
            <ChooseButton
              isSelected={context.term_in_days === 270}
              onClick={() => context.termChange(270)}
            >270 days</ChooseButton>
            <ChooseButton
              isSelected={context.term_in_days === 360}
              onClick={() => context.termChange(360)}
            >360 days</ChooseButton>
          </div>
        </div>
      )}

      {context.term_in_days === null ? null : (
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
          onClick={openDepositModal.showModal}
        >
          Open Deposit
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
          context.tokenChange(value);
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
