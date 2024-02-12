import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext'
import { mockEUR } from '@/processes/PWA/mock-EUR'
import ChoseNetwork from '@/widgets/wallet/transfer/ChoseNetwork'
import ChoseNetworkMobile from '@/widgets/wallet/transfer/mobile/choose-network-mobile'
import SelectCurrency from '@/widgets/wallet/transfer/mobile/select-currency'
import NetworkProvider from '@/widgets/wallet/transfer/model/NetworkProvider'
import { CtxWalletData } from '@/widgets/wallet/transfer/model/context'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Transfers({}: Props) {

    const {currency} = useParams()
    const [curr, setCurr] = useState<string>(currency) 
    const {currencies} = useContext(CtxCurrencies);
    const $currency : ICtxCurrency = currencies.get(curr);
    
    useEffect(()=>{
        console.log("currency now: " + curr);
    },[curr])


  return (
    <>
        {!curr?
            <div>
                <SelectCurrency currency={curr} setCurr={setCurr}/>
                {curr && <ChoseNetworkMobile/>}
            </div>
        :

            <CtxWalletData.Provider value={$currency}>
                <NetworkProvider>
                    <div>
                        <SelectCurrency currency={curr} setCurr={setCurr}/>
                        {curr && <ChoseNetworkMobile/>}
                    </div>
                </NetworkProvider>
            </CtxWalletData.Provider>
        }
            
    </>
  )
}