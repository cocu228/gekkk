import { useContext } from 'react';
import Loader from '@/shared/ui/loader';
import CashbackCard from './CashbackCard';
import { dealsData } from '../model/deals-data';
import { useSearchParams } from 'react-router-dom';
import CashbackCardMobile from './CashbackCardMobile';
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';

function Programs() {
    const [params] = useSearchParams();
    const currency = params.get("currency");
    const {sm, md, lg, xl, xxl, xxxl} = useContext(BreakpointsContext);

    return (
        <div className='grid grid-cols-1 justify-center rlative'>
            {dealsData[currency].length 
                ? dealsData[currency].map(cashback => {
                    const {
                        id,
                        name,
                        isActive,
                        icon,
                        className,
                        conditions,
                        accrualPeriod,
                        mobileModalColor
                    } = cashback;

                    return !(sm || (!md && lg) || (!xl && xxxl))
                    ? (
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
                    )
                })
                : <Loader />
            }
        </div>
    );
}

export default Programs;
