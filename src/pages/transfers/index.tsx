import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext'
import { mockEUR } from '@/processes/PWA/mock-EUR'
import TransfersWrapper from '@/widgets/wallet/transfer/mobile/model/TransfersWrapper'
import ChoseNetworkMobile from '@/widgets/wallet/transfer/mobile/ui/choose-network-mobile'
import GetDisplayedForm from '@/widgets/wallet/transfer/mobile/ui/get-displayed-form'
import SelectCurrency from '@/widgets/wallet/transfer/mobile/ui/select-currency'
import NetworkProvider from '@/widgets/wallet/transfer/model/NetworkProvider'
import { CtxWalletData, CtxWalletNetworks } from '@/widgets/wallet/transfer/model/context'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {}

export default function Transfers({}: Props) {

    const query = useQuery()
    const [curr, setCurr] = useState<string>() 
    const {currencies} = useContext(CtxCurrencies);
    const [network, setNetwork] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const {setNetworkType} = useContext(CtxWalletNetworks);


    useEffect(()=>{
        if(loading){
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
    }, [loading])
    

    useEffect(()=>{
        setLoading(true)
        if(query.get("type")){
            setNetworkType(+query.get("type"))
            setNetwork(+query.get("type"))            
        }
        if(query.get("currency")){
            setCurr(query.get("currency"))
        }
    },[])

    let $currency : ICtxCurrency = currencies?.get(curr?curr:"EUR");
     
    if(!$currency){
        // @ts-ignore
        $currency = mockEUR
    }

    
  return (
    <div className='mb-20'>
        {!curr?
            <TransfersWrapper loading={loading} setLoading={setLoading} network={network} setNetwork={setNetwork} curr={curr} setCurr={setCurr}>
                <SelectCurrency data-tag={"select_currency"} currency={curr} setCurr={setCurr}/>
                {curr && <ChoseNetworkMobile loading={loading} setNetwork={setNetwork} network={network} data-tag={"choose_network"}/>}
            </TransfersWrapper>
        :

            <CtxWalletData.Provider value={$currency}>
                <NetworkProvider>
                    <TransfersWrapper loading={loading} setLoading={setLoading} network={network} setNetwork={setNetwork} curr={curr} setCurr={setCurr}>
                        <SelectCurrency data-tag={"select_currency"} currency={curr} setCurr={setCurr}/>
                        {curr && <ChoseNetworkMobile loading={loading} setNetwork={setNetwork} network={network} data-tag={"choose_network"}/>}
                        {network && <div
                            data-tag={"main"}
                            className='bg-[white] w-full align-center p-5 pb-1 rounded'
                        >
                            <GetDisplayedForm curr={$currency}/>
                        </div>}
                    </TransfersWrapper>
                </NetworkProvider>
            </CtxWalletData.Provider>
        }
            
    </div>
  )
}


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }