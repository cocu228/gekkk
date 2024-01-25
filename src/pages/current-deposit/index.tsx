import { useContext } from 'react';
import styles from './styles.module.scss';
import { differenceInDays } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useModal from '@/shared/model/hooks/useModal';
import Balance from '@/widgets/current-deposit/ui/Balance';
import DepositStats from '@/widgets/current-deposit/ui/DepositStats';
import { getInvestmentData } from '@/widgets/current-deposit/model/helpers';
import { getDepositStrategyData } from '@/widgets/current-deposit/model/helpers';
import CurrentDepositType from '@/widgets/current-deposit/ui/CurrentDepositType';
import CurrentDepositProperties from '@/widgets/current-deposit/ui/CurrentDepositProperties';
import CurrentDepositActionsBlock from '@/widgets/current-deposit/ui/CurrentDepositActionsBlock';
import ClosingDepositModal from '@/widgets/current-deposit/ui/ClosingDepositModal';
import {apiReturnInvestment} from '@/shared/(orval)api/gek';
import {CtxCurrencies} from "@/processes/CurrenciesContext";

function CurrentDeposit() {
    const { id } = useParams();
    const navigate = useNavigate()
    const closingModal = useModal();
    const investment = null;//storeInvestments(state => state.investments)?.find(i => i.id === +id);

    if (!investment) return null;

    const {
        isFixed,
        isClosed
    } = getInvestmentData(investment);

    const strategyData = getDepositStrategyData(investment.dep_type);
    const currency = useContext(CtxCurrencies).currencies.get(investment.link_currency);

    return (
        <div className="wrapper flex flex-col flex-1">
            <div className='wrapper flex justify-between mb-10 lg:flex-col md:mb-8'>
                <Balance
                    isClosed={isClosed}
                    balance={investment.amount}
                />

                <CurrentDepositType
                    isClosed={isClosed}
                    isFixed={isFixed}
                    currency={currency}
                    strategyData={strategyData}
                />
            </div>

            <div className={`wrapper flex-1 bg-white flex flex-wrap justify-between px-10 pt-16 pb-80 rounded-md xxxl:px-8 xxxl:pt-14 xl:px-4 xl:py-6 xl:flex-col xl:gap-10 ${styles.CurrentDeposit}`}>
                {investment.dep_type !== 1 && (
                    <DepositStats
                        days={differenceInDays(new Date(), new Date(investment.date_start)) + 1}
                        amount={investment.amount}
                        linkedCurrency={investment.link_currency}
                        startingRate={investment.link_cur_start_rate}
                        strategyData={strategyData}
                        isClosed={isClosed}
                    />
                )}

                <CurrentDepositProperties
                    isClosed={isClosed}
                    opened={new Date(investment.date_start)}
                    amount={`${investment.amount} ${investment.currency_id}`}
                    closed={new Date(investment.date_end)}
                />

                {!isClosed && (<>
                    <CurrentDepositActionsBlock
                        onCloseClick={closingModal.showModal}
                    />

                    <ClosingDepositModal
                        isFixed={isFixed}
                        investment={investment}
                        strategyData={strategyData}
                        open={closingModal.isModalOpen}
                        onCancel={closingModal.handleCancel}
                        onDepositClose={() => {
                            closingModal.handleCancel();
                            
                            (async () => {
                                const {data} = await apiReturnInvestment({
                                    depositId: investment.id.toString()
                                });
                                if (data.error) return;

                                navigate('/');
                            })()
                        }}
                    />
                </>)}
            </div>
        </div>
    )
}

export default CurrentDeposit;
