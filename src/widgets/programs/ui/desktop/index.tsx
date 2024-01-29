import EurCashbackProgram from '@/widgets/wallet/programs/cashback/EUR/ui';
import GkeCashbackProgram from '@/widgets/wallet/programs/cashback/GKE/ui';
import NoFeeProgram from '@/widgets/wallet/programs/no-fee/ui';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

export default function ProgramsDesktop() {
    const {t} = useTranslation()
    const {currency, tab} = useParams()
    const isEUR: boolean = currency === 'EUR';
    const isEURG: boolean = currency === 'EURG';
    const isGKE: boolean = currency === 'GKE';

    if(isEUR){
        return(
            <>
                <EurCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
            </>
        )
    }else if(isEURG){
        return(
            <>
                <EurCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
            </>
        )
    }else{
        return(
            <>
                <GkeCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
                <NoFeeProgram data-tag={"no_fee_program"} data-name={t("no_fee_program")}/>
            </>
        )
    }
}
