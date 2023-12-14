import {useContext} from 'react';
// import {getCookieData, randomId} from "@/shared/lib/helpers";
import History from "@/widgets/history/ui/History";
// import PageHead from '@/shared/ui/page-head/PageHead';
// import TabsGroupPrimary from '@/shared/ui/tabs-group/primary';
import CardsLayout from '@/widgets/dashboard/ui/layouts/CardsLayout';
import CryptoAssets from "@/widgets/dashboard/ui/layouts/AssetsLayout";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
// import {auth} from "@/processes/firebaseConfig";
// import {onIdTokenChanged} from "firebase/auth";
import Button from "@/shared/ui/button/Button";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import {randomId} from "@/shared/lib/helpers";
import {useTranslation} from "react-i18next";
import PageHead from "@/shared/ui/page-head/PageHead";
enum TabType {
    ACCOUNTS,
    CARDS,
    DEPOSIT,
    ASSETS,
    HISTORY
}

const TABS = [
    //{type: TabType.ACCOUNTS, title: 'Accounts', content: <AccountsLayout/>},
    // {type: TabType.CARDS, title: 'Cards', content: <CardsLayout/>},
    // {type: TabType.DEPOSIT, title: 'Deposits', content: <DepositLayout/>},
    // {type: TabType.ASSETS, title: 'Crypto assets', content: <CryptoAssets/>},
    {type: TabType.HISTORY, title: 'History', content: (
        <div className='substrate'>
            <History title='History' includeFiat/>
        </div>
    )}
];

export default () => {
    const {t} = useTranslation();
    const {sm} = useContext(BreakpointsContext);
    
    return (
        <div className="wrapper">
            {TABS.map(({content}) => (
                <div key={randomId()}>
                    {content}
                </div>
            ))}
            
            {/*{sm ? (*/}
            {/*    <div className="w-full -sm:hidden">*/}
            {/*        <TabsGroupPrimary initValue={"history"}>*/}
            {/*            /!*<div className='-mt-5' data-tab={"Cards"}>*!/*/}
            {/*            /!*    <CardsLayout/>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            /!*<div className='-mt-5' data-tab={"Crypto assets"}>*!/*/}
            {/*            /!*    <CryptoAssets/>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            <div className='-mt-10 substrate' data-tag={"history"} data-name={t("history")}>*/}
            {/*                <History title='History' includeFiat/>*/}
            {/*            </div>*/}
            {/*        </TabsGroupPrimary>*/}
            {/*    </div>*/}
            {/*) : (TABS.map(({content}) => (*/}
            {/*        <div key={randomId()} className='mt-16'>*/}
            {/*            {content}*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*)}*/}
        </div>
    );
}
