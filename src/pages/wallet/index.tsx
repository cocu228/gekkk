import {useParams} from "react-router-dom";
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import About from "@/widgets/wallet-stage/about/ui/About";
import History from "@/widgets/history/ui/History";
import TopUp from "@/widgets/wallet-stage/top-up/ui/TopUp";
import Withdraw from "@/widgets/wallet-stage/withdraw/Withdraw";
import Transfer from "@/widgets/wallet-stage/transfer/Transfer";
import {IResListAddresses} from "@/shared/api";
import {storeListAvailableBalance, storeListAddresses} from "@/shared/store/crypto-assets";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import {IconCoin} from "@/shared/ui/icons/icon-coin";

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

function Wallet() {

    const params = useParams();
    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const currency = sortedListBalance.find(item => item.const === params.currency)
    const listAddresses: IResListAddresses[] = storeListAddresses(state => state.listAddresses);

    if (!currency) return null

    const isEURG: boolean = currency.const === 'EURG';

    return (
        <div className="flex flex-col h-full w-full">
            <div className="container flex mx-auto px-4">
                <div className='flex w-inherit py-6 items-center'>
                    <div className="flex justify-start">
                        <div className="mr-6">
                            <IconCoin code={currency.const}/>
                        </div>

                        <div className="flex flex-col content-around">
                            <div className="text-sm font-medium text-gray-400">
                                Wallet balance
                            </div>

                            <div className="text-2xl font-bold text-gray-600 cursor-help">
                                {currency.const}
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
                        <div className="font-bold text-fs32 leading-[48px] text-gray-600 mb-4">
                            {currency.name} wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                            {isEURG ? EurgDescriptionText : getDescriptionText(currency.name, currency.const, currency.defaultInfoToken.flags)}
                        </div>
                    </div>
                </div>
            </div>

            <TabsGroupPrimary defaultInit={"TopUp"}>
                <div className='grid grid-cols-2'>
                    <div className="substrate">
                        <TopUp
                            data-tab={"TopUp"}
                            listAddresses={listAddresses}
                            currency={currency.const}
                            flags={currency.defaultInfoToken.flags}
                        />
                        <Withdraw
                            data-tab={"Withdraw"}
                            currency={currency.const}
                            flags={currency.defaultInfoToken.flags}
                        />
                        <Transfer
                            data-tab={"Transfer"}
                            currency={currency.const}
                        />

                        <About
                            data-tab={"About"}
                            name={currency.name}
                            flags={currency.defaultInfoToken.flags}
                            currency={currency.const}
                        />
                    </div>

                    <History className={`substrate -ml-4 h-full`}
                             currency={currency.const}
                    />
                </div>
            </TabsGroupPrimary>
        </div>
    );
};

export default Wallet;
