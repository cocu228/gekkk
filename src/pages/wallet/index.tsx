import {useParams} from "react-router-dom";
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import About from "@/widgets/wallet/about/ui/About";
import History from "@/widgets/history/ui/History";
import TopUp from "@/widgets/wallet/top-up/ui/TopUp";
import Withdraw from "@/widgets/wallet/withdraw/Withdraw";
import Transfer from "@/widgets/wallet/transfer/Transfer";
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import WalletHeader from "@/widgets/wallet/header/ui";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NetworkHOC from "@/widgets/wallet/model/NetworkHOC";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import {testRightsUser, constRights} from "@/shared/config/chmod-user";

function Wallet() {

    const params = useParams();
    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const currency = sortedListBalance.find(item => item.const === params.currency)
    const {xl, md} = useContext(BreakpointsContext);

    if (!currency) return null
    console.log(currency.defaultInfoToken.flags)
    const rights = testRightsUser(currency.defaultInfoToken.flags, constRights.ACCOUNT_AVAILABLE)

    return (
        <div className="flex flex-col h-full w-full">
            <CtxWalletCurrency.Provider value={currency}>
                <WalletHeader/>
                <TabsGroupPrimary initValue={"About"}>
                    <div className={`grid grid-cols-${xl ? "1" : "2"}`}>
                        <div className="substrate z-10 w-inherit relative">
                            {rights && <NetworkHOC>
                                <TopUp data-tab={"Top Up"}/>
                                <Withdraw data-tab={"Withdraw"}/>
                            </NetworkHOC>}
                            <Transfer data-tab={"Funds transfer"}/>
                            <About data-tab={"About"}/>
                            {xl && <History data-tab={"History"}/>}

                        </div>
                        {!xl && <div className="substrate z-0 -ml-4 h-full">
                            <History/>
                        </div>}
                    </div>
                </TabsGroupPrimary>
            </CtxWalletCurrency.Provider>
        </div>
    );
};

export default Wallet;
