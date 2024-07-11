import { format } from "date-fns";
import { useContext } from "react";

import { Modal } from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import InlineProperty from "@/shared/ui/inline-property";
import { DepositType } from "@/shared/config/deposits/types";
import { getGkePercent } from "@/shared/config/deposits/helpers";

import { CtxNewDeposit } from "../../model/context";
import { getTermEnd } from "../../model/helpers";

interface IParams {
  loading?: boolean;
  onConfirm?: () => void;
  open: boolean;
  onCancel: () => void;
}

const OpenDepositModal = ({ open, loading, onCancel, onConfirm }: IParams) => {
  const {
    type,
    rate,
    amount,
    term_in_days,
    tokenCurrency,
    percentageType,
    structuredStrategy,
    isGkeDeposit: isGke
  } = useContext(CtxNewDeposit);

  const { risePercent, dropPercent } = getGkePercent(percentageType, isGke);

  return (
    <Modal title='&nbsp;' isModalOpen={open} onCancel={onCancel}>
      <p className='font-bold text-xl'>Your deposit parameters</p>

      <div className='flex flex-col gap-3 md:gap-2 pt-5 pb-8'>
        <InlineProperty
          left='Deposit'
          right={
            type === DepositType.FIXED
              ? `Fixed rate deposit: ${isGke ? "1,6" : "0,8"}% per month`
              : `${structuredStrategy?.name} strategy 
                            ${risePercent}/${dropPercent} ${tokenCurrency}`
          }
        />
        <InlineProperty left='Opened' right={format(new Date(), "dd.MM.yyyy 'at' HH:mm")} />
        <InlineProperty left='Deposit amount' right={`${amount} EURG`} />

        {!isGke ? null : <InlineProperty left='Locked GKE amount' right={`${amount} GKE`} />}

        {type === DepositType.FIXED && <InlineProperty left='Payments' right='Every 30 days' />}
        {type === DepositType.STRUCTED && (
          <InlineProperty left='Starting rate' right={`1 ${tokenCurrency} ~ ${rate?.toFixed(2)} EURG`} />
        )}
        <InlineProperty
          left='Term'
          right={`${type === DepositType.FIXED ? 360 : term_in_days} days
                        (until ${getTermEnd(new Date(), type === DepositType.FIXED ? 360 : term_in_days)})`}
        />
      </div>

      <Button
        disabled={loading}
        onClick={onConfirm}
        className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"}
      >
        Confirm
      </Button>
    </Modal>
  );
};

export default OpenDepositModal;
