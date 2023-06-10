import React, {useEffect} from 'react';
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {randomId} from "@/shared/lib/helpers";
import History from "@/widgets/history/ui/History";
import PageHead from '@/shared/ui/page-head/PageHead';
import DepositLayout from "@/pages/dashboard/ui/DepositLayout";
import {storeInvestments} from "@/shared/store/investments/investments";

enum TabType {
    ACCOUNTS,
    CARDS,
    DEPOSIT,
    ASSETS,
    HISTORY
};

const TABS = [
    // {type: TabType.ACCOUNTS, title: 'Accounts', content: <AccountsLayout/>},
    // {type: TabType.CARDS, title: 'Cards', content: <CardsLayout/>},
    {type: TabType.DEPOSIT, title: 'Deposits', content: <DepositLayout/>},
    // {type: TabType.ASSETS, title: 'Crypto assets', content: <CryptoAssets/>},
    {
        type: TabType.HISTORY, title: 'History', content: (
            <div className='substrate'>
                <History title='History'/>
            </div>
        )
    }
];

export default () => {

    const [activeTab, setActiveTab] = useState<TabType>(TabType.DEPOSIT);
    const navigate = useNavigate();
    const getInvestments = storeInvestments(state => state.getInvestments);

    useEffect(() => {
        (async () => {
            getInvestments()
        })()
    }, [])
    const handleChangeTab = (tab: TabType) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
        setActiveTab(tab);
    };

    return (
        <div className="wrapper">
            <PageHead
                title={"Personal account"}
                subtitle={
                    <>Open your <a
                        className="underline hover:text-blue-400 hover:cursor-pointer"
                        onClick={() =>navigate('/new-deposit')}
                    >
                        fixed or crypto deposit
                    </a></>}
            />

            <div className="w-full">
                <div className="mx-[-15px] hidden sm:flex mt-[45px] mb-[16px] border-solid border-b-[2px] border-gray-200">
                    {TABS.map(t => (
                        <button
                            className={`
                            mb-[-3px] pt-0 px-[15px] pb-[16px] bg-none border-solid border-b-[3px] transition-all text-fs14
                            ${activeTab === t.type ? 'border-blue-400 font-bold' : 'border-transparent text-gray-500 font-medium'}
                        `}
                            key={t.type}
                            onClick={handleChangeTab(t.type)}
                        >
                            {t.title}
                        </button>
                    ))}
                </div>
            </div>

            {TABS.map(({type, content}, index) => (
                <div key={randomId()} className={`sm:mt-0 ${activeTab !== type ? 'sm:hidden' : ''} ${index === 0 ? '' : 'mt-16'}`}>
                    {content}
                </div>
            ))}
        </div>
    );
}