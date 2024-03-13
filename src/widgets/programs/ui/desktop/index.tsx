import Loader from '@/shared/ui/loader';
import { dealsData } from '@/widgets/wallet/programs/cashback/EUR/model/deals-data';
import CashbackProgram from '@/widgets/wallet/programs/cashback/EUR/ui';
import CashbackCard from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCard';
import CashbackCardMobile from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCardMobile';
import GkeCashbackProgram from '@/widgets/wallet/programs/cashback/GKE/ui';
import NoFeeProgram from '@/widgets/wallet/programs/no-fee/ui';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

export default function ProgramsDesktop() {
    const {t} = useTranslation()
    const {currency, tab} = useParams()
    const isEUR: boolean = currency === 'EUR';
    const isEURG: boolean = currency === 'EURG';
    const isGKE: boolean = currency === 'GKE';

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
