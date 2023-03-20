import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assetsCoinsName } from "@/shared/store";
import { IApiMarketAssets } from "@/shared/api/market/market-assets";

import Tooltip from '@/shared/ui/tooltip/Tooltip';
import PrimaryTabGroup from '@/shared/ui/tab-group/primary';
import About from "@/widgets/wallet-tabs/about/ui/About";
import History from "@/widgets/history/ui/History";
import TopUp from "@/widgets/wallet-tabs/topup/ui/TopUp";
import { IApiGetBalance, apiGetBalance } from "@/shared/api";

const EurgTooltipText: string = `We pay you 3% per annum of EURG on your balance under following conditions:\n
(i) your weighted average balance for the reporting period is equal to or higher than 300 EURG\n
(ii) our upper limit for the balance to pay the interest rate is 100,000 EURG.`;

const EurgDescriptionText: string = `Utility token with a fixed rate\n1 EURG = 1 euro`;

const actionsByFlag: Record<number, string> = {
    2: 'Buy or Sell',
    8: 'Top up, Exchange and Send',
}

function getDescriptionText(name: string, currency: string, flags: number) {
    let actions: string = actionsByFlag[flags];
    if (!actions)
        return 'Short description for this currency is not done yet.';

    return `${actions} your ${name} (${currency}) directly from your Gekkoin account`;
}

const initialTabs: string[] = ['topup', 'withdraw', 'about'];

function Wallet() {
    const { currency, tab = '' } = useParams<string>();
    if (!currency) return null;

    const walletAssets = assetsCoinsName<IApiMarketAssets[]>(state => state.assets)
    ?.find(asset => asset.code === currency);
    if (!walletAssets) return null;
    
    const isEURG: boolean = currency === 'EURG';
    const {
        name,
        decimal_prec,
        flags
    } = walletAssets
    
    const walletTabs: Record<string, string> = {
        ...(flags === 8 && {
            'topup': 'Top up',
            'withdraw': 'Withdraw',
            'transfer': 'Transfer to contact',
        }),
        //'history': 'History', TODO: Show only in mobile version
        'about': 'About'
    }
    
    const getInitialTab = (tab: string | undefined) => 
        (tab && initialTabs.includes(tab)) ? tab : 'topup';

    let [activeTab, setActiveTab] = useState(getInitialTab(tab));

    if (!walletTabs[activeTab])
        setActiveTab(Object.keys(walletTabs)[0]);

    //TODO: Remove this when state will be updated
    const [state, setState] = useState<IApiGetBalance[] | null>(null)
    useEffect(() => {

        const phone: string = '79111111111';
        const token: string = '78369b77ff788eac15326e420bf8a6ba';

        (async () => {
            const {data} = await apiGetBalance(phone, token);
            setState(data);
        })()
    }, [])

    if (!state) return null;

    const {
        free_balance: balance,
    } = state?.find(w => w.currency === currency);

    return (
        <div className="flex flex-col w-full">
            <div className="container flex mx-auto px-4">
                <div className='flex w-inherit py-6 items-center'>
                    <div className="flex justify-start">
                        <div className="mr-6">
                            <img 
                                className="h-[50px] w-[50px]"
                                src={`/public/img/tokens/${currency}Icon.svg`}
                                onError={({ currentTarget }) => {
                                    if (currentTarget.getAttribute("data-icon") === "empty")
                                        return null

                                    currentTarget.setAttribute("data-icon", "empty")
                                }}
                                alt={currency}/>
                        </div>

                        <div className="flex flex-col content-around">
                            <div className="text-sm font-medium text-gray-400">
                                Wallet balance
                            </div>

                            <div className="text-2xl font-bold text-gray-dark cursor-help">
                                {balance?? 0} {currency}
                            </div>
                        </div>

                        {isEURG && (
                            <div className='flex flex-col content-around ml-[50px]'>
                                <div className="text-sm font-medium text-semilight">
                                    Rate

                                    <Tooltip text={EurgTooltipText}>
                                        <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                            <img src="/public/img/icon/HelpIcon.svg" alt="tooltip"/>
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className='text-gray-dark text-2xl'>
                                    3% per annum
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gray-dark mb-4">
                            {name} wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                            {isEURG ? EurgDescriptionText : getDescriptionText(name, currency, flags)}  
                        </div>
                    </div>
                </div>
            </div>

            <PrimaryTabGroup
                tabs={walletTabs}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />

            <div className='flex grow shrink text-gray container mx-auto h-full mb-5 px-4'>
                <div className="bg-white inline-block z-10 rounded-l-[10px] px-[40px] py-10 h-full w-[585px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]">
                    {activeTab === 'topup' && (
                        <TopUp
                            flags={flags}
                        />
                    )}
                    {activeTab === 'about' && (
                        <About
                            currency={currency}
                            name={name}
                            flags={flags}
                        />
                    )}
                </div>
                
                <History className={`rounded-l-none inline-block h-full shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]`}/>
            </div>
        </div>
    );
};

export default Wallet;
