import React, { useContext, useEffect, useState } from 'react'
import { isCryptoNetwork } from '../../../model/helpers';
import WithdrawFormCrypto from '../../../withdraw/ui/forms/crypto/WithdrawFormCrypto';
import WithdrawFormPapaya from '../../../withdraw/ui/forms/papaya/WithdrawFormPapaya';
import WithdrawFormSepa from '../../../withdraw/ui/forms/sepa/WithdrawFormSepa';
import WithdrawFormSwift from '../../../withdraw/ui/forms/WithdrawFormSwift';
import WithdrawFormCardToCard from '../../../withdraw/ui/forms/card-to-card/WithdrawFormCardToCard';
import WithdrawFormBroker from '../../../withdraw/ui/forms/broker/WithdrawFormBroker';
import WithdrawFormPhoneNumber from '../../../withdraw/ui/forms/phone-number/WithdrawFormPhoneNumber';
import UniversalTransferForm from '../../../withdraw/ui/forms/universal-transfer/UniversalTransferForm';
import CreateTransferCode from '../../../withdraw/ui/forms/create-transfer-code';
import { CtxWalletNetworks } from '../../../model/context';
import Loader from '@/shared/ui/loader';
import { ICtxCurrency } from '@/processes/CurrenciesContext';
import WithdrawFormPapayaMobile from '../../../withdraw/ui/forms/papaya/mobile/WithdrawFormPapayaMobile';
import WithdrawFormCryptoMobile from '../../../withdraw/ui/forms/crypto/mobile/WithdrawFormCryptoMobile';
import CreateTransferCodeMobile from '../../../withdraw/ui/forms/create-transfer-code/mobile';
import UniversalTransferFormMobile from '../../../withdraw/ui/forms/universal-transfer/mobile/UniversalTransferFormMobile';
import WithdrawFormSepaMobile from '../../../withdraw/ui/forms/sepa/mobile/WithdrawFormSepaMobile';
import WithdrawFormBrokerMobile from '../../../withdraw/ui/forms/broker/mobile/WithdrawFormBrokerMobile';
import WithdrawFormCardToCardMobile from '../../../withdraw/ui/forms/card-to-card/mobile/WithdrawFormCardToCardMobile';
import { getInitialProps, useTranslation } from 'react-i18next';

type Props = {
    curr:ICtxCurrency
}

function GetDisplayedForm({curr}: Props) {
    const {t} = useTranslation()
    const {initialLanguage} = getInitialProps()

    const {networkTypeSelect} = useContext(CtxWalletNetworks);

    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
    }, [networkTypeSelect])
    useEffect(()=>{

        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)

    },[curr])
    
    
    const getDisplayForm = (networkType: number): JSX.Element => {
        if (isCryptoNetwork(networkType)) {            
            return <WithdrawFormCryptoMobile/>;
        }
        
        switch (networkType) {
            case 150:
                return <WithdrawFormPapayaMobile/>;
            case 151:
                return <WithdrawFormSepaMobile/>;
            case 152:
                return <WithdrawFormSwift/>;
            case 153:
                return <WithdrawFormCardToCardMobile/>;
            case 154:
                return <WithdrawFormBrokerMobile/>;
            case 155:
                return <WithdrawFormPhoneNumber/>;
            case 230:
                return <UniversalTransferFormMobile/>;
            case 231:
                return <CreateTransferCodeMobile/>;
            default:
                    return <div className='min-h-[50px] mb-3 flex justify-center items-center'>
                        <span className='text-[14px]'>{t("no_actions_for_network")}</span>
                    </div>;
        }
    }

    useEffect(()=>{
        setDisplayedForm(getDisplayForm(networkTypeSelect))
    },[initialLanguage, networkTypeSelect])


    const [displayedForm, setDisplayedForm] = useState(getDisplayForm(networkTypeSelect))
    
    return (
        loading?
        <div className='w-full h-[200px] relative mb-5'>
                    <Loader/>
                </div>
            :
            displayedForm
    )
}

export default GetDisplayedForm