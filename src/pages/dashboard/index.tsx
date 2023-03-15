import React from 'react';
import {useState} from "react";
import Deposits from "@/widgets/deposits/ui/Deposits";
import CryptoAssets from "@/widgets/crypto-assets/ui/CryptoAssets";
import History from "@/widgets/history/ui/History";
import {randomId} from "@/shared/lib/helpers";

enum TabType {
    DEPOSIT,
    ASSETS,
    HISTORY
};

const TABS = [
    {type: TabType.DEPOSIT, title: 'Deposits', content: Deposits},
    {type: TabType.ASSETS, title: 'Crypto assets', content: CryptoAssets},
    {type: TabType.HISTORY, title: 'History', content: History}
];

export default () => {
    const [activeTab, setActiveTab] = useState<TabType>(TabType.DEPOSIT);

    const handleChangeTab = (tab: TabType) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
        setActiveTab(tab);
    };

    return (
        <div className="phone:px-[15px]">
            <h1 className="text-[32px] phone:text-[24px] font-bold mb-[5px]">Personal account</h1>
            <p className="text-[14px] font-medium">Open your <a className="underline hover:text-blue" href="#">fixed or crypto deposit</a></p>

            <div className="w-full">
                <div className="mx-[-15px] hidden phone:flex mt-[45px] mb-[16px] border-solid border-b-[2px] border-gray">
                    {TABS.map(t => (
                        <button
                            className={`
                            mb-[-3px] pt-0 px-[15px] pb-[16px] bg-none border-solid border-b-[3px] transition-all text-[14px]
                            ${activeTab === t.type ? 'border-gekLinkBlue font-bold' : 'border-transparent text-gray font-medium'}
                        `}
                            key={t.type}
                            onClick={handleChangeTab(t.type)}
                        >
                            {t.title}
                        </button>
                    ))}
                </div>
            </div>

            {TABS.map(({type, content: TabContent}, index) => (
                <div key={randomId()} className={`phone:mt-0 ${activeTab !== type ? 'phone:hidden' : ''} ${index === 0 ? 'mt-[38px]' : 'mt-[63px]'}`}>
                    <TabContent/>
                </div>
            ))}
        </div>
    );
}