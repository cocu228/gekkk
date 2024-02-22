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

type Props = {
    curr:ICtxCurrency
}

function GetDisplayedForm({curr}: Props) {

    const {networkTypeSelect} = useContext(CtxWalletNetworks);

    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(()=>{

        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)

    },[curr])


    const getDisplayForm = (networkType: number): JSX.Element => {
        if (isCryptoNetwork(networkType)) {            
            return <WithdrawFormCrypto/>;
        }
        
        switch (networkType) {
            case 150:
                return <WithdrawFormPapayaMobile/>;
            case 151:
                return <WithdrawFormSepa/>;
            case 152:
                return <WithdrawFormSwift/>;
            case 153:
                return <WithdrawFormCardToCard/>;
            case 154:
                return <WithdrawFormBroker/>;
            case 155:
                return <WithdrawFormPhoneNumber/>;
            case 230:
                return <UniversalTransferForm/>;
            case 231:
                return <CreateTransferCode/>;
            default:
                    return <div>
                        Sorry, there are no actions available for the selected network.
                    </div>;
        }
    }

    return (
        loading?
                <div className='w-[100vw] h-[200px] relative mb-5'>
                    <Loader/>
                </div>
            :
                getDisplayForm(networkTypeSelect)
    )
}

export default GetDisplayedForm