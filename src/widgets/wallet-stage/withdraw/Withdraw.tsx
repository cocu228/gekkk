import { useState } from 'react';
import SecondaryTabGroup from '@/shared/ui/tab-group/secondary';
import CryptoWithdraw from './crypto/CryptoWithdraw'

const fiatTabs: Record<string, string> = {
    'gek_card': 'Payment Card',
    'crypto': 'Blockchain wallet',
}

const cryptoTabs: Record<string, string> = {
    'crypto': 'Blockchain wallet',
}

interface TopUpParams {
    flags: number,
    currency: string
}

const Withdraw = ({flags, currency}: TopUpParams) => {
    let availableMethods = flags === 8 ? fiatTabs : cryptoTabs
    const [activeTab, setActiveTab] = useState('gek_card')

    if (!Object.keys(availableMethods).includes(activeTab)) {
        setActiveTab(Object.keys(availableMethods)[0]);
    }

    return (
        <div className='h-full'>
            <SecondaryTabGroup
                tabs={availableMethods}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === 'crypto' && (
                <CryptoWithdraw
                    currency={currency}
                />
            )}
        </div>
    );
};

export default Withdraw;
