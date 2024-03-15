import {useContext, useEffect, useState} from 'react';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import CashbackCard from './CashbackCard';
import CashbackCardMobile from './CashbackCardMobile';
import Loader from '@/shared/ui/loader';
import { dealsData } from '../model/deals-data';
// import { dealsSelector } from '@/shared/store/deals/selectors';

interface IParams{
    currency:string,
}

const CashbackProgram = ({currency}:IParams) => {
    // const getDeals = storeDeals(state => state.getDeals);
    // const dealsDataSelector = dealsSelector();

    // useEffect(() => {
    //     (async () => {
    //         await getDeals();
    //     })()
    // }, [])

    const [needMobile, setNeedMobile] = useState<boolean>(false)
    useEffect(() => {
        if(window.innerWidth < 970 || window.innerWidth > 1200 ){
            setNeedMobile(true)
        }else{
            setNeedMobile(false)
        }
        
        function handleResize() {
            if(window.innerWidth < 970 || window.innerWidth > 1200 ){
                setNeedMobile(true)
            }else{
                setNeedMobile(false)
            }
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
            <div className='grid grid-cols-1 justify-center rlative'>
                {dealsData[currency].length 
                    ? dealsData[currency].map(cashback => {
                        const { id, name, accrualPeriod, className, mobileModalColor, iconPath, conditions, isActive } = cashback;

                        return !needMobile
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
