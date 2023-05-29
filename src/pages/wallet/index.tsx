import {useContext} from "react";
import {useLocation} from "react-router";
import {useParams} from "react-router-dom";
import Transfer from "@/widgets/wallet/transfer";
import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import TopUp from "@/widgets/wallet/top-up/ui/TopUp";
import WalletHeader from "@/widgets/wallet/header/ui";
import Withdraw from "@/widgets/wallet/withdraw/Withdraw";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import NetworkProvider from "@/widgets/wallet/model/NetworkProvider";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import { CtxCurrencyData } from "@/app/CurrenciesContext";
import { CtxWalletData } from "@/widgets/wallet/model/context";
import NoFeeProgram from "@/widgets/wallet/no-fee-program/ui";
import CashbackProgram from "@/widgets/wallet/cashback-program/ui";

function Wallet() {

    const {currency, tab} = useParams();
    const {xl, md} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxCurrencyData);
    const $currency = currencies.get(currency);

    return (
        <div className="flex flex-col h-full w-full">
            <CtxWalletData.Provider value={$currency}>
                <WalletHeader/>
                <TabsGroupPrimary initValue={tab ? tab : "Top Up"}>
                    <div className="grid" style={{gridTemplateColumns: `repeat(${xl ? 1 : 2}, minmax(0, 1fr))`}}>
                        <div className="substrate z-10 w-inherit relative min-h-[200px]">
                            <NetworkProvider data-tab={"Top Up"}>
                                <TopUp/>
                            </NetworkProvider>
                            <NetworkProvider data-tab={"Withdraw"}>
                                <Withdraw/>
                            </NetworkProvider>
                            <Transfer data-tab={"Funds transfer"}/>
                            <CashbackProgram data-tab={"Cashback Program"}/>
                            <NoFeeProgram data-tab={"No fee program"}/>
                            <About data-tab={"About"}/>
                            {xl && <History currency={currency} data-tab={"History"}/>}

                        </div>
                        {!xl && <div className="substrate z-0 -ml-4 h-full">
                            <History currency={currency}/>
                        </div>}
                    </div>
                </TabsGroupPrimary>
            </CtxWalletData.Provider>
        </div>
    );
};

export default Wallet;
