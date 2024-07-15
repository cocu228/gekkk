import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Loader from "@/shared/ui/loader";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

import CashbackCard from "./ui/CashbackCard";
import { dealsData } from "./model/deals-data";
import CashbackCardMobile from "./ui/CashbackCardMobile";
import { getWindowSize } from "./model/helpers";

function Programs() {
  const [params] = useSearchParams();
  const currency = params.get("currency");
  const { sm, md, lg, xl, xxl, xxxl } = useContext(BreakpointsContext);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  //Если не использовать эту переменную,
  //то карточки при некоторых размерах ломаются.
  const needMobile =
    windowSize.innerWidth < 620 || (!lg && windowSize.innerWidth < 1050) || (!xxl && windowSize.innerWidth < 1900);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className='grid grid-cols-1 justify-center rlative'>
      {dealsData[currency].length ? (
        dealsData[currency as keyof typeof dealsData].map(cashback => {
          const { id, name, isActive, icon, className, conditions, accrualPeriod, mobileModalColor } = cashback;

          return !(sm || (!md && lg) || (!xl && xxxl) || needMobile) ? (
            <CashbackCard
              key={id}
              name={name}
              cashbackId={id}
              isActive={isActive}
              icon={icon}
              className={className}
              conditions={conditions}
              accrualPeriod={accrualPeriod}
            />
          ) : (
            <CashbackCardMobile
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
        <Loader />
      )}
    </div>
  );
}

export default Programs;
