import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Button from "@/shared/ui/button/Button";
import { apiCreateInvestment } from "@/shared/(orval)api/gek";
import useModal from "@/shared/model/hooks/useModal";
import { InvestmentsTypeEnum } from "@/shared/(orval)api/gek/model";
import { DepositType } from "@/shared/config/deposits/types";
import { CtxNewDeposit } from "@/widgets/new-deposit/model/context";
import { storeInvestments } from "@/shared/store/investments/investments";

import OpenDepositModal from "../../modals/OpenDepositModal";
import ClosingConditionsModal from "../../modals/ClosingConditionsModal";
import DepositProperties from "../../descriptions/deposit-properties/DepositProperties";

const OpenDeposit = () => {
  const navigate = useNavigate();
  const conditionsModal = useModal();
  const openDepositModal = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const addInvestment = storeInvestments(state => state.addInvestment);

  const {
    type,
    step,
    amount,
    minAmount,
    term_in_days,
    tokenCurrency,
    percentageType,
    structuredStrategy,
    isGkeDeposit: isGke,
    onNextStep
  } = useContext(CtxNewDeposit);

  useEffect(() => {
    setValidated(+amount >= minAmount);
  }, [amount, minAmount]);

  return (
    <div className='px-10 my-10 md:my-5 xxl:py-3 md:px-4'>
      <DepositProperties className='hidden md:-mx-[6px] xxxl:flex md:pt-8 xxxl:mb-4' />

      <div className='wrapper'>
        <Button
          disabled={!validated}
          className='w-full mb-5 md:mb-3'
          onClick={step >= 5 || type === DepositType.FIXED ? openDepositModal.showModal : onNextStep}
        >
          {step >= 5 || type === DepositType.FIXED ? "Open Deposit" : "Next step"}
        </Button>
      </div>

      <div className='row mb-20 md:mb-10'>
        <p className='text-gray-500 text-center text-xs'>
          The deposit services are provided by Adventarium PTE.LTD. By pressing button "Open deposit" I confirm that I
          have read carefully and fully accepted.
          <br />
          <a
            className='font-inherit text-blue-300 underline'
            href='https://gekkoin.com/source/GeneralTermsandConditions.pdf'
            target='_blank'
            rel='noreferrer noopener'
          >
            Terms and Conditions with Risk Disclosure here
          </a>
        </p>
      </div>

      {/*<Button text onClick={conditionsModal.showModal}>*/}
      <button onClick={conditionsModal.showModal}>
        <span className='underline underline-offset-4 text-gray-400 md:text-sm'>Early closing conditions →</span>
      </button>

      <OpenDepositModal
        loading={loading}
        open={openDepositModal.isModalOpen}
        onCancel={openDepositModal.handleCancel}
        onConfirm={() => {
          setLoading(true);
          (async () => {
            const { data } = await apiCreateInvestment({
              amount: +amount,
              term_days: type === DepositType.FIXED ? 360 : term_in_days,
              link_currency: type === DepositType.FIXED ? "EURG" : tokenCurrency,
              depo_template_type: ((isGke ? 100 : 0) +
                (type === DepositType.FIXED
                  ? 1
                  : structuredStrategy.id +
                    structuredStrategy.percentageTypes.indexOf(percentageType))) as InvestmentsTypeEnum
            });

            if (!data.error) {
              await addInvestment(data.result);
              navigate(`/deposit/${data.result.id}`);
            }

            setLoading(false);
            openDepositModal.handleCancel();
          })();
        }}
      />

      <ClosingConditionsModal open={conditionsModal.isModalOpen} onCancel={conditionsModal.handleCancel} />
    </div>
  );
};

export default OpenDeposit;
