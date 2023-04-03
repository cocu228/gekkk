import {useState} from "react";
import {useParams} from "react-router-dom";
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import PrimaryTabGroup from '@/shared/ui/tab-group/primary';
import About from "@/widgets/wallet-stage/about/ui/About";
import History from "@/widgets/history/ui/History";
import TopUp from "@/widgets/wallet-stage/top-up/ui/TopUp";
import Withdraw from "@/widgets/wallet-stage/withdraw/Withdraw";
import Transfer from "@/widgets/wallet-stage/transfer/Transfer";
import { IResListAddresses } from "@/shared/api";
import { storeListAvailableBalance, storeListAllCryptoName, storeListAddresses } from "@/shared/store/crypto-assets";

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

const getInitialTab = (tab: string | undefined) => 
    (tab && initialTabs.includes(tab)) ? tab : 'topup';

const getWalletAssets = (currency: string) =>
    storeListAllCryptoName(state => state.listAllCryptoName).find(asset => asset.code === currency);

const getWalletData = (currency: string) =>
    storeListAvailableBalance(state => state.defaultListBalance).find(b => b.currency === currency);

function getTabsAsRecord (tabs: Array<WalletTab>) {
    let list: Record<string, string> = {};

    tabs.forEach(tab => Object.assign(list, {
            [tab.Key]: tab.Title
    }));

    return list;
}

enum TabKey {
    TOPUP = 'topup',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
    HISTORY = 'history',
    ABOUT = 'about'
}

type WalletTab = {
    Key: TabKey;
    Title: string;
    Tab: JSX.Element;
}

function Wallet() {
    const { currency, tab = '' } = useParams<string>();
    const walletAssets = getWalletAssets(currency);
    const listAddresses: IResListAddresses[] = storeListAddresses(state => state.listAddresses);

    const isEURG: boolean = currency === 'EURG';
    const {
        name,
        flags
    } = walletAssets;

    const walletTabs: Array<WalletTab> = [
        ...(flags === 8 ? [
            {
                Key: TabKey.TOPUP,
                Title: 'Top Up',
                Tab: <TopUp
                        listAddresses={listAddresses}
                        currency={currency}
                        flags={flags}
                    />
            },
            {
                Key: TabKey.WITHDRAW,
                Title: 'Withdraw',
                Tab: <Withdraw
                        currency={currency}
                        flags={flags}
                    />
            },
            {
                Key: TabKey.TRANSFER,
                Title: 'Transfer to Contact',
                Tab: <Transfer
                        currency={currency}
                    />
            },
        ] : []),
        /* TODO: Show only in mobile version
        {
            Key: Tabs.ABOUT,
            Title: 'About',
            Tab: <About
                    currency={currency}
                    name={name}
                    flags={flags}
                />
        }
        */
        {
            Key: TabKey.ABOUT,
            Title: 'About',
            Tab: <About
                    currency={currency}
                    name={name}
                    flags={flags}
                />
        }
    ]

    let [activeTab, setActiveTab] = useState<string>(getInitialTab(tab));
    const walletData = getWalletData(currency);

    if (!walletTabs.find(t => t.Key === activeTab))
        setActiveTab(walletTabs[0].Key);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="container flex mx-auto px-4">
                <div className='flex w-inherit py-6 items-center'>
                    <div className="flex justify-start">
                        <div className="mr-6">
                            <img 
                                className="h-[50px] w-[50px]"
                                src={`/img/tokens/${currency.toLowerCase().capitalize()}Icon.svg`}
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

                            <div className="text-2xl font-bold text-gray-600 cursor-help">
                                {walletData? walletData.free_balance : 0} {currency}
                            </div>
                        </div>

                        {isEURG && (
                            <div className='flex flex-col content-around ml-[50px]'>
                                <div className="text-sm font-medium text-semilight">
                                    Rate

                                    <Tooltip text={EurgTooltipText}>
                                        <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                            <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className='text-gray-600 text-2xl'>
                                    3% per annum
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gray-600 mb-4">
                            {name} wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                            {isEURG ? EurgDescriptionText : getDescriptionText(name, currency, flags)}  
                        </div>
                    </div>
                </div>
            </div>

            <PrimaryTabGroup
                tabs={getTabsAsRecord(walletTabs)}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />

            <div className='flex grow shrink text-gray-500 container mx-auto mb-5 px-4'>
                <div className="bg-white inline-block z-10 rounded-l-[10px] px-[40px] py-10 w-[585px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]">
                    {walletTabs.find(tab => tab.Key === activeTab)?.Tab}
                </div>
                
                <History className={`rounded-l-none inline-block h-full shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]`}/>
            </div>
        </div>
    );
};

export default Wallet;
