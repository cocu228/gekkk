import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext'
import { mockEUR } from '@/processes/PWA/mock-EUR'
import ChoseNetwork from '@/widgets/wallet/transfer/ChoseNetwork'
import TransfersWrapper from '@/widgets/wallet/transfer/mobile/model/TransfersWrapper'
import ChoseNetworkMobile from '@/widgets/wallet/transfer/mobile/ui/choose-network-mobile'
import GetDisplayedForm from '@/widgets/wallet/transfer/mobile/ui/get-displayed-form'
import SelectCurrency from '@/widgets/wallet/transfer/mobile/ui/select-currency'
import NetworkProvider from '@/widgets/wallet/transfer/model/NetworkProvider'
import { CtxWalletData, CtxWalletNetworks } from '@/widgets/wallet/transfer/model/context'
import { isCryptoNetwork } from '@/widgets/wallet/transfer/model/helpers'
import WithdrawFormSwift from '@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormSwift'
import WithdrawFormBroker from '@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawFormBroker'
import WithdrawFormCardToCard from '@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawFormCardToCard'
import CreateTransferCode from '@/widgets/wallet/transfer/withdraw/ui/forms/create-transfer-code'
import WithdrawFormCrypto from '@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto'
import WithdrawFormPapaya from '@/widgets/wallet/transfer/withdraw/ui/forms/papaya/WithdrawFormPapaya'
import WithdrawFormPhoneNumber from '@/widgets/wallet/transfer/withdraw/ui/forms/phone-number/WithdrawFormPhoneNumber'
import WithdrawFormSepa from '@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawFormSepa'
import UniversalTransferForm from '@/widgets/wallet/transfer/withdraw/ui/forms/universal-transfer/UniversalTransferForm'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Transfers({}: Props) {

    const {currency} = useParams()
    const [curr, setCurr] = useState<string>(currency) 
    const {currencies} = useContext(CtxCurrencies);
    const $currency : ICtxCurrency = currencies.get(curr?curr:"EUR");
    
            



    
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
                        <div
                            data-tag={"main"}
                            className='bg-[white] align-center p-5 rounded'
                        >
                        <GetDisplayedForm/>
                        </div>
                    </TransfersWrapper>
                </NetworkProvider>
            </CtxWalletData.Provider>
        }
            
    </>
  )
}