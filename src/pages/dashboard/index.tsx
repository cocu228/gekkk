import {useContext} from 'react';
import {randomId} from "@/shared/lib/helpers";
import History from "@/widgets/history/ui/History";
import PageHead from '@/shared/ui/page-head/PageHead';
import TabsGroupPrimary from '@/shared/ui/tabs-group/primary';
import CardsLayout from '@/widgets/dashboard/ui/layouts/CardsLayout';
import CryptoAssets from "@/widgets/dashboard/ui/layouts/AssetsLayout";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';

enum TabType {
    ACCOUNTS,
    CARDS,
    DEPOSIT,
    ASSETS,
    HISTORY
};

const TABS = [
    //{type: TabType.ACCOUNTS, title: 'Accounts', content: <AccountsLayout/>},
    {type: TabType.CARDS, title: 'Cards', content: <CardsLayout/>},
    // {type: TabType.DEPOSIT, title: 'Deposits', content: <DepositLayout/>},
    {type: TabType.ASSETS, title: 'Crypto assets', content: <CryptoAssets/>},
    {type: TabType.HISTORY, title: 'History', content: (
        <div className='substrate'>
            <History title='History'/>
        </div>
    )}
];

export default () => {
    const {sm} = useContext(BreakpointsContext);

    return (
        <div className="wrapper">
            <PageHead title="Personal account"/>

            {sm ? (
                <div className="w-full -sm:hidden">
                    <TabsGroupPrimary initValue={"Cards"}>
                        <div className='-mt-5' data-tab={"Cards"}>
                            <CardsLayout/>
                        </div>
                        <div className='-mt-5' data-tab={"Crypto assets"}>
                            <CryptoAssets/>
                        </div>
                        <div className='-mt-10 substrate' data-tab={"History"}>
                            <History title='History'/>
                        </div>
                    </TabsGroupPrimary>
                </div>
            ) : (TABS.map(({content}) => (
                    <div key={randomId()} className='mt-16'>
                        {content}
                    </div>
                ))
            )}
        </div>
    );
}
