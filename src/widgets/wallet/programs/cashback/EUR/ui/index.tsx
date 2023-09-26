import {useContext, useEffect} from 'react';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import CashbackCard from './CashbackCard';
import CashbackCardMobile from './CashbackCardMobile';
import Loader from '@/shared/ui/loader';
import { IStoreDeals, storeDeals } from '@/shared/store/deals/deals';

const getDealsSelector = (state: IStoreDeals) => state.getDeals;



const EurCashbackProgram = () => {
    const { sm } = useContext(BreakpointsContext);

    const getDeals = storeDeals(getDealsSelector);
    const resetDeals = storeDeals(state => state.resetDeals);
    const deals = storeDeals(state => state.deals);


    useEffect(() => {
        (async () => {
            await getDeals();
        })()
       
        return () => {
            resetDeals()
        }
    }, [])

    return (
        <>
            <div className='grid grid-cols-1 justify-center'>
                {deals.length > 1 
                    ? deals.map(cashback => {
                        const { id, name, accrualPeriod, className, mobileModalColor, iconPath, conditions, isActive } = cashback;

                        return !sm
                        ? (
                            <CashbackCard
                                key={id}
                                cashbackId={id}
                                name={name}
                                accrualPeriod={accrualPeriod}
                                className={className}
                                iconPath={iconPath}
                                conditions={conditions}
                                isActive={isActive}
                            />
                        )
                        : (
                            <CashbackCardMobile
                                key={id}
                                cashbackId={id}
                                name={name}
                                accrualPeriod={accrualPeriod}
                                className={className}
                                modalColor={mobileModalColor}
                                iconPath={iconPath}
                                conditions={conditions}
                                isActive={isActive}

                            />
                        )
                    })
                    : <Loader />
                }
            </div>
        </>
    );
};

export default EurCashbackProgram;
