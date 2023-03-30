import React from 'react';
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import OpenDepositModal from '../../modals/OpenDepositModal';
import ClosingConditionsModal from '../../modals/ClosingConditionsModal';
import ChooseButton from '../choose-button/ChooseButton';
import ChooseTokenModal from '../../modals/choose-token-modal/ChooseTokenModal';
import TokenButton from '../token-button/TokenButton';

const StructuredTypeBlock = () => {
  const openDepositModal = useModal();
  const conditionsModal = useModal();
  const chooseTokenModal = useModal();

  const depositParams = {
    deposit: 'Safe strategy 16/4 XMR',
    opened: '25.01.2023 at 16:04',
    amount: '100 EURG',
    startingRate: '1 XMR ~ 141.68 EUR',
    term: '90 days (until 25.04.2023 at 16:04)',
  };

  return (
    <div className="wrapper w-full">
      <div className="wrapper mb-8">
        <p className="text-gray mb-2 font-medium text-base md:text-sm">
          Choose the risk level
        </p>

        <div className="flex">
          <ChooseButton>
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full">
              <div>
                <p className="font-medium text-xl mb-1">Safe strategy</p>
                <p className="text-gray text-sm">
                  Guaranteed profit and risk protection
                </p>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Return</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </ChooseButton>
          <ChooseButton>
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full">
              <div>
                <p className="font-medium text-xl mb-1">Balanced strategy</p>
                <p className="text-gray text-sm">Minimal risk</p>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-red rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Return</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </ChooseButton>
          <ChooseButton>
            <div className="flex flex-col items-start text-start gap-3 justify-between h-full">
              <div>
                <p className="font-medium text-xl mb-1">Dynamic strategy</p>
                <p className="text-gray text-sm">
                  Good percentage and perdectible risk
                </p>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Risk</p>
                  <div className="flex gap-1">
                    <div className="w-[0.5rem] h-[0.5rem] bg-red rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-red rounded-full" />
                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm">Return</p>
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

      <div className="wrapper mb-8">
        <p className="text-gray mb-2 font-medium text-base mb-1 md:text-sm">
          Choose the rate of return
        </p>

        <div className="flex">
          <ChooseButton>16/4</ChooseButton>
          <ChooseButton>17/3</ChooseButton>
          <ChooseButton>18/2</ChooseButton>
        </div>
      </div>

      <div className="wrapper mb-8">
        <p className="text-gray mb-2 font-medium text-base mb-1 md:text-sm">
          Choose the deposit term (in days)
        </p>

        <div className="flex">
          <ChooseButton>90 days</ChooseButton>
          <ChooseButton>180 days</ChooseButton>
          <ChooseButton>270 days</ChooseButton>
          <ChooseButton>360 days</ChooseButton>
        </div>
      </div>

      <div className="wrapper w-full mb-8">
        <p className="text-gray mb-2 font-medium text-base md:text-sm">
          Choose a token to invest
        </p>

        <TokenButton onClick={chooseTokenModal.showModal} />
      </div>

      <div className="wrapper">
        <Button
          className="w-full mb-5 md:mb-3"
          onClick={openDepositModal.showModal}
        >
          Open Deposit
        </Button>
      </div>

      <div className="row mb-20">
        <p className="text-gekGray text-center text-xs">
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
        <span className="underline underline-offset-4">
          Early closing conditions →
        </span>
      </Button>

      <ChooseTokenModal
        open={chooseTokenModal.isModalOpen}
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

export default StructuredTypeBlock;
