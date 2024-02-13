import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext'
import { mockEUR } from '@/processes/PWA/mock-EUR'
import ChoseNetwork from '@/widgets/wallet/transfer/ChoseNetwork'
import TransfersWrapper from '@/widgets/wallet/transfer/mobile/model/TransfersWrapper'
import ChoseNetworkMobile from '@/widgets/wallet/transfer/mobile/ui/choose-network-mobile'
import SelectCurrency from '@/widgets/wallet/transfer/mobile/ui/select-currency'
import NetworkProvider from '@/widgets/wallet/transfer/model/NetworkProvider'
import { CtxWalletData } from '@/widgets/wallet/transfer/model/context'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Transfers({}: Props) {

    const {currency} = useParams()
    const [curr, setCurr] = useState<string>(currency) 
    const {currencies} = useContext(CtxCurrencies);
    const $currency : ICtxCurrency = currencies.get(curr?curr:"EUR");
    
    useEffect(()=>{

    },[curr])


  return (
    <>
        {!curr?
            <TransfersWrapper>
                <SelectCurrency data-tag={"select_currency"} currency={curr} setCurr={setCurr}/>
                {curr && <ChoseNetworkMobile data-tag={"choose_network"}/>}
            </TransfersWrapper>
        :

            <CtxWalletData.Provider value={$currency}>
                <NetworkProvider>
                    <TransfersWrapper>
                        <SelectCurrency data-tag={"select_currency"} currency={curr} setCurr={setCurr}/>
                        {curr && <ChoseNetworkMobile data-tag={"choose_network"}/>}
                    </TransfersWrapper>
                </NetworkProvider>
            </CtxWalletData.Provider>
        }
            
    </>
  )
}