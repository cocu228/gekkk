import {useContext} from "react";
import {useParams} from "react-router-dom";
import Transfer from "../../widgets/wallet/code-transfer";
import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import TopUp from "@/widgets/wallet/transfer/top-up/ui/TopUp";
import WalletHeader from "@/widgets/wallet/header/ui";
import Withdraw from "@/widgets/wallet/transfer/withdraw/ui/Withdraw";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import { CtxRootData } from "@/processes/RootContext";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import NoFeeProgram from "@/widgets/wallet/programs/no-fee/ui";
import GkeCashbackProgram from "@/widgets/wallet/programs/cashback/GKE/ui";
import EurCashbackProgram from "@/widgets/wallet/programs/cashback/EUR/ui";
import { AccountRights } from "@/shared/config/account-rights";
import {CtxCurrencies} from "@/processes/CurrenciesContext";

function Wallet() {

    const {currency, tab} = useParams();
    const {xl} = useContext(BreakpointsContext);
    const {account} = useContext(CtxRootData);
    const {currencies} = useContext(CtxCurrencies);
    const $currency = currencies.get(currency);

    return (
        <div className="flex flex-col h-full w-full">
            <CtxWalletData.Provider value={$currency}>
                <WalletHeader/>
                <TabsGroupPrimary initValue={tab ? tab : "Top Up"} callInitValue={{...account, tab: tab}}>
                    <div className="grid" style={{gridTemplateColumns: `repeat(${xl ? 1 : 2}, minmax(0, 1fr))`}}>
                        <div className="substrate z-10 w-inherit relative min-h-[200px] md:-mt-10">
                            <NetworkProvider data-tab={"Top Up"}>
                                <TopUp/>
                            </NetworkProvider>

                            <NetworkProvider data-tab={"Withdraw"}>
                                <Withdraw/>
                            </NetworkProvider>

                            <Transfer data-tab={"Funds transfer"}/>

                            {$currency.$const === "EUR" && account.rights && !account.rights[AccountRights.IsJuridical] && (
                                <EurCashbackProgram data-tab={"Cashback Program"}/>
                            )}

                            {$currency.$const === "GKE" && account.rights && !account.rights[AccountRights.IsJuridical] && <>
                               <GkeCashbackProgram data-tab={"Cashback Program"}/>
                               <NoFeeProgram data-tab={"No Fee Program"}/>
                            </>}

                            <About data-tab={"About"}/>

                            {xl && <History currenciesFilter={[currency]} data-tab={"History"}/>}
                        </div>

                        {!xl && <div className="substrate z-0 -ml-4 h-full">
                            <History types={[]} currenciesFilter={[currency]}/>
                        </div>}
                    </div>
                </TabsGroupPrimary>
            </CtxWalletData.Provider>
        </div>
    );
};

export default Wallet;
