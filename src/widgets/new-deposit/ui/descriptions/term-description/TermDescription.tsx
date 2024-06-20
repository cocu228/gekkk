import { useContext } from "react";

import { CtxNewDeposit } from "@/widgets/new-deposit/model/context";

const TermDescription = () => {
  const { term_in_days: term } = useContext(CtxNewDeposit);

  return !term ? null : (
    <div className='px-7 mt-[64px] xl:hidden xxl:p-5'>
      <p>
        You will get return in <span className='font-bold'>{term} days</span>
      </p>
    </div>
  );
};

export default TermDescription;
