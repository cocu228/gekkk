import {useContext, useState} from 'react';
import SecondaryTabGroup from '@/shared/ui/tabs-group/secondary';
import CryptoWithdraw from './crypto/CryptoWithdraw'
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet-stage/top-up/model/context";
import Loader from "@/shared/ui/loader";

const fiatTabs: Record<string, string> = {
    'gek_card': 'Payment Card',
    'crypto': 'Blockchain wallet',
}

const cryptoTabs: Record<string, string> = {
    'crypto': 'Blockchain wallet',
}


const Withdraw = () => {

    const currency = useContext(CtxWalletCurrency)
    const {flags} = currency.defaultInfoToken

    const {loading} = useContext(CtxWalletNetworks)

    let availableMethods = flags === 8 ? fiatTabs : cryptoTabs
    const [activeTab, setActiveTab] = useState('gek_card')

    if (!Object.keys(availableMethods).includes(activeTab)) {
        setActiveTab(Object.keys(availableMethods)[0]);
    }

    return loading ? <Loader/> : (
        <div className='h-full'>
            <SecondaryTabGroup
                tabs={availableMethods}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === 'crypto' && (
                <CryptoWithdraw/>
            )}
        </div>
    );
};

export default Withdraw;
