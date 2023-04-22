import {useParams} from "react-router-dom";
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import About from "@/widgets/wallet/about/ui/About";
import History from "@/widgets/history/ui/History";
import TopUp from "@/widgets/wallet/top-up/ui/TopUp";
import Withdraw from "@/widgets/wallet/withdraw/Withdraw";
import Transfer from "@/widgets/wallet/transfer/Transfer";
import {IResListAddresses} from "@/shared/api";
import {storeListAvailableBalance, storeListAddresses} from "@/shared/store/crypto-assets";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import WalletHeader from "@/widgets/wallet/header/ui";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NetworkHOC from "@/widgets/wallet/model/NetworkHOC";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";

function Wallet() {

    const params = useParams();
    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const currency = sortedListBalance.find(item => item.const === params.currency)
    const {xl, md} = useContext(BreakpointsContext);

    if (!currency) return null

    return (
        <div className="flex flex-col h-full w-full">
            <CtxWalletCurrency.Provider value={currency}>
                <WalletHeader/>
                <TabsGroupPrimary defaultInit={"TopUp"}>
                    <div className={`grid grid-cols-${xl ? "1" : "2"}`}>
                        <div className="substrate z-10 w-inherit relative">
                            <NetworkHOC>
                                <TopUp data-tab={"TopUp"}/>
                                <Withdraw data-tab={"Withdraw"}/>
                            </NetworkHOC>

                            <Transfer data-tab={"Transfer"}/>
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
