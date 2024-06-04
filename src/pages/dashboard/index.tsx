import {randomId} from "@/shared/lib/helpers";
import VersionsLayout from "@/widgets/dashboard/ui/layouts/VersionsLayout";


enum TabType {
    ACCOUNTS,
    CARDS,
    DEPOSIT,
    ASSETS,
    HISTORY,
    VERSIONS
}

const TABS = [
    //{type: TabType.ACCOUNTS, title: 'Accounts', content: <AccountsLayout/>},
    // {type: TabType.CARDS, title: 'Cards', content: <CardsLayout/>},
    // {type: TabType.DEPOSIT, title: 'Deposits', content: <DepositLayout/>},
    // {type: TabType.ASSETS, title: 'Crypto assets', content: <CryptoAssets/>},
    // {type: TabType.HISTORY, title: 'History', content: (
    //     <Box display={"flex"} gap="40px" justifyContent={"flex-start"}>
    //        
    //         <div className='substrate' style={{width: '100%'}}>
    //             <History title='History' includeFiat/>
    //         </div>
    //
    //         <BannersAndMyReward />
    //     </Box>
    // )}
    {type: TabType.VERSIONS, title: 'VERSIONS', content: <VersionsLayout/>}
];

export default () => {
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
