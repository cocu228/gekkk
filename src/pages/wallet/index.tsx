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
import WalletHeader from "@/widgets/wallet-stage/header/ui";
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

function Wallet() {

    const params = useParams();
    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const currency = sortedListBalance.find(item => item.const === params.currency)
    const listAddresses: IResListAddresses[] = storeListAddresses(state => state.listAddresses);
    const {xl, md} = useContext(BreakpointsContext);

    if (!currency) return null

    return (
        <div className="flex flex-col h-full w-full">
            <WalletHeader currency={currency}/>
            <TabsGroupPrimary defaultInit={"TopUp"}>
                <div className={`grid grid-cols-${xl ? "1" : "2"}`}>
                    <div className="substrate z-10">
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

                        {xl && <History data-tab={"History"} currency={currency.const}/>}

                    </div>
                    {!xl && <div className="substrate z-0 -ml-4 h-full">
                        <History currency={currency.const}/>
                    </div>}
                </div>
            </TabsGroupPrimary>
        </div>
    );
};

export default Wallet;
