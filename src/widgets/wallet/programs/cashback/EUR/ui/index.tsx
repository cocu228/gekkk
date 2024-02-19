import {useContext, useEffect} from 'react';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import CashbackCard from './CashbackCard';
import CashbackCardMobile from './CashbackCardMobile';
import Loader from '@/shared/ui/loader';
import { dealsData } from '../model/deals-data';
// import { dealsSelector } from '@/shared/store/deals/selectors';

interface IParams{
    currency:string
}

const CashbackProgram = ({currency}:IParams) => {
    const { md } = useContext(BreakpointsContext);

    // const getDeals = storeDeals(state => state.getDeals);
    // const dealsDataSelector = dealsSelector();

    // useEffect(() => {
    //     (async () => {
    //         await getDeals();
    //     })()
    // }, [])

    return (
        <>
            <div className='grid grid-cols-1 justify-center'>
                {dealsData[currency].length 
                    ? dealsData[currency].map(cashback => {
                        const { id, name, accrualPeriod, className, mobileModalColor, iconPath, conditions, isActive } = cashback;

                        return !md
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

export default CashbackProgram;
