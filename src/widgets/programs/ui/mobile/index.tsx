import Loader from '@/shared/ui/loader';
import { useSearchParams } from 'react-router-dom';
import { dealsData } from '@/widgets/wallet/programs/cashback/EUR/model/deals-data';
import CashbackCardMobile from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCardMobile';

export default function ProgramsMobile() {
    const [params] = useSearchParams();
    const currency = params.get("currency");
    
    
    return (
        <div className='grid grid-cols-1 justify-center rlative'>
            {dealsData[currency].length 
                ? dealsData[currency].map(cashback => {
                    const { id, name, accrualPeriod, className, mobileModalColor, iconPath, conditions, isActive } = cashback;

                    return(
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
    )
}
