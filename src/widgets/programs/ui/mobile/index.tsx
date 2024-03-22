import Loader from '@/shared/ui/loader';
import { dealsData } from '@/widgets/wallet/programs/cashback/EUR/model/deals-data';
import CashbackProgram from '@/widgets/wallet/programs/cashback/EUR/ui';
import CashbackCardMobile from '@/widgets/wallet/programs/cashback/EUR/ui/CashbackCardMobile';
import GkeCashbackProgram from '@/widgets/wallet/programs/cashback/GKE/ui';
import NoFeeProgram from '@/widgets/wallet/programs/no-fee/ui';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

export default function ProgramsMobile() {
    const {t} = useTranslation()
    const {currency, tab} = useParams()
    const isEUR: boolean = currency === 'EUR';
    const isEURG: boolean = currency === 'EURG';
    const isGKE: boolean = currency === 'GKE';
    
    
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
