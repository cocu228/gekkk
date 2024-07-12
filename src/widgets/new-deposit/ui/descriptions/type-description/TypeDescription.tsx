import { useContext } from "react";

import { getTypeDescriptions } from "@/widgets/new-deposit/model/helpers";

import { CtxNewDeposit } from "../../../model/context";

const TypeDescription = () => {
  const { type, isGkeDeposit } = useContext(CtxNewDeposit);
  const descriptions = getTypeDescriptions(isGkeDeposit);

  return <div className='col px-7 mt-[72px] xl:hidden xxl:p-5'>{descriptions[type]}</div>;
};

export default TypeDescription;
