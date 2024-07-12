import { useContext } from "react";

import { getGkePercent } from "@/shared/config/deposits/helpers";
import { CtxNewDeposit } from "@/widgets/new-deposit/model/context";

import ChooseButton from "../../buttons/choose-button/ChooseButton";

const PersentageChoose = () => {
  const { percentageType, structuredStrategy, isGkeDeposit: isGke, onPercentageTypeChange } = useContext(CtxNewDeposit);

  return (
    <div className='px-10 my-5 md:my-3 md:px-3'>
      <p className='text-gray-400 mb-2 font-medium text-base md:text-sm'>Choose the rate of return</p>

      <div className='flex'>
        {structuredStrategy.percentageTypes.map(pt => {
          const { risePercent, dropPercent } = getGkePercent(pt, isGke);

          return (
            <ChooseButton
              key={risePercent / dropPercent}
              isSelected={pt === percentageType}
              onClick={() => onPercentageTypeChange(pt)}
            >
              {risePercent}/{dropPercent}
            </ChooseButton>
          );
        })}
      </div>
    </div>
  );
};

export default PersentageChoose;
