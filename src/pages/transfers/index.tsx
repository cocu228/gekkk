import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext'
import { useQuery } from '@/shared/lib'
import Loader from '@/shared/ui/loader'
import TransfersWrapper from '@/widgets/wallet/transfer/mobile/model/TransfersWrapper'
import ChoseNetworkMobile from '@/widgets/wallet/transfer/mobile/ui/choose-network-mobile'
import GetDisplayedForm from '@/widgets/wallet/transfer/mobile/ui/get-displayed-form'
import SelectCurrency from '@/widgets/wallet/transfer/mobile/ui/select-currency'
import NetworkProvider from '@/widgets/wallet/transfer/model/NetworkProvider'
import { CtxWalletData } from '@/widgets/wallet/transfer/model/context'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {}

export default function Transfers({}: Props) {

    const query = useQuery()
    const [curr, setCurr] = useState<string>() 
    const {currencies} = useContext(CtxCurrencies);
    const [network, setNetwork] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const {t} = useTranslation()
    // @ts-ignore
    const [$currency, setCurrency] = useState<ICtxCurrency>()

    useEffect(()=>{
        if(loading){
            setTimeout(()=>{
                setLoading(false)
            },2000)
        }
    }, [loading])
        
    useEffect(()=>{
        setLoading(true)
        if(query.get("currency")){
            setCurr(query.get("currency"))
        }
        if(query.get("type")){
            setNetwork(+query.get("type"))            
        }
    },[])


    useEffect(()=>{
        if(currencies && curr){
            setCurrency(currencies?.get(curr))            
        }                        
    },[currencies, curr])

    
  return currencies ? (
    <div className='mb-20'>
        {!curr || !$currency ?
        <TransfersWrapper 
            loading={loading} 
            setLoading={setLoading} 
            network={network} 
            setNetwork={setNetwork} 
            curr={curr} 
            setCurr={setCurr}
        >
            <SelectCurrency 
                setCurrency={setCurrency} 
                setNetwork={setNetwork} 
                data-tag={"select_currency"} 
                currency={curr} 
                setCurr={setCurr}
            />
            {curr && 
                <ChoseNetworkMobile 
                    loading={loading} 
                    setNetwork={setNetwork} 
                    network={network} 
                    data-tag={"choose_network"}
                />
            }
        </TransfersWrapper>
        :
            <CtxWalletData.Provider value={$currency}>
                <NetworkProvider data-tag={"withdraw"} data-name={t("withdraw")}>
                    <TransfersWrapper 
                        loading={loading} 
                        setLoading={setLoading} 
                        network={network} 
                        setNetwork={setNetwork} 
                        curr={curr} 
                        setCurr={setCurr}
                    >
                        <SelectCurrency 
                            setCurrency={setCurrency} 
                            data-tag={"select_currency"} 
                            currency={curr} 
                            setCurr={setCurr} 
                            setNetwork={setNetwork}
                        />
                        {curr && 
                            <ChoseNetworkMobile 
                                loading={loading} 
                                setNetwork={setNetwork} 
                                network={network} 
                                data-tag={"choose_network"}
                            />
                        }
                        {network && 
                            <div
                                data-tag={"main"}
                                className='bg-[white] w-full align-center p-5 pb-1 rounded'
                            >
                                <GetDisplayedForm network={network} curr={$currency}/>
                            </div>
                        }
                    </TransfersWrapper>
                </NetworkProvider>
            </CtxWalletData.Provider>
        }
    </div>) : <Loader/>
}