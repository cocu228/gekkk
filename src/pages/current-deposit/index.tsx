import { differenceInDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetDepositOut } from "@/shared/(orval)api/gek/model";
import Loader from "@/shared/ui/loader";
import Balance from "@/widgets/current-deposit/ui/Balance";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import DepositStats from "@/widgets/current-deposit/ui/DepositStats";
import { storeInvestments } from "@/shared/store/investments/investments";
import { getInvestmentData, getDepositStrategyData } from "@/widgets/current-deposit/model/helpers";
import CurrentDepositType from "@/widgets/current-deposit/ui/CurrentDepositType";
import CurrentDepositProperties from "@/widgets/current-deposit/ui/CurrentDepositProperties";
import CurrentDepositActionsBlock from "@/widgets/current-deposit/ui/CurrentDepositActionsBlock";

import styles from "./styles.module.scss";

function CurrentDeposit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currencies } = useContext(CtxCurrencies);
  const storeInvests = storeInvestments(state => state.investments);
  const [investment, setInvestment] = useState<GetDepositOut & { isGke: boolean }>(null);

  useEffect(() => {
    setInvestment(null);
    const invest = storeInvests?.find(i => i.id === +id);

    if (storeInvests && !invest) navigate("/");

    setInvestment(invest);
  }, [storeInvests, id]);

  if (!investment) return <Loader />;

  const { isFixed, isClosed } = getInvestmentData(investment);

  const strategyData = getDepositStrategyData(investment.dep_type);

  return (
    <div className='wrapper flex flex-col flex-1'>
      <div className='wrapper flex justify-between mb-10 lg:flex-col md:mb-8'>
        <Balance isGke={investment.isGke} isClosed={isClosed} balance={investment.amount} />

        <CurrentDepositType
          isFixed={isFixed}
          isClosed={isClosed}
          isGke={investment.isGke}
          strategyData={strategyData}
          token={currencies?.get(investment.link_currency)}
        />
      </div>

      <div
        className={`wrapper flex-1 bg-white flex flex-wrap justify-between px-10 pt-16 pb-80 rounded-md xxxl:px-8 xxxl:pt-14 xl:px-4 xl:py-6 xl:flex-col xl:gap-10 ${styles.CurrentDeposit}`}
      >
        {![1, 101].includes(investment.dep_type) && (
          <DepositStats
            isClosed={isClosed}
            isGke={investment.isGke}
            amount={investment.amount}
            strategyData={strategyData}
            linkedCurrency={investment.link_currency}
            startingRate={investment.link_cur_start_rate}
            days={differenceInDays(new Date(), new Date(investment.date_start)) + 1}
          />
        )}

        <CurrentDepositProperties
          isClosed={isClosed}
          isGke={investment.isGke}
          amount={investment.amount}
          currency={investment.currency_id}
          closed={new Date(investment.date_end)}
          opened={new Date(investment.date_start)}
        />

        {!isClosed && (
          <>
            <CurrentDepositActionsBlock isFixed={isFixed} investment={investment} strategyData={strategyData} />
          </>
        )}
      </div>
    </div>
  );
}

export default CurrentDeposit;
