import { useState } from 'react';
import SecondaryTabGroup from '@/shared/ui/tab-group/secondary';

const fiatTabs: Record<string, string> = {
    'gek_card': 'Payment Card',
    'bank_card': 'Bank Card',
    'crypto': 'Blockchain wallet',
}

const cryptoTabs: Record<string, string> = {
    'crypto': 'Blockchain wallet',
}

interface TopUpParams {
    isFiat: boolean,
}

const Topup = ({isFiat}: TopUpParams) => {
    let availableMethods = isFiat ? fiatTabs : cryptoTabs
    const [activeTab, setActiveTab] = useState('gek_card')

    if (!Object.keys(availableMethods).includes(activeTab)) {
        setActiveTab(Object.keys(availableMethods)[0]);
    }

    return (
        <div>
            <SecondaryTabGroup
                tabs={availableMethods}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />


        </div>
    );
};

export default Topup;
