import { useState } from "react";
import { useParams } from "react-router-dom";
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import PrimaryTabGroup from '@/shared/ui/primary-tab-group';
import About from "@/widgets/wallet-tabs/about/ui/About";

const walletTabs = {
    'topup': 'Top up',
    'withdraw': 'Withdraw',
    'transfer': 'Transfer to contact',
    'history': 'History',
    'about': 'About'
};

const EurgTooltipText: string = `We pay you 3% per annum of EURG on your balance under following conditions:\n
(i) your weighted average balance for the reporting period is equal to or higher than 300 EURG\n
(ii) our upper limit for the balance to pay the interest rate is 100,000 EURG.`

const initialTabs: string[] = ['topup', 'withdraw', 'about'];

const getInitialTab = (tab: string | undefined) => 
    (tab && Object.keys(initialTabs).includes(tab)) ? tab : 'topup';

function Wallet() {
    //const { currency, tab } = useParams<string>();

    const currency = "ADA", tab = undefined
    let [activeTab, setActiveTab] = useState(getInitialTab(tab));

    return (
        <div className="flex flex-col w-full">
            <div className="container flex mx-auto px-4">
                <div className='flex w-inherit py-6 items-center'>
                    <div className="flex justify-start">
                        <div className="mr-6 h-[50px] w-[50px]">
                            <img src="/public/img/icon/EurgIcon.svg" alt="logo"/>
                        </div>

                        <div className="flex flex-col content-around">
                            <div className="text-sm font-medium text-gray">
                                Wallet balance
                            </div>

                            <div className="text-2xl font-bold text-gray-dark cursor-help">
                                317.95 {currency}
                            </div>
                        </div>

                        <div className='flex flex-col content-around ml-[50px]'>
                            <div className="text-sm font-medium text-gray">
                                Rate

                                <Tooltip text={EurgTooltipText}>
                                    <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                        <img src="/public/img/icon/HelpIcon.svg" alt="logo"/>
                                    </div>
                                </Tooltip>
                            </div>

                            <div className='text-gray-dark text-2xl'>
                                3% per annum
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gray-dark mb-4">
                            Gekkoin Europe wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray whitespace-pre-line">
                            Utility token with a fixed rate
                            <br/>
                            1 EURG = 1 euro
                        </div>
                    </div>
                </div>
            </div>

            <PrimaryTabGroup
                tabs={walletTabs}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />

            <div className='flex container mx-auto px-4'>
                <div className="bg-white rounded-l-[6px] p-[15px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]">
                    {activeTab === 'about' && (
                        <About
                            currency={currency}
                            name={'ADA'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
