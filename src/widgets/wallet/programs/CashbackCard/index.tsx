import { useSearchParams } from "react-router-dom";

import Loader from "@/shared/ui/loader";

import { dealsData } from "./model/deals-data";
import CashbackCard from "./ui/CashbackCard";

function Programs() {
  const [params] = useSearchParams();
  const currency = params.get("currency");

  return (
    <div className='grid grid-cols-1 justify-center rlative'>
      {dealsData[currency].length ? (
        dealsData[currency as keyof typeof dealsData].map(cashback => {
          const { id, name, isActive, icon, className, conditions, accrualPeriod, mobileModalColor } = cashback;

          return (
            <CashbackCard
              key={id}
              name={name}
              cashbackId={id}
              isActive={isActive}
              icon={icon}
              className={className}
              conditions={conditions}
              accrualPeriod={accrualPeriod}
              modalColor={mobileModalColor}
            />
          );
        })
      ) : (
        <div className="min-h-[100px]">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Programs;
