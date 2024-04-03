import Loader from '@/shared/ui/loader';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dealsData } from '@/widgets/wallet/programs/cashback/EUR/model/deals-data';
import CashbackCard from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCard';
import CashbackCardMobile from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCardMobile';

export default function ProgramsDesktop() {
    const [params] = useSearchParams();
    const currency = params.get("currency");

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
}
